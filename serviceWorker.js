// getting the cache into variables
var staticCacheName = 'currency-static-v1';
var contentCache = 'currency-content-v1';
var allCaches = [
    staticCacheName,
    contentCache
];

//install
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(staticCacheName).then(function(cache) {
        return cache.addAll([
            '/js/app.js',
            '/js.serviceWorker.js',
            '/css/styles.css',
            '/css/bootsrap.mini.css',
            'index.html',
            'https://free.currencyconverterapi.com/api/v5/currencies',
            'https://free.currencyconverterapi.com/api/v5/convert?q=',
            'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
            'https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js',
            'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
            'https://fonts.googleapis.com/css?family=Raleway'
        ]);
      })
    );
});

//activate
self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(staticCacheName) {
        return Promise.all(
          staticCacheName.filter(function(staticCacheName) {
            return cacheName.startsWith('currency-') &&
                   !allCaches.includes(cacheName);
          }).map(function(staticCacheName) {
            return caches.delete(staticCacheName);
          })
        );
      })
    );
  });

//fetch
self.addEventListener('fetch', function(event) {
    var requestUrl = new URL(event.request.url);
  
    if (requestUrl.origin === location.origin) {
      if (requestUrl.pathname === '/') {
        event.respondWith(caches.match('/currency'));
        return;
      }
    }
  
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
});
