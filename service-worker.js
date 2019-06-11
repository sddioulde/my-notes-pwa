const STATIC_CACHE_NAME = 'static-v1'; // must update the name every time we update one of the files
const DATA_CACHE_NAME = 'data-v1';

const CACHED_FILES = [
  '/manifest.json',
  '/',
  '/index.html',
  '/styles.css',
  '/scripts/app.js',
  '/scripts/install.js',
  '/images/notes-128.png',
  '/images/notes-512.png'
];

self.addEventListener('install', () => {
  console.log('installation phase');

  caches.open(STATIC_CACHE_NAME).then((cache) => {
    return cache.addAll(CACHED_FILES);
  });

  self.skipWaiting(); // forces the waiting service worker (this one) to be the active service worker
});

self.addEventListener('activate', (event) => {
  console.log('activation phase');

  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (key !== STATIC_CACHE_NAME && key !== DATA_CACHE_NAME) {
          return caches.delete(key); // remove unwanted cache
        }
      }));
    })
  );

  self.clients.claim(); // ensures that updates to the service worker take effect immediately for all active clients
});

self.addEventListener('fetch', (event) => {
  const requestUrl = event.request.url;

  console.log('fetching...', requestUrl);

  // api fetch request
  if (requestUrl.includes('todos')) {
    event.respondWith(
      caches.open(DATA_CACHE_NAME)
        .then(cache =>
          fetch(event.request)
            .then(response => {
              console.log('GETTING NOTES FROM NETWORK', response);
              if (response.status === 200) {
                cache.put(requestUrl, response.clone());
              }
              return response;
            })
            .catch(() => {
              console.log('GETTING NOTES FROM CACHE');
              return cache.match(requestUrl);
            })
        )
    );
    return;
  }

  // other fetch request
  event.respondWith(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => cache.match(event.request))
      .then(response => response ? response : fetch(event.request))
      .catch(() => fetch(event.request))
  );
});