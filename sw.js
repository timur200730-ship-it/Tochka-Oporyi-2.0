const CACHE_NAME = 'tochka-opory-cache-v12';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg'
'icon-192.png',
'icon-512.png',
'icon-maskable-512.png',
'apple-touch-icon.png',
'emotion-magic.html', 
'inspiration.html', 
'manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          if (event.request.url.startsWith('http')) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
      }).catch(() => caches.match('./index.html'));
    })
  );
});
