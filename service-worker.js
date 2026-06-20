/**
 * service-worker.js — PWA Service Worker
 * ILAW Lesson Plan Generator — DepEd Philippines
 * DO No. 016, s. 2026
 *
 * Implements cache-first strategy for offline capability.
 * Teachers in remote barangays can use the app without internet.
 */

'use strict';

/* ─── Cache Configuration ─── */
const CACHE_NAME    = 'ilaw-generator-v1.0.0';
const CDN_CACHE     = 'ilaw-cdn-v1.0.0';

// Core app files to cache on install (cache-first)
const CORE_FILES = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './curriculum.js',
  './templates.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

// CDN resources to cache on first fetch
const CDN_RESOURCES = [
  'https://cdn.tailwindcss.com',
  'https://cdn.quilljs.com/1.3.7/quill.snow.css',
  'https://cdn.quilljs.com/1.3.7/quill.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js',
  'https://unpkg.com/docx@8.5.0/build/index.umd.js',
  'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
];

/* ═══════════════════════════════════════════
   INSTALL EVENT — Pre-cache core app files
   ═══════════════════════════════════════════ */
self.addEventListener('install', (event) => {
  console.log('[SW] Install event — caching core files');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching core app files');
        return cache.addAll(CORE_FILES);
      })
      .then(() => {
        console.log('[SW] Core files cached. Skipping waiting.');
        return self.skipWaiting();
      })
      .catch(err => {
        console.error('[SW] Install cache failed:', err);
      })
  );
});

/* ═══════════════════════════════════════════
   ACTIVATE EVENT — Clean old caches
   ═══════════════════════════════════════════ */
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event — cleaning old caches');

  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => name !== CACHE_NAME && name !== CDN_CACHE)
            .map(name => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[SW] Old caches cleaned. Claiming clients.');
        return self.clients.claim();
      })
  );
});

/* ═══════════════════════════════════════════
   FETCH EVENT — Cache-First Strategy
   ═══════════════════════════════════════════ */
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url     = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // Skip non-http(s) requests
  if (!url.protocol.startsWith('http')) return;

  // Determine which cache to use
  const isCDN = CDN_RESOURCES.some(cdn => request.url.startsWith(cdn));

  if (isCDN) {
    // CDN resources: Cache-First, then network fallback
    event.respondWith(cdnCacheFirst(request));
  } else if (url.origin === self.location.origin) {
    // Local files: Cache-First, then network fallback
    event.respondWith(localCacheFirst(request));
  }
  // All other requests (APIs, etc.) fall through to the network normally
});

/**
 * Cache-First strategy for local app files.
 * @param {Request} request
 * @returns {Promise<Response>}
 */
async function localCacheFirst(request) {
  try {
    const cache    = await caches.open(CACHE_NAME);
    const cached   = await cache.match(request);
    if (cached) {
      // Return cached version and update in background
      updateCacheInBackground(request, cache);
      return cached;
    }

    // Not cached — fetch from network and cache it
    const response = await fetch(request);
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    // Network failed — return cached fallback
    const cache  = await caches.open(CACHE_NAME);
    const cached = await cache.match('./index.html');
    if (cached) return cached;

    // Ultimate fallback
    return new Response('<h1>Offline</h1><p>ILAW is offline. Please load the app once online to enable offline use.</p>',
      { headers: { 'Content-Type': 'text/html' } });
  }
}

/**
 * Cache-First strategy for CDN resources.
 * @param {Request} request
 * @returns {Promise<Response>}
 */
async function cdnCacheFirst(request) {
  try {
    const cache  = await caches.open(CDN_CACHE);
    const cached = await cache.match(request);
    if (cached) return cached;

    // Not cached — fetch and store
    const response = await fetch(request);
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    console.warn('[SW] CDN fetch failed (offline?):', request.url);
    // Return empty Response to avoid broken app
    return new Response('', { status: 503, statusText: 'Service Unavailable' });
  }
}

/**
 * Stale-while-revalidate background update for local files.
 * @param {Request} request
 * @param {Cache} cache
 */
function updateCacheInBackground(request, cache) {
  fetch(request)
    .then(response => {
      if (response && response.status === 200) {
        cache.put(request, response.clone());
      }
    })
    .catch(() => {
      // Silently fail — we already served from cache
    });
}

/* ═══════════════════════════════════════════
   PUSH NOTIFICATION SUPPORT (future-ready)
   ═══════════════════════════════════════════ */
self.addEventListener('push', (event) => {
  if (!event.data) return;
  const data = event.data.json();

  event.waitUntil(
    self.registration.showNotification(data.title || 'ILAW Generator', {
      body:    data.body || 'You have a new notification.',
      icon:    './icons/icon-192.png',
      badge:   './icons/icon-192.png',
      vibrate: [200, 100, 200],
      tag:     'ilaw-notification'
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('./')
  );
});
