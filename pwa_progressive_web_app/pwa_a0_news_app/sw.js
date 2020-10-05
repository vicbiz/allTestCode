const CACHE_NAME = "Static Cache : v1";
const DYNAMIC_CACHE_NAME = "Dynamic Cache : v1";
const staticAssets = [
  "./",
  "./css/style.css",
  "./app.js",
  "./fallback.json",
  "./images/offline.png",
];

// SW Install ... install static assets
self.addEventListener("install", async (e) => {
  console.log("service worker install");
  const cache = await caches.open(CACHE_NAME);
  cache.addAll(staticAssets);
  // console.log(`added staticAssets to ${CACHE_NAME}`);
});

// activate event
self.addEventListener("activate", (e) => {
  console.log("service worker activate");
  e.waitUntil(
    caches.keys().then((keys) => {
      //console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key !== DYNAMIC_CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch
self.addEventListener("fetch", (e) => {
  console.log("service worker fetch");
  const req = e.request;
  const url = new URL(req.url);

  // check if inside current server
  if (url.origin === location.url) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkFirst(req));
  }
});

async function cacheFirst(req) {
  console.log("fetch.. cacheFirst");
  const cachedResponse = await caches.match(req);
  return cachedResponse || fetch(req);
}

async function networkFirst(req) {
  console.log("fetch.. networkFirst");
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  try {
    // Try network to get data
    const res = await fetch(req);
    // put data to dynamic cahce ---- clone.. cause it's only read once
    cache.put(req, res.clone());
    // delete old caches... limit cache size
    limitCacheSize(DYNAMIC_CACHE_NAME, 30);
    // return network fetched data
    return res;
  } catch (error) {
    const cachedResponse = await cache.match(req);
    // console.log("cachedResponse..... : ", cachedResponse);
    // offline... try to find in cache..
    return cachedResponse || (await caches.match("./fallback.json"));
  }
}

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};
