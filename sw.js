const V="fr-v1";
const FILES=["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png", "audio/01.mp3", "audio/02.mp3", "audio/03.mp3", "audio/04.mp3", "audio/05.mp3", "audio/06.mp3", "audio/07.mp3", "audio/08.mp3", "audio/09.mp3", "audio/10.mp3", "audio/11.mp3", "audio/12.mp3", "audio/13.mp3", "audio/14.mp3", "audio/15.mp3", "audio/16.mp3", "audio/17.mp3"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET")return;
 const u=new URL(e.request.url);
 if(u.origin!==location.origin)return;
 if(e.request.mode==="navigate"||u.pathname.endsWith(".html")||u.pathname.endsWith("/")){
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match("index.html"))));return}
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{const c=n.clone();caches.open(V).then(x=>x.put(e.request,c));return n})));
});
