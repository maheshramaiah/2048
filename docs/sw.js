importScripts("/precache.de25e43688558651f6c923b284863ab1.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

if ('workbox' in self) {
  workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
}

