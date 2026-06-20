/* ILAW Generator — Service Worker */
const CACHE = 'ilaw-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/css/app.min.css',
  '/vendor/quill.snow.css',
  '/vendor/quill.min.js',
  '/js/html.min.js',
  '/js/db.min.js',
  '/js/ui.min.js',
  '/js/generator.min.js',
  '/js/io.min.js'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(() => {})));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
