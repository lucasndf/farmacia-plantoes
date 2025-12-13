// ======================================================
// Service Worker — Farmácia de Plantão Patos-PB
// Compatível com GitHub Pages
// ======================================================

const CACHE_NAME = "plantoes-patos-v2";

// Arquivos essenciais para funcionar offline
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./data.js",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png"
];

// ------------------------------------------------------
// INSTALL
// ------------------------------------------------------
self.addEventListener("install", event => {
  console.log("[SW] Install");

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );

  self.skipWaiting();
});

// ------------------------------------------------------
// ACTIVATE
// ------------------------------------------------------
self.addEventListener("activate", event => {
  console.log("[SW] Activate");

  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => key !== CACHE_NAME && caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

// ------------------------------------------------------
// FETCH (cache-first simples)
// ------------------------------------------------------
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
