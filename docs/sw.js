importScripts("/2048/precache.2f6e0704b17b6eff5e0bf0f16ed2182d.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

if ('workbox' in self) {
  workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
}

