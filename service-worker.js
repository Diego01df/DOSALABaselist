const CACHE_NAME = 'dosala-sync-v1';
const ASSETS = ['./','./index.html','./manifest.json','./icons/icon-192.png','./icons/icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k))))
  );
  self.clients.claim();
});
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(resp => {
        const copy = resp.clone(); caches.open(CACHE_NAME).then(c => c.put(request, copy));
        return resp;
      }).catch(() => caches.match('./index.html'))
    );
  } else {
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request).then(resp => {
        const copy = resp.clone(); caches.open(CACHE_NAME).then(c => c.put(request, copy));
        return resp;
      }))
    );
  }
});
