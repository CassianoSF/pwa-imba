var app = "awesome-pwa",
    cached = [
    ];

"serviceWorker" in navigator &&
    navigator.serviceWorker
        .register("sw.js")
        .then( () => {
            console.log("sw: registration ok");
        })
        .catch( (err) => {
            console.error(err);
        });

self.addEventListener("install",  (e) => {
    e.waitUntil(
        caches.open(app).then( (file) => {
            return console.log("sw: writing files into cache"), file.addAll(cached);
        })
    );
});

self.addEventListener("activate",  (e) => {
    console.log("sw: service worker ready and activated", e);
});

self.addEventListener("fetch",  (e) => {
    e.respondWith(
        caches.match(e.request)
            .then( cached_response => {
                return cached_response || fetch(e.request);
            })
            .catch( err => {
                console.error(err)
            })
    );
});
