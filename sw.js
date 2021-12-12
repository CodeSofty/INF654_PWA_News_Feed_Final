const staticCache = 'Static-v11';
// Dynamic Assets for App Shell
const dynamicCache = 'Dynamic-cache-v11';

// Static Assets for App Shell
const assets = [
    "/",
    "/index.html",
    "/pages/about.html",
    "/js/app.js",
    "/js/ui.js",
    "/sw.js",
    "/css/app.css",
    "/img/icon-16x16.png",
    "/img/icon-32x32.png",
    "/img/icon-192x192.png",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css",
];


// Cache Limit
const limitCacheSize = (name, size) => {
    caches.open(name).then((cache) => {
        cache.keys().then((keys) => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            };
        });
    });
};

self.addEventListener("install", function(e) {
    // Fires when browser installs app
    // Logging the event and contents of the object passed to the event
    // The purpose of the event is to give service worker a place to set up local environment
    // after installation
    console.log(`SW: Event Fired: ${e.type}`);
    e.waitUntil(caches.open(staticCache).then(function (cache) {
        console.log(`SW: Precaching App Shell`);
        cache.addAll(assets);
    }))
});

self.addEventListener("activate", function(e){
    // Fires when service worker completes installation
    // This allows app to clean up from previous service worker version
    // Example: such as when the page is reloaded
    // console.log(`SW: Event Fired: ${e.type}`);
    e.waitUntil(caches.keys().then(keys => {
        return Promise.all(keys.filter(key => key !== staticCache && key !== dynamicCache).map(key => caches.delete(key)));
    }))
});

self.addEventListener("fetch", function(e) {
    // Fires when the app requests a resource (file or data)
    // console.log(`SW: Fetching ${e.request.url}`);
    // Go get the requested resource from the network
    if(e.request.url.indexOf("firestore.google.apis.com") === -1) {
        e.respondWith(caches.match(e.request).then((response) => {
            return response || fetch(e.request).then(fetchRes => {
                return caches.open(dynamicCache).then(cache => {
                    cache.put(e.request.url, fetchRes.clone());
                    limitCacheSize(dynamicCache, 15);
                    return fetchRes;
                });
            }); 
        })
        );
    }
});