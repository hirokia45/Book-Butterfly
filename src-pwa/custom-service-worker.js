/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

 /*
  dependencies
*/

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { NetworkFirst } from 'workbox-strategies';
import { Queue } from 'workbox-background-sync';

/*
  config
*/

precacheAndRoute(self.__WB_MANIFEST);


let backgroundSyncSupported = 'sync' in self.registration ? true : false
console.log('backgroundSyncSupported: ', backgroundSyncSupported);

/*
 queue
*/

let createNoteQueue = null;
if (backgroundSyncSupported) {
  createNoteQueue = new Queue("createNoteQueue");
}


/*
  strategies
*/

registerRoute(
  ({ url }) => url.host.startsWith('fonts.g'),
  new CacheFirst({
    cacheName: 'google-fonts',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
    ],
  })
);

registerRoute(
  ({ url }) => url.pathname.startsWith('/notes') ||
               url.pathname.startsWith('/calendar') ||
               url.pathname.startsWith('/books/bookshelf') ||
               url.pathname.startsWith('/users/me'),
  new NetworkFirst()
)

registerRoute(
  ({ url }) => url.href.startsWith('http'),
  new StaleWhileRevalidate()
);

/*
  events - Fetch
*/

if (backgroundSyncSupported) {
  self.addEventListener("fetch", event => {
    if (event.request.url.endsWith('/notes')) {
      const promiseChain = fetch(event.request.clone()).catch(err => {
      return createNoteQueue.pushRequest({ request: event.request });
    });
      event.waitUntil(promiseChain);
    }
  });
}
