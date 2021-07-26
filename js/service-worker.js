var CACHE_NAME = 'demo-pwa-v1';
var urlsToCache = [
  './',
  './css/style.css'
];
self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

function isSuccessful(response) {
  return response &&
    response.status === 200 &&
    response.type === 'basic';
}

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response; // Cache hit
        }

        return fetch(event.request.clone())
          .then(function (response) {
            if (!isSuccessful(response)) {
              return response;
            }

            caches.open(CACHE_NAME)
              .then(function (cache) {
                cache.put(event.request, response.clone());
              });

            return response;
          }
          );
      })
  );
});

self.addEventListener('sync', function (event) {
  console.log("Background");
  document.body.append("<div>A</div>");
});

