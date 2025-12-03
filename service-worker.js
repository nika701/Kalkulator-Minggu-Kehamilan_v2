// service-worker.js

const CACHE_NAME = "wog-calculator-v1";
const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./service-worker.js",
  "./Logo-Jata.svg",
  "./Logo-Below.png"
  "./icon-192.svg"
  "./iocn-152.svg"
  // tambah lagi kalau ada file lain (icons, css external, dsb.)
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Jika ada dalam cache, guna cache, kalau tak, baru pergi network
      return response || fetch(event.request);
    })
  );
});
