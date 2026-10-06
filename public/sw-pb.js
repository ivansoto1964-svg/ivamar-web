const PB_CACHE = 'planeta-boricua-v4';
const PB_STATIC = [
  '/manifest-pb.json',
  '/icons/pb/icon-192.png',
  '/icons/pb/icon-512.png',
  '/icons/pb/apple-touch-icon.png',
  '/icons/pb/notification-badge.svg',
  '/img/og-planetaboricua.jpg',
  '/offline-pb.html'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(PB_CACHE).then(cache => cache.addAll(PB_STATIC)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== PB_CACHE).map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith('/api/') || url.pathname.startsWith('/admin/')) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match('/offline-pb.html')));
    return;
  }
  event.respondWith(
    fetch(event.request).then(response => {
      if (response.ok && /\.(css|js|png|jpe?g|webp|svg|woff2?)$/i.test(url.pathname)) {
        const copy = response.clone();
        event.waitUntil(caches.open(PB_CACHE).then(cache => cache.put(event.request, copy)));
      }
      return response;
    }).catch(() => caches.match(event.request))
  );
});

self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(self.registration.showNotification(data.title || 'Planeta Boricua 🇵🇷', {
    body: data.body || 'Hay algo nuevo en nuestro Planeta Boricua.',
    icon: '/icons/pb/icon-192.png',
    badge: '/icons/pb/notification-badge.svg',
    vibrate: [120, 70, 180],
    data: { url: data.url || '/' },
    tag: data.tag || 'pb-update'
  }));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const target = event.notification.data?.url || '/';
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const client of list) {
      if ('focus' in client) {
        client.navigate(target);
        return client.focus();
      }
    }
    return clients.openWindow(target);
  }));
});
