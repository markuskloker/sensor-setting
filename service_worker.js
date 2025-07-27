const CACHE_NAME = 'liebherr-sensor-app-v1.0';
const OFFLINE_URL = './offline.html';

// Dateien die gecacht werden sollen
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './offline.html',
  // Icons würden hier stehen, falls vorhanden
  // './icons/icon-192.png',
  // './icons/icon-512.png'
];

// Service Worker Installation
self.addEventListener('install', event => {
  console.log('[SW] Install Event');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[SW] Skip waiting');
        return self.skipWaiting();
      })
  );
});

// Service Worker Aktivierung
self.addEventListener('activate', event => {
  console.log('[SW] Activate Event');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Claiming clients');
      return self.clients.claim();
    })
  );
});

// Netzwerk-Anfragen abfangen
self.addEventListener('fetch', event => {
  console.log('[SW] Fetch Event:', event.request.url);
  
  // Nur GET-Anfragen verarbeiten
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Navigation requests (HTML-Seiten)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.open(CACHE_NAME)
            .then(cache => {
              return cache.match('./index.html');
            });
        })
    );
    return;
  }
  
  // Andere Anfragen
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          console.log('[SW] Cache hit:', event.request.url);
          return response;
        }
        
        // Clone der Anfrage für fetch
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(response => {
          // Prüfe ob gültige Response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone der Response für Cache
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        }).catch(() => {
          // Netzwerk-Fehler - versuche offline Fallback
          if (event.request.destination === 'document') {
            return caches.match('./index.html');
          }
          
          // Für andere Ressourcen
          return new Response('Offline - Ressource nicht verfügbar', {
            status: 408,
            headers: { 'Content-Type': 'text/plain' }
          });
        });
      })
  );
});

// Background Sync für Daten-Synchronisation
self.addEventListener('sync', event => {
  console.log('[SW] Background Sync:', event.tag);
  
  if (event