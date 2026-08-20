import { chromium } from "playwright";

const url = process.argv[2] || "https://wbc-bice.vercel.app/contact";

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage();

page.on("console", (msg) => {
  if (msg.type() === "error") console.log("console.error:", msg.text());
});
page.on("pageerror", (err) => console.log("pageerror:", String(err)));

console.log("goto", url);
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForSelector("#name", { timeout: 30000 });
console.log("ready");

// Use CDP to force-run JS even if UI thread is busy? Still needs event loop.
const race = Promise.race([
  page.evaluate(() => {
    const el = document.querySelector("#name");
    const t0 = performance.now();
    el.focus();
    const t1 = performance.now();
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          focusSyncMs: t1 - t0,
          afterTimeoutMs: performance.now() - t0,
          active: document.activeElement?.id,
          valueLen: el.value.length,
        });
      }, 100);
    });
  }),
  new Promise((resolve) =>
    setTimeout(() => resolve({ FROZEN: true, waitedMs: 12000 }), 12000),
  ),
]);

console.log("focus probe:", await race);

// Try fill with force via evaluate only
const typeRace = Promise.race([
  page.evaluate(() => {
    const el = document.querySelector("#name");
    const t0 = performance.now();
    el.value = "Abc";
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
    return { ms: performance.now() - t0, value: el.value };
  }),
  new Promise((resolve) =>
    setTimeout(() => resolve({ FROZEN_TYPE: true }), 8000),
  ),
]);
console.log("type probe:", await typeRace);

await browser.close();
console.log("done");
