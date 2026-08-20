import { chromium } from 'playwright';

const URL = 'https://wbc-bice.vercel.app/contact';
const results = {
  fillSucceededWithin5s: null,
  clickFillMs: null,
  fillError: null,
  consoleErrors: [],
  pageErrors: [],
  longTasks: [],
  title: null,
  bundleHashes: [],
  serviceWorkers: null,
  mutationObserverProbe: null,
  responsiveAfterFocus: null,
  notes: [],
};

async function main() {
  // Prefer system Chrome — bundled Chromium unsupported on macOS 12
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      results.consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', (err) => {
    results.pageErrors.push(String(err));
  });

  // Inject PerformanceObserver for long tasks before navigation
  await page.addInitScript(() => {
    window.__longTasks = [];
    try {
      const po = new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          window.__longTasks.push({
            duration: e.duration,
            startTime: e.startTime,
            name: e.name,
          });
        }
      });
      po.observe({ type: 'longtask', buffered: true });
    } catch (e) {
      window.__longTaskError = String(e);
    }
  });

  console.log('Navigating...');
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  results.title = await page.title();

  // Bundle hashes from script srcs
  results.bundleHashes = await page.evaluate(() => {
    return [...document.querySelectorAll('script[src]')]
      .map((s) => s.getAttribute('src'))
      .filter(Boolean)
      .map((src) => {
        const m = src.match(/[-.]([a-f0-9]{8,})\.(?:js|mjs)/i) || src.match(/\/([a-f0-9]{8,})\./);
        return { src, hash: m ? m[1] : null };
      });
  });

  // --- Part A: click + fill timing ---
  console.log('Attempting click+fill on #name...');
  const t0 = Date.now();
  try {
    await Promise.race([
      (async () => {
        await page.click('#name', { timeout: 5000 });
        await page.fill('#name', 'Test', { timeout: 5000 });
      })(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('click+fill exceeded 5s')), 5000)
      ),
    ]);
    results.clickFillMs = Date.now() - t0;
    results.fillSucceededWithin5s = true;
  } catch (e) {
    results.clickFillMs = Date.now() - t0;
    results.fillSucceededWithin5s = false;
    results.fillError = String(e);
  }

  // Value check
  try {
    results.nameValue = await page.inputValue('#name', { timeout: 2000 });
  } catch (e) {
    results.nameValue = `error: ${e}`;
  }

  results.longTasks = await page.evaluate(() => window.__longTasks || []);

  // --- Part B: fresh page evaluate probes ---
  console.log('Opening second page for probes...');
  const page2 = await context.newPage();
  const console2 = [];
  page2.on('console', (msg) => {
    if (msg.type() === 'error') console2.push(msg.text());
  });

  await page2.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });

  results.serviceWorkers = await page2.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return { supported: false };
    const regs = await navigator.serviceWorker.getRegistrations();
    return {
      supported: true,
      count: regs.length,
      registrations: regs.map((r) => ({
        scope: r.scope,
        active: r.active?.scriptURL || null,
        installing: r.installing?.scriptURL || null,
        waiting: r.waiting?.scriptURL || null,
      })),
      controller: navigator.serviceWorker.controller?.scriptURL || null,
    };
  });

  results.mutationObserverProbe = await page2.evaluate(() => {
    // Can't enumerate existing observers directly; probe DOM mutation volume after focus
    let mutationCount = 0;
    const observer = new MutationObserver((muts) => {
      mutationCount += muts.length;
    });
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      characterData: true,
    });

    const name = document.querySelector('#name');
    if (!name) return { error: '#name not found' };

    name.focus();
    // sync wait briefly via busy loop is bad; return after microtask + rAF
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          observer.disconnect();
          resolve({
            mutationRecordsAfterFocus: mutationCount,
            note: 'Cannot count existing MutationObservers; counted DOM mutations after focus instead',
          });
        }, 500);
      });
    });
  });

  results.responsiveAfterFocus = await page2.evaluate(async () => {
    const name = document.querySelector('#name');
    if (!name) return { error: '#name not found' };

    const start = performance.now();
    name.focus();
    name.dispatchEvent(new Event('input', { bubbles: true }));

    // setTimeout that should fire if event loop not blocked
    const fired = await new Promise((resolve) => {
      const timer = setTimeout(() => {
        resolve({ fired: true, delayMs: performance.now() - start });
      }, 100);
      // safety: if somehow we never get here within outer timeout, parent handles it
      // also try requestAnimationFrame
      requestAnimationFrame(() => {
        // noop - just seeing if rAF runs
      });
    });

    // Second check: can we still run JS after 1s?
    const after1s = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          stillResponsive: true,
          elapsedMs: performance.now() - start,
          activeElement: document.activeElement?.id || document.activeElement?.tagName,
        });
      }, 1000);
    });

    return { timeout100ms: fired, after1s };
  });

  // Outer race for freeze detection on page2 evaluate
  // (already completed above; if it hung we'd timeout)

  results.consoleErrorsPage2 = console2;
  results.longTasksPage2 = await page2.evaluate(() => window.__longTasks || []).catch(() => []);

  // Also try typing via keyboard on page2 with timing
  console.log('Keyboard type probe...');
  const k0 = Date.now();
  try {
    await page2.focus('#name', { timeout: 3000 });
    await Promise.race([
      page2.keyboard.type('Test', { delay: 0 }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('keyboard type >5s')), 5000)),
    ]);
    results.keyboardTypeMs = Date.now() - k0;
    results.keyboardTypeOk = true;
    results.keyboardValue = await page2.inputValue('#name');
  } catch (e) {
    results.keyboardTypeMs = Date.now() - k0;
    results.keyboardTypeOk = false;
    results.keyboardTypeError = String(e);
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
}

main().catch((e) => {
  console.error('FATAL', e);
  process.exit(1);
});
