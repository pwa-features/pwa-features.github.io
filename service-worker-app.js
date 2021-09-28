// self.__precacheManifest = [].concat(self.__precacheManifest || []);
// workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
// workbox.routing.registerNavigationRoute(
//   workbox.precaching.getCacheKeyForURL("index.html")
// );
//
// // const dynamicCacheName = "d-app-v1";
//
// self.addEventListener("message", (event) => {
//   if (event.data && event.data.type === "SKIP_WAITING") {
//     self.skipWaiting();
//   }
// });

self.addEventListener("notificationclick", function (event) {
  const rootUrl = new URL("/", location).href;
  event.notification.close();
  event.waitUntil(
    clients.matchAll().then((matchedClients) => {
      for (let client of matchedClients) {
        if (client.url === rootUrl) {
          return client.focus();
        }
      }
      return clients.openWindow("/");
    })
  );
});

self.addEventListener("push", function (event) {
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = "Push Codelab";
  const options = {
    body: event.data.text(),
    icon: "img/warning.png",
    badge: "img/warning.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
