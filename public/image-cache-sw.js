const CACHE_NAME = "wbc-images-v1";
const IMAGE_EXT = /\.(png|jpe?g|webp|gif|svg|ico|avif)(\?|$)/i;

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)));
      await self.clients.claim();
    })(),
  );
});

function isImageRequest(request) {
  if (request.method !== "GET") return false;
  if (request.destination === "image") return true;
  try {
    return IMAGE_EXT.test(new URL(request.url).pathname);
  } catch {
    return false;
  }
}

self.addEventListener("fetch", (event) => {
  if (!isImageRequest(event.request)) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(event.request, { ignoreSearch: true });
      if (cached) return cached;

      const response = await fetch(event.request);
      if (response && response.ok) {
        cache.put(event.request, response.clone()).catch(() => {});
      }
      return response;
    })(),
  );
});
