// Egyszerű offline gyorsítótár: az app héja induláskor mentődik.
// A tokens.css és a lib/v1 külső (laszlobiri.com), ezért nincs az előre mentett listában;
// az első betöltéskor kerülnek a gyorsítótárba.
const CACHE = 'bevasarlo-v16';
const ASSETS = ['./', 'index.html', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png', 'icon-180.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Ezeket a kéréseket a service worker nem kezeli: a Supabase (belépés, adat) válaszai
// tokent és személyes adatot tartalmaznak, nem kerülhetnek gyorsítótárba, és offline
// sem jöhet belőlük elavult válasz. A belépőoldal is mindig a hálózatról jön.
function bypass(url) {
  return url.hostname.endsWith('.supabase.co')
    || url.pathname.startsWith('/auth/v1/') || url.pathname.startsWith('/rest/v1/') || url.pathname.startsWith('/realtime/v1/')
    || (url.hostname === 'laszlobiri.com' && url.pathname.startsWith('/belepes/'));
}

// Hálózat először (hogy a frissítések megjelenjenek), offline esetén gyorsítótár.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (bypass(url)) return;
  e.respondWith(
    fetch(e.request).then(res => {
      if (res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('./')))
  );
});
