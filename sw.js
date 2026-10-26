'use strict';

const VERSION = 'digital-core-v4';
const CORE = [
  'index.html',
  'assets/images/favicon.png',
  'assets/images/favicon.ico',
  'assets/images/apple-touch-icon.png',
  'assets/css/style.css',
  'assets/js/color-mesh.js',
  'assets/js/app.js',
  'assets/images/brand-logo.jpg',
  'assets/images/hero-anchor.webp',
  'assets/images/expertise-methodology.png',
  'assets/images/projects/nova-pack/01-storefront-overview.jpeg',
  'assets/data/projects.json',
  'assets/data/projects-fallback.json',
  'modules/bot/bot-widget.css',
  'modules/bot/main.js',
  'modules/bot/fsm-controller.js',
  'modules/bot/briefAdapter.js',
  'modules/bot/calendarAdapter.js',
  'modules/bot/docsAdapter.js',
  'modules/bot/bookingAdapter.js'
];
const EXTERNAL = ['https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap'];
const EXTERNAL_MODE = 'no-cors'; // 'cors' ТОЛЬКО если у link в index.html есть атрибут crossorigin
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

const scopeUrl = new URL(self.registration.scope);
const toKey = (value) => {
  const url = new URL(value, scopeUrl);
  url.search = '';
  url.hash = '';
  return url.href;
};
const coreUrls = CORE.map(toKey);
const indexUrl = toKey('index.html');
let refreshing = null;

const refreshCore = () => {
  if (refreshing) return refreshing;
  refreshing = (async () => {
    const responses = await Promise.all(coreUrls.map((url) => fetch(new Request(url, { cache: 'no-cache' }))));
    if (!responses.every((response) => response.ok)) return;
    const cache = await caches.open(VERSION);
    await Promise.all(coreUrls.map((url, index) => cache.put(url, responses[index])));
  })().catch(() => {}).finally(() => { refreshing = null; });
  return refreshing;
};

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    await cache.addAll(coreUrls.map((url) => new Request(url, { cache: 'reload' })));
    await Promise.all(EXTERNAL.map((url) =>
      fetch(new Request(url, { mode: EXTERNAL_MODE }))
        .then((response) => {
          if (response.ok || response.type === 'opaque') return cache.put(url, response);
        })
        .catch(() => {})
    ));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith('digital-core-') && key !== VERSION).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || request.headers.has('range')) return;
  const url = new URL(request.url);

  if (FONT_HOSTS.includes(url.hostname)) {
    event.respondWith((async () => {
      const cache = await caches.open(VERSION);
      const cached = await cache.match(request);
      const network = fetch(request).then((response) => {
        if (response.ok || response.type === 'opaque') cache.put(request, response.clone());
        return response;
      });
      if (cached) {
        event.waitUntil(network.catch(() => {}));
        return cached;
      }
      return network;
    })());
    return;
  }

  if (url.origin !== scopeUrl.origin || !url.href.startsWith(scopeUrl.href)) return;

  if (request.mode === 'navigate') {
    if (url.pathname !== scopeUrl.pathname && url.pathname !== new URL(indexUrl).pathname) return;
    event.respondWith((async () => {
      const cached = await (await caches.open(VERSION)).match(indexUrl);
      if (!cached) return fetch(request);
      event.waitUntil(refreshCore());
      return cached;
    })());
    return;
  }

  const coreKey = toKey(request.url);
  if (coreUrls.includes(coreKey)) {
    event.respondWith((async () => {
      const cached = await (await caches.open(VERSION)).match(coreKey);
      return cached || fetch(request);
    })());
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const cached = await cache.match(request);
    const network = fetch(request).then((response) => {
      if (response.ok && response.type === 'basic') cache.put(request, response.clone());
      return response;
    });
    if (cached) {
      event.waitUntil(network.catch(() => {}));
      return cached;
    }
    return network;
  })());
});
