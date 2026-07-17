const CACHE_NAME = "my-app-v1";

const ASSETS = [
    "./",
    "./index.html",
    "./css/style.css",
    "./js/app.js",
    "./manifest.webmanifest",
    "./icons/icon-192.png",
    "./icons/icon-512.png",
    "./favicon.ico"
];

// نصب
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );

    self.skipWaiting();
});

// فعال‌سازی
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                .filter((key) => key !== CACHE_NAME)
                .map((key) => caches.delete(key))
            )
        )
    );

    self.clients.claim();
});

// دریافت درخواست‌ها
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cached) => {
            return (
                cached ||
                fetch(event.request).then((response) => {
                    const copy = response.clone();

                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, copy);
                    });

                    return response;
                })
            );
        })
    );
});