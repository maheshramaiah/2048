importScripts("/2048/precache.929268e03defc60d33caaad70504eef2.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

if ('workbox' in self) {
  workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
}

