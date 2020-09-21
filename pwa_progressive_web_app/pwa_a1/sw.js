const staticCacheName = "site-static-v1";
const dynamicCacheName = "site-dynamic-v1";

const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/css/styles.css",
  "/img/car1.jpeg",
  "/fallback.html",
];

// Install event
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener("activate", (e) => {
  //console.log('service worker activated');
  e.waitUntil(
    caches.keys().then((keys) => {
      //console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch events
self.addEventListener("fetch", (e) => {
  console.log("fetch event", e);
  e.respondWith(
    caches
      .match(e.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(e.request).then((fetchRes) => {
            return caches.open(dynamicCacheName).then((cache) => {
              cache.put(e.request.url, fetchRes.clone());
              // check cached items size
              limitCacheSize(dynamicCacheName, 15);
              return fetchRes;
            });
          })
        );
      })
      .catch(() => {
        if (e.request.url.indexOf(".html") > -1) {
          return caches.match("/fallback.html");
        }
      })
  );
});
