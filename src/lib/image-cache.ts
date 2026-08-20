const IMAGE_EXT = /\.(png|jpe?g|webp|gif|svg|ico|avif)(\?|$)/i;

function collectImageUrls() {
  const urls = new Set<string>();

  for (const img of document.querySelectorAll("img[src]")) {
    const src = img.currentSrc || img.getAttribute("src");
    if (src && !src.startsWith("data:")) urls.add(new URL(src, location.href).href);
  }

  for (const el of document.querySelectorAll<HTMLElement>("*")) {
    const bg = getComputedStyle(el).backgroundImage;
    const match = /url\(["']?([^"')]+)["']?\)/.exec(bg);
    if (match?.[1] && !match[1].startsWith("data:")) {
      urls.add(new URL(match[1], location.href).href);
    }
  }

  return [...urls].filter((url) => IMAGE_EXT.test(url) || url.includes("/assets/"));
}

function warmupBrowserCache(urls: string[]) {
  for (const url of urls) {
    const img = new Image();
    img.decoding = "async";
    img.src = url;
  }
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/image-cache-sw.js").catch(() => {
      /* SW optional — HTTP cache still applies */
    });
  });
}

/** Cache-first images for repeat visits; warms the current page's photos. */
export function registerImageCache() {
  if (typeof window === "undefined") return;

  registerServiceWorker();

  const warm = () => warmupBrowserCache(collectImageUrls());
  if (document.readyState === "complete") {
    window.setTimeout(warm, 50);
  } else {
    window.addEventListener("load", () => window.setTimeout(warm, 50), { once: true });
  }

  let debounce = 0;
  const observer = new MutationObserver(() => {
    window.clearTimeout(debounce);
    debounce = window.setTimeout(warm, 250);
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
}
