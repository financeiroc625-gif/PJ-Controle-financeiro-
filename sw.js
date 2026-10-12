const C='financas-v7',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>fetch(u,{cache:'reload'}).then(r=>c.put(u,r))))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;const u=new URL(q.url);
if(u.origin!==location.origin){if(u.hostname==='cdnjs.cloudflare.com')e.respondWith(caches.match(q).then(r=>r||fetch(q).then(n=>{const c=n.clone();caches.open(C).then(x=>x.put(q,c));return n})));return}
e.respondWith(fetch(q.url,{cache:'no-cache'}).then(n=>{if(n.ok){const c=n.clone();caches.open(C).then(x=>x.put(q,c))}return n}).catch(()=>caches.match(q).then(r=>r||caches.match('index.html'))))});
