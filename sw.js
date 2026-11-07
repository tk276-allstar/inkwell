const CACHE='inkwell-v9';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{
    if(r&&(r.ok||r.type==='opaque')){const c=r.clone();caches.open(CACHE).then(k=>k.put(e.request,c))}
    return r;
  }).catch(()=>caches.match(e.request)));
});
