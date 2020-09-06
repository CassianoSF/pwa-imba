var t = "avi",
    i = [];
"serviceWorker" in navigator &&
    navigator.serviceWorker
        .register("sw.js")
        .then(function () {
            console.log("sw: registration ok");
        })
        .catch(function (e) {
            console.error(e);
        });
self.addEventListener("install", function (e) {
    e.waitUntil(
        caches.open(t).then(function (n) {
            return console.log("sw: writing files into cache"), n.addAll(i);
        })
    );
});
self.addEventListener("activate", function (e) {
    console.log("sw: service worker ready and activated", e);
});
self.addEventListener("fetch", function (e) {
    e.respondWith(
        caches
            .match(e.request)
            .then(function (n) {
                return n || fetch(e.request);
            })
            .catch(function (n) {
                return caches.match("img/offline-img.png");
            })
    );
});
