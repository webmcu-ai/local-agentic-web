// sw.js
const myCacheName = "local-agentic-web-v020";   // change this version so the pwa will update.
const myAssetsToCache = [
  "./",
  "./index.html",
  "./pwa/manifest.json",
  "./pwa/pwa.js",
  "./pwa/icon-192.png",
  "./pwa/icon-512.png"
];

// Install event using wait hooks (removed skipWaiting to allow update detection)
self.addEventListener("install", (myEvent) => {
  myEvent.waitUntil((async () => {
    const myCache = await caches.open(myCacheName);
    await myCache.addAll(myAssetsToCache);
  })());
});

// Listen for message from pwa.js to trigger skipWaiting on demand
self.addEventListener("message", (myEvent) => {
  if (myEvent.data && myEvent.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Activate event to clean old caches and claim clients immediately
self.addEventListener("activate", (myEvent) => {
  myEvent.waitUntil((async () => {
    // Optional: Clean up old caches if version changes
    const myKeys = await caches.keys();
    await Promise.all(
      myKeys.map((myKey) => {
        if (myKey !== myCacheName) {
          return caches.delete(myKey);
        }
      })
    );
    await self.clients.claim();
  })());
});

// Fetch event using Stale-While-Revalidate / Cache-First strategy with runtime fallback
self.addEventListener("fetch", (myEvent) => {
  myEvent.respondWith((async () => {
    const myCachedResponse = await caches.match(myEvent.request);
    if (myCachedResponse) {
      // Return cached version immediately, but fetch a fresh copy in the background to update the cache
      fetch(myEvent.request).then((myNetworkResponse) => {
        if (myNetworkResponse && myNetworkResponse.status === 200 && myNetworkResponse.type === 'basic') {
          caches.open(myCacheName).then((myCache) => {
            myCache.put(myEvent.request, myNetworkResponse);
          });
        }
      }).catch(() => {
        // Ignore network failure when offline
      });
      return myCachedResponse;
    }

    // If not in cache, try fetching from network and cache it dynamically for future offline use
    try {
      const myNetworkResponse = await fetch(myEvent.request);
      if (myNetworkResponse && myNetworkResponse.status === 200) {
        const myResponseClone = myNetworkResponse.clone();
        caches.open(myCacheName).then((myCache) => {
          myCache.put(myEvent.request, myResponseClone);
        });
      }
      return myNetworkResponse;
    } catch (myError) {
      // Offline fallback can be handled here if fetching asset fails
      console.error("Fetch failed; user is likely offline.", myError);
      throw myError;
    }
  })());
});
