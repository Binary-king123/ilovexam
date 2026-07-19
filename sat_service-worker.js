 const CACHE_NAME = "sat-mock-v1";
const urlsToCache = [
  "/",
  "/sat_ui.html",
  "/satuiscript.js",
  "/sat.css",
  "/sat_manifest.json",
  "/logo.png"
];

// Install service worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Caching offline assets...");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate service worker
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
});

// Fetch cached content
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
