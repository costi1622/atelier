/* Atelier: service worker.
   ATENȚIE: cache-urile sunt comune pe tot domeniul (costi1622.github.io), deci și cu Nivelo.
   Aici ștergem DOAR cache-urile care încep cu „atelier-”. */
const VER='1.0';
const CACHE='atelier-v'+VER;
const FONTS='atelier-fonts';
const SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png'];

self.addEventListener('install',e=>{
  /* fișier cu fișier, nu addAll: un fișier lipsă nu trebuie să blocheze instalarea */
  e.waitUntil(caches.open(CACHE).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('atelier-')&&k!==CACHE&&k!==FONTS).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim()));
});
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting()});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET')return;
  const u=new URL(r.url);
  /* fonturile: din cache, actualizate în fundal */
  if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'){
    e.respondWith(caches.open(FONTS).then(c=>c.match(r).then(hit=>{
      const net=fetch(r).then(res=>{if(res.ok||res.type==='opaque')c.put(r,res.clone());return res}).catch(()=>hit);
      return hit||net})));
    return;
  }
  if(u.origin!==location.origin)return;
  /* manifestul mereu din rețea, ca să nu rămână blocat într-o versiune veche */
  if(u.pathname.endsWith('.webmanifest'))return;
  /* pagina: rețea întâi, cache dacă nu e internet */
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put('index.html',cp));return res})
      .catch(()=>caches.match('index.html').then(x=>x||caches.match('./'))));
    return;
  }
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r)));
});
