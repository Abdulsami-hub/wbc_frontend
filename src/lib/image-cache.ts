/**
 * Image caching is disabled — the previous MutationObserver + getComputedStyle
 * scan froze Contact / modals / affiliate dropdowns in production.
 * This module only unregisters any leftover service worker from older deploys.
 */
export function registerImageCache() {
  /* no-op */
}

export function unregisterImageCache() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
  void navigator.serviceWorker.getRegistrations().then((regs) => {
    for (const reg of regs) void reg.unregister();
  });
  if ("caches" in window) {
    void caches.keys().then((keys) => {
      for (const key of keys) {
        if (key.startsWith("wbc-images")) void caches.delete(key);
      }
    });
  }
}
