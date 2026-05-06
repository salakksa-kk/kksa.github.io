const CACHE_NAME = 'canto-test-v1';
const ASSETS = [
  './',
  'index.html',
  'manifest.json',
  'icon.png'
];

// Install stage: Caches the new files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching new assets');
      return cache.addAll(ASSETS);
    })
  );
});

// Activate stage: Deletes old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Clearing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
