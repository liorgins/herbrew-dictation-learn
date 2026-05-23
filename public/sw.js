// Minimal service worker. We don't ship offline support — its only job is to
// exist with a fetch handler so Chrome considers the site installable as a PWA.
// Future-proofing: bumping CACHE_VERSION forces clients to pick up new SWs.

const CACHE_VERSION = "v1";

self.addEventListener("install", () => {
  // Activate immediately on first install so users get standalone mode
  // without needing to close every tab first.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", () => {
  // No-op: let the network handle every request. Having this listener at all
  // is what Chrome checks for installability — we don't need to call
  // respondWith().
});
