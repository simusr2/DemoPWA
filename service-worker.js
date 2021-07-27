var CACHE_NAME = 'demo-pwa-v1';
var urlsToCache = [
    './index.html',
    './css/style.css'
];

// self.addEventListener('install', event => {
//     console.log('Service worker installing...');
//     // Add a call to skipWaiting here
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//         .then(function(cache) {
//             console.log('Opened cache');
//             return cache.addAll(urlsToCache);
//         })
//     );
// });

self.addEventListener('activate', event => {
    console.log('Service worker activating...');
});

self.addEventListener('install', function(event) {
    console.log('Service worker installing...');
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.match(event.request).then(function(response) {
                return response || fetch(event.request).then(function(response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});

// function isSuccessful(response) {
//     return response &&
//         response.status === 200 &&
//         response.type === 'basic';
// }

// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//         caches.match(event.request)
//         .then(function(cacheResponse) {
//             if (cacheResponse) {
//                 return cacheResponse; // Cache hit
//             }

//             return fetch(event.request.clone())
//                 .then(function(response) {
//                     if (!isSuccessful(response)) {
//                         return response;
//                     }

//                     caches.open(CACHE_NAME)
//                         .then(function(cache) {
//                             cache.put(event.request, response.clone());
//                         });

//                     return response;
//                 });
//         })
//     );
// });

self.addEventListener('sync', function(event) {
    const syncPromise = new Promise((resolve, reject) => {
        console.log("Background");
        backgroundSync();
    });

    event.waitUntil(syncPromise);
});