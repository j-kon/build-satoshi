const CACHE_NAME = "build-satoshi-v2";
const IS_LOCALHOST =
  self.location.hostname === "localhost" || self.location.hostname === "127.0.0.1";
const PRECACHE_URLS = [
  "/",
  "/gallery",
  "/track/lightning-tip-jar",
  "/track/bitcoin-savings-app",
  "/track/psbt-signer-cli",
  "/complete/lightning-tip-jar",
  "/complete/bitcoin-savings-app",
  "/complete/psbt-signer-cli",
  "/icon.svg",
  "/favicon.svg",
  "/og-image.png"
];

self.addEventListener("install", (event) => {
  if (IS_LOCALHOST) {
    self.skipWaiting();
    return;
  }

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  if (IS_LOCALHOST) {
    event.waitUntil(
      caches.keys().then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("build-satoshi-"))
            .map((key) => caches.delete(key))
        )
      ).then(() => self.registration.unregister())
    );
    return;
  }

  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }

          return Promise.resolve();
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (IS_LOCALHOST) {
    return;
  }

  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  if (event.request.mode === "navigate") {
    return;
  }

  if (requestUrl.pathname.startsWith("/_next/")) {
    return;
  }

  if (requestUrl.pathname === "/sw.js") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        const responseClone = networkResponse.clone();

        void caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });

        return networkResponse;
      });
    })
  );
});
