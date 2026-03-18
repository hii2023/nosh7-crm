// NOSH7 CRM — Service Worker
// Cache version: bump this string to force update on all users
const CACHE = "nosh7-v1";

// Files to cache for offline use (app shell)
const SHELL = [
  "/",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap",
  "https://unpkg.com/xlsx/dist/xlsx.full.min.js"
];

// ── INSTALL ──────────────────────────────────────────────────────────────────
// Runs once when SW is first installed — caches the app shell
self.addEventListener("install", event => {
  console.log("[SW] Installing NOSH7 v1...");
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      // Cache what we can — don't fail install if CDN files are slow
      return cache.addAll(SHELL).catch(err => {
        console.warn("[SW] Some shell files failed to cache:", err);
      });
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE ─────────────────────────────────────────────────────────────────
// Clean up old caches when a new SW takes over
self.addEventListener("activate", event => {
  console.log("[SW] Activating...");
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE).map(k => {
          console.log("[SW] Deleting old cache:", k);
          return caches.delete(k);
        })
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH ────────────────────────────────────────────────────────────────────
// Strategy:
//   - Supabase API calls → Network only (always fresh data)
//   - Google Fonts / CDN → Cache first, fallback to network
//   - App shell (index.html) → Network first, fallback to cache
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // 1. Supabase API — always go to network, never cache
  if (url.hostname.includes("supabase.co")) {
    event.respondWith(fetch(event.request));
    return;
  }

  // 2. App shell & local files — network first, cache fallback
  if (url.pathname === "/" || url.pathname.endsWith(".html") || url.pathname.endsWith(".json")) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          // Update cache with fresh version
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(event.request, clone));
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // 3. CDN & fonts — cache first, network fallback
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(event.request, clone));
        }
        return res;
      }).catch(() => {
        // Offline fallback for navigation
        if (event.request.mode === "navigate") {
          return caches.match("./index.html");
        }
      });
    })
  );
});

// ── PUSH NOTIFICATIONS (placeholder for future) ──────────────────────────────
self.addEventListener("push", event => {
  const data = event.data?.json() || { title: "NOSH7", body: "You have a new update" };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "./icons/icon-192.png",
      badge: "./icons/icon-192.png",
      tag: "nosh7-notification",
      renotify: true
    })
  );
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/")
  );
});
