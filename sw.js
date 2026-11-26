const CACHE="travlzi-shell-v1";
const FILES=["./","./index.html","./planner.html","./style.css","./planner.css","./features.css","./script.js","./planner.js","./features.js","./partners.json","./manifest.webmanifest","./images/travlzi-logo.svg"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=="GET"||url.origin!==self.location.origin)return;
 event.respondWith((async()=>{
  const cached=await caches.match(request);
  if(cached)return cached;
  try{const response=await fetch(request);if(response.ok){const cache=await caches.open(CACHE);cache.put(request,response.clone());}return response;}
  catch(error){return caches.match("./index.html");}
 })());
});
