importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.precaching.precacheAndRoute([
  {url: '/', revision: '1'},
  {url: '/index.html', revision: '1'},
  {url: '/article.html', revision: '2'},
  {url: '/nav.html', revision: '1'},
  {url: '/manifest.json', revision: '1'},
  {url: '/push.js', revision: '1'},
  {url: '/pages/home.html', revision: '1'},
  {url: '/pages/about.html', revision: '1'},
  {url: '/pages/contact.html', revision: '1'},
  {url: '/pages/saved.html', revision: '1'},
  {url: '/css/materialize.min.css', revision: '1'},
  {url: '/css/style.css', revision: '1'},
  {url: '/js/materialize.min.js', revision: '1'},
  {url: '/js/nav.js', revision: '1'},
  {url: '/js/fetchAPI.js', revision: '1'},
  {url: '/js/db.js', revision: '5'},
  {url: '/js/idb.js', revision: '1'},
  {url: '/js/registerSWArticle.js', revision: '1'},
  {url: '/js/registerSWIndex.js', revision: '1'},
  {url: '/assets/icons/icon-72x72.png', revision: '1'},  
  {url: '/assets/icons/icon-96x96.png', revision: '1'},  
  {url: '/assets/icons/icon-128x128.png', revision: '1'},  
  {url: '/assets/icons/icon-144x144.png', revision: '1'},  
  {url: '/assets/icons/icon-192x192.png', revision: '1'},  
  {url: '/assets/icons/icon-384x384.png', revision: '1'},  
  {url: '/assets/icons/icon-512x512.png', revision: '1'}, 
  {url: '/assets/heroBanner.png', revision: '1'}
],{
ignoreURLParametersMatching:[/.*/]
})

const baseURL = "https://api.football-data.org/v2/";

workbox.routing.registerRoute(
  new RegExp(baseURL),
  new workbox.strategies.CacheFirst({
    cacheName: "Fetch"
  })
)


self.addEventListener('push', event => {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'assets/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
// const CACHE_NAME = "cache-v12";
// const dynamicCache = "dynamicCache-v12"
// const urlsToCache = [
//     "/",
//     "/nav.html",
//     "/index.html",
//     "/article.html",
//     "/manifest.json",
//     "/push.js",
//     "/pages/home.html",
//     "/pages/about.html",
//     "/pages/contact.html",
//     "/pages/saved.html",
//     "/css/materialize.min.css",
//     "/css/materialize.css",
//     "/css/style.css",
//     "/js/materialize.min.js",
//     "/js/nav.js",
//     "/js/fetchAPI.js",
//     "/js/db.js",
//     "/js/idb.js",
//     "/assets/heroBanner.png",
//     "/assets/icons/icon-72x72.png",
//     "/assets/icons/icon-96x96.png",
//     "/assets/icons/icon-128x128.png",
//     "/assets/icons/icon-144x144.png",
//     "/assets/icons/icon-192x192.png",
//     "/assets/icons/icon-384x384.png",
//     "/assets/icons/icon-512x512.png"
// ];

// self.addEventListener("install", event => {
//     event.waitUntil(
//         caches.open(CACHE_NAME).then(cache => {
//             cache.addAll(urlsToCache);
//         })
//     );
// });

// self.addEventListener("fetch", evt => {
//   evt.respondWith(
//     caches.match(evt.request, {ignoreSearch: true}).then(cacheRes => {
//       return cacheRes || fetch(evt.request).then(fetchCache => {
//         return caches.open(dynamicCache).then(cache => {
//           cache.put(evt.request.url, fetchCache.clone());
//           return fetchCache;
//         })
//       })
//     })
//   )
// })

// self.addEventListener("activate", event => {
//   event.waitUntil(
//     caches.keys().then(cacheNames => {
//       Promise.all(
//         cacheNames.map(cacheName =>{
//           if (cacheName != CACHE_NAME) {
//             console.log(`ServiceWorker: cache ${cacheName} dihapus`);
//                         caches.delete(cacheName);
//                       }
//                     })
//                     )
//         })
//     )
// })


