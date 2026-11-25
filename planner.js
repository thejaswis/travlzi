(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const STORE_KEY = "travlzi.trip.v1";
  const today = new Date();
  const iso = date => { const d=new Date(date); return new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10); };
  const addDays = (date,days) => { const d=new Date(date+"T12:00:00"); d.setDate(d.getDate()+days); return iso(d); };
  const money = value => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(Number(value)||0);
  const uid = () => "a"+Date.now().toString(36)+Math.random().toString(36).slice(2,7);
  const destinations = {
    goa:{name:"Goa",lat:15.4909,lon:73.8278,places:[
      ["Breakfast by the beach","Ease into the day with a relaxed breakfast near the water.","Food","08:30",650,15.2993,73.9122],
      ["Fort Aguada","Explore the historic fort and its sweeping sea views.","Culture","10:30",50,15.4923,73.7737],
      ["Lunch in Panjim","Try a local Goan thali and regional flavours.","Food","13:00",900,15.4989,73.8278],
      ["Fontainhas heritage walk","Wander through colourful lanes and old Portuguese-era homes.","Culture","16:00",0,15.4982,73.8310],
      ["Sunset at Vagator","Finish the day with a coastal sunset.","Nature","17:45",0,15.5975,73.7355],
      ["Spice plantation visit","Discover tropical spices and a traditional lunch.","Nature","10:00",1200,15.4167,74.0550],
      ["Kayaking or watersports","Choose a water activity that suits the season and conditions.","Attraction","15:00",1500,15.5330,73.7660]
    ]},
    kerala:{name:"Kerala",lat:9.9312,lon:76.2673,places:[
      ["Fort Kochi walk","Explore the waterfront, heritage lanes and cafés.","Culture","08:30",0,9.9658,76.2421],
      ["Chinese fishing nets","See the iconic fishing nets along the harbour.","Attraction","10:00",0,9.9667,76.2425],
      ["Kerala lunch","Try a traditional Kerala sadya or local seafood.","Food","13:00",650,9.9312,76.2673],
      ["Mattancherry Palace","Discover Kerala's layered history and murals.","Culture","15:00",20,9.9570,76.2590],
      ["Sunset ferry","Take a scenic ferry ride across the harbour.","Nature","17:30",100,9.9670,76.2500],
      ["Backwater day trip","Slow down with a backwater cruise and village views.","Nature","09:00",1800,9.4981,76.3388]
    ]},
    bali:{name:"Bali",lat:-8.4095,lon:115.1889,places:[
      ["Ubud morning market","Browse crafts, fruit and local treats.","Culture","08:30",100, -8.5069,115.2625],
      ["Tegallalang rice terraces","Walk through Bali's iconic green terraces.","Nature","10:30",150,-8.4312,115.2792],
      ["Local Balinese lunch","Take a break for nasi campur and fresh juice.","Food","13:00",180, -8.5069,115.2625],
      ["Tirta Empul temple","Visit the historic water temple respectfully.","Culture","15:00",100,-8.4150,115.3150],
      ["Campuhan ridge walk","Enjoy a gentle late-afternoon nature walk.","Nature","17:00",0,-8.5005,115.2550],
      ["Beach sunset","Leave the evening open for the coast.","Nature","17:45",0,-8.7200,115.1680]
    ]},
    kyoto:{name:"Kyoto",lat:35.0116,lon:135.7681,places:[
      ["Nishiki Market","Sample local snacks and browse food stalls.","Food","09:00",0,35.0050,135.7648],
      ["Fushimi Inari","Walk beneath the famous torii gates.","Culture","10:30",0,34.9671,135.7727],
      ["Traditional lunch","Enjoy a seasonal Japanese set meal.","Food","13:00",1800,35.0037,135.7681],
      ["Kiyomizu-dera","Explore the hillside temple and city views.","Culture","15:00",500,34.9949,135.7850],
      ["Gion evening stroll","Discover the historic streets at a respectful pace.","Culture","17:30",0,35.0036,135.7785]
    ]},
    interlaken:{name:"Interlaken",lat:46.6863,lon:7.8632,places:[
      ["Höhematte park","Start with open views of the Jungfrau peaks.","Nature","09:00",0,46.6867,7.8632],
      ["Harder Kulm viewpoint","Ride up for a panoramic view over Interlaken.","Attraction","10:30",4000,46.7010,7.8510],
      ["Swiss lunch","Try a local café and a hearty Swiss meal.","Food","13:00",2500,46.6863,7.8632],
      ["Lake Brienz lakeside","Enjoy the turquoise lake and mountain scenery.","Nature","15:00",0,46.7540,7.9580],
      ["Old town evening","Browse the town centre and enjoy a relaxed dinner.","Food","18:00",2200,46.6863,7.8632]
    ]},
    inverness:{name:"Inverness",lat:57.4778,lon:-4.2247,places:[
      ["River Ness walk","Follow the riverside paths into the city.","Nature","09:00",0,57.4770,-4.2240],
      ["Inverness Castle viewpoint","Take in the views over the River Ness.","Culture","10:30",0,57.4760,-4.2240],
      ["Highland café lunch","Pause for local produce and a warm drink.","Food","13:00",1600,57.4778,-4.2247],
      ["Leakey's Bookshop","Explore the atmospheric second-hand bookshop.","Culture","15:00",0,57.4784,-4.2253],
      ["Caledonian Canal","Enjoy an easy walk beside the canal.","Nature","17:00",0,57.4710,-4.2490]
    ]},
    agatti:{name:"Agatti Island",lat:10.8510,lon:72.1850,places:[
      ["Lagoon morning","Enjoy the clear lagoon and a gentle beach walk.","Nature","08:00",0,10.8510,72.1850],
      ["Snorkelling session","Explore the reef only with an authorised local operator and suitable conditions.","Attraction","10:00",1800,10.8500,72.1860],
      ["Island lunch","Try a simple local meal and fresh coconut.","Food","13:00",700,10.8510,72.1850],
      ["Coastal village walk","Explore the island respectfully with local guidance.","Culture","16:00",0,10.8550,72.1900],
      ["Lagoon sunset","Keep the evening open for the water and changing light.","Nature","17:30",0,10.8510,72.1850]
    ]}
  };
  const state = {trip:null,map:null,markers:[],route:null,dragId:null,toastTimer:null};
  function defaultTrip(){
    const start=addDays(iso(today),14),end=addDays(start,2);
    return {destination:"Goa",origin:"Bengaluru",startDate:start,endDate:end,travellers:2,travelStyle:"balanced",budget:25000,days:[],ideas:[],updatedAt:null};
  }
  function tripKey(destination){const key=String(destination||"").toLowerCase();return Object.keys(destinations).find(k=>key.includes(k)||destinations[k].name.toLowerCase().includes(key))||"goa";}
  function makeActivity(place,dayIndex){
    return {id:uid(),name:place[0],note:place[1],category:place[2],time:place[3],cost:place[4],lat:place[5],lon:place[6],day:dayIndex};
  }
  function buildDays(trip){
    const count=Math.max(1,Math.min(14,Math.round((new Date(trip.endDate+"T12:00:00")-new Date(trip.startDate+"T12:00:00"))/86400000)+1));
    const key=tripKey(trip.destination),data=destinations[key];
    return Array.from({length:count},(_,i)=>{
      const selected=data.places.filter((_,n)=>n%count===i || (count===1&&n<5)).slice(0,5);
      return {date:addDays(trip.startDate,i),activities:selected.map(p=>makeActivity(p,i))};
    });
  }
  function toast(message){
    const el=$("toast");el.textContent=message;el.classList.add("show");
    clearTimeout(state.toastTimer);state.toastTimer=setTimeout(()=>el.classList.remove("show"),2600);
  }
  function save(silent=false){
    try{state.trip.updatedAt=new Date().toISOString();localStorage.setItem(STORE_KEY,JSON.stringify(state.trip));$("save-state").textContent="Saved in this browser";if(!silent)toast("Your trip is saved on this device.");}
    catch(error){$("save-state").textContent="Could not save";toast("Browser storage is unavailable. Export your trip to keep a copy.");}
  }
  function load(){
    try{const saved=JSON.parse(localStorage.getItem(STORE_KEY)||"null");if(saved&&saved.destination&&Array.isArray(saved.days))return saved;}catch(error){}
    const trip=defaultTrip();trip.days=buildDays(trip);return trip;
  }
  function setFormFromTrip(){
    const t=state.trip;
    $("destination").value=t.destination;$("origin").value=t.origin;$("start-date").value=t.startDate;$("end-date").value=t.endDate;
    $("travellers").value=String(t.travellers);$("travel-style").value=t.travelStyle;$("budget").value=t.budget;
  }
  function updateTripFromForm(){
    const start=$("start-date").value,end=$("end-date").value;
    if(!start||!end||end<start){toast("Please choose a valid trip date range.");return false;}
    const next={destination:$("destination").value.trim(),origin:$("origin").value.trim(),startDate:start,endDate:end,travellers:Number($("travellers").value),travelStyle:$("travel-style").value,budget:Number($("budget").value)||0,days:state.trip.days,ideas:state.trip.ideas||[],updatedAt:null};
    if(!next.destination){toast("Add a destination to build your trip.");return false;}
    const oldCount=state.trip.days.length,newCount=Math.min(14,Math.round((new Date(end+"T12:00:00")-new Date(start+"T12:00:00"))/86400000)+1);
    if(oldCount!==newCount||state.trip.startDate!==start){next.days=buildDays(next);next.ideas=state.trip.ideas||[];}
    state.trip=next;return true;
  }
  function fmtDate(date){return new Intl.DateTimeFormat("en-IN",{weekday:"short",day:"numeric",month:"short"}).format(new Date(date+"T12:00:00"));}
  function styleLabel(value){return ({balanced:"Balanced",relaxed:"Relaxed",adventure:"Adventure",culture:"Culture & food",family:"Family friendly",budget:"Budget conscious"})[value]||"Balanced";}
  function allActivities(){return state.trip.days.flatMap((day,index)=>day.activities.map(a=>({...a,day:index}))).concat((state.trip.ideas||[]).map(a=>({...a,day:-1})));}
  function renderActivity(activity,idea=false){
    const card=document.createElement("article");card.className=idea?"idea-card":"activity-card";card.draggable=true;card.dataset.id=activity.id;card.dataset.idea=String(idea);
    card.addEventListener("dragstart",event=>{state.dragId=activity.id;card.classList.add("dragging");event.dataTransfer.effectAllowed="move";event.dataTransfer.setData("text/plain",activity.id);});
    card.addEventListener("dragend",()=>{state.dragId=null;card.classList.remove("dragging");document.querySelectorAll(".drag-over").forEach(el=>el.classList.remove("drag-over"));});
    const handle=document.createElement("span");handle.className="drag-handle";handle.textContent="⠿";handle.setAttribute("aria-hidden","true");
    const time=document.createElement("span");time.className="activity-time";time.textContent=activity.time||"Anytime";
    const info=document.createElement("div");info.className="activity-info";
    const title=document.createElement("strong");title.textContent=activity.name;
    const note=document.createElement("p");note.textContent=activity.note||activity.category||"Added to your trip";
    info.append(title,note);
    const meta=document.createElement("div");meta.className="activity-meta";
    const category=document.createElement("span");category.className="category-pill";category.textContent=activity.category||"Activity";
    const cost=document.createElement("span");cost.className="activity-cost";cost.textContent=Number(activity.cost)>0?money(activity.cost):"Free";
    meta.append(category,cost);
    if(idea){
      const add=document.createElement("button");add.type="button";add.className="idea-add";add.textContent="Add to day";add.addEventListener("click",()=>moveActivity(activity.id,0));meta.append(add);
      card.append(handle,time,info,meta);return card;
    }
    const remove=document.createElement("button");remove.type="button";remove.className="activity-remove";remove.textContent="×";remove.setAttribute("aria-label","Remove "+activity.name);remove.addEventListener("click",()=>removeActivity(activity.id));
    meta.append(remove);card.append(handle,time,info,meta);return card;
  }
  function attachDropZone(zone,dayIndex,ideas=false){
    zone.addEventListener("dragover",event=>{event.preventDefault();zone.classList.add("drag-over");});
    zone.addEventListener("dragleave",event=>{if(!zone.contains(event.relatedTarget))zone.classList.remove("drag-over");});
    zone.addEventListener("drop",event=>{event.preventDefault();zone.classList.remove("drag-over");const id=event.dataTransfer.getData("text/plain")||state.dragId;if(id)moveActivity(id,dayIndex,ideas);});
  }
  function renderDays(){
    const container=$("days-container");container.replaceChildren();
    state.trip.days.forEach((day,index)=>{
      const section=document.createElement("section");section.className="day-card";section.dataset.day=index;
      const head=document.createElement("div");head.className="day-heading";
      const left=document.createElement("div"),title=document.createElement("strong"),date=document.createElement("small");
      title.textContent="Day "+(index+1);date.textContent=fmtDate(day.date);left.append(title,date);
      const count=document.createElement("span");count.className="day-count";count.textContent=day.activities.length+" "+(day.activities.length===1?"stop":"stops");head.append(left,count);
      const list=document.createElement("div");list.className="activity-list";list.dataset.day=index;
      day.activities.forEach(activity=>list.append(renderActivity(activity)));
      if(!day.activities.length){const empty=document.createElement("p");empty.className="day-drop-hint";empty.textContent="Drop an activity here or add a new stop.";list.append(empty);}
      attachDropZone(list,index,false);section.append(head,list);container.append(section);
    });
  }
  function renderIdeas(){
    const list=$("unscheduled-list");list.replaceChildren();
    (state.trip.ideas||[]).forEach(a=>list.append(renderActivity(a,true)));
    if(!(state.trip.ideas||[]).length){const p=document.createElement("p");p.className="empty-state";p.textContent="No saved ideas yet. Add an activity and keep it here for later.";list.append(p);}
    attachDropZone(list,-1,true);$("idea-count").textContent=(state.trip.ideas||[]).length+" ideas";
  }
  function renderStats(){
    const t=state.trip,stops=t.days.reduce((sum,d)=>sum+d.activities.length,0),days=t.days.length,group=t.budget*t.travellers;
    $("trip-title").textContent=t.destination+" getaway";$("trip-subtitle").textContent=days+" days · "+t.travellers+" travellers · from "+(t.origin||"your city");
    $("stat-days").textContent=days+" "+(days===1?"day":"days");$("stat-stops").textContent=stops+" stops";$("stat-budget").textContent=money(t.budget);$("stat-pace").textContent=styleLabel(t.travelStyle);
    $("budget-total").textContent=money(group);$("budget-group").textContent=money(group);$("budget-daily").textContent=money(days?group/days:group);
    const activityCost=allActivities().reduce((s,a)=>s+(Number(a.cost)||0),0),pct=group?Math.min(100,activityCost/group*100):0;
    $("budget-bar-fill").style.width=pct+"%";
  }
  function mapCenter(){
    const key=tripKey(state.trip.destination),d=destinations[key];return [d.lat,d.lon];
  }
  function initMap(){
    if(!window.L){$("trip-map").innerHTML='<p class="empty-state" style="padding:20px">Map library could not load. Your itinerary still works without the map.</p>';return;}
    state.map=L.map("trip-map",{scrollWheelZoom:false}).setView(mapCenter(),11);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"&copy; OpenStreetMap"}).addTo(state.map);
    renderMap();
  }
  function renderMap(){
    if(!state.map)return;
    state.markers.forEach(m=>m.remove());state.markers=[];
    if(state.route){state.route.remove();state.route=null;}
    const items=allActivities().filter(a=>Number.isFinite(Number(a.lat))&&Number.isFinite(Number(a.lon)));
    const points=[];
    items.forEach((a,i)=>{
      const isIdea=a.day===-1;
      const marker=L.circleMarker([Number(a.lat),Number(a.lon)],{radius:8,color:isIdea?"#b97835":"#087f8c",fillColor:isIdea?"#efb56f":"#43b7a5",fillOpacity:.95,weight:2}).addTo(state.map);
      marker.bindPopup("<strong>"+escapeHtml(a.name)+"</strong><span>"+(isIdea?"Saved idea":"Day "+(a.day+1)+" · "+escapeHtml(a.time||""))+"</span>");
      state.markers.push(marker);if(!isIdea)points.push([Number(a.lat),Number(a.lon)]);
    });
    if(points.length>1)state.route=L.polyline(points,{color:"#087f8c",weight:3,opacity:.65,dashArray:"5 7"}).addTo(state.map);
    if(items.length)state.map.fitBounds(items.map(a=>[Number(a.lat),Number(a.lon)]),{padding:[25,25],maxZoom:13});
    else state.map.setView(mapCenter(),11);
    setTimeout(()=>state.map.invalidateSize(),80);
  }
  function escapeHtml(text){return String(text).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
  function render(){
    renderDays();renderIdeas();renderStats();renderMap();
  }
  function moveActivity(id,targetDay,asIdea=false){
    let activity=null;
    state.trip.days.forEach(day=>{const i=day.activities.findIndex(a=>a.id===id);if(i>=0)activity=day.activities.splice(i,1)[0];});
    const ideaIndex=(state.trip.ideas||[]).findIndex(a=>a.id===id);if(ideaIndex>=0)activity=state.trip.ideas.splice(ideaIndex,1)[0];
    if(!activity)return;
    if(asIdea||targetDay<0){state.trip.ideas.push(activity);}
    else{const day=Math.max(0,Math.min(state.trip.days.length-1,targetDay));activity.day=day;state.trip.days[day].activities.push(activity);state.trip.days[day].activities.sort((a,b)=>(a.time||"").localeCompare(b.time||""));}
    render();save(true);
  }
  function removeActivity(id){
    state.trip.days.forEach(day=>day.activities=day.activities.filter(a=>a.id!==id));
    state.trip.ideas=(state.trip.ideas||[]).filter(a=>a.id!==id);render();save(true);toast("Activity removed.");
  }
  function openDialog(){
    const select=$("activity-day");select.replaceChildren();
    state.trip.days.forEach((day,i)=>{const o=document.createElement("option");o.value=String(i);o.textContent="Day "+(i+1)+" · "+fmtDate(day.date);select.append(o);});
    $("activity-form").dataset.mode="add";$("activity-name").value="";$("activity-note").value="";$("activity-time").value="10:00";$("activity-cost").value="0";$("activity-location").value="";
    $("activity-dialog").showModal();
  }
  function activityFromForm(){
    const name=$("activity-name").value.trim();if(!name){toast("Give your activity a name first.");return null;}
    const activity={id:uid(),name,note:$("activity-note").value.trim(),time:$("activity-time").value||"Anytime",category:$("activity-category").value,cost:Number($("activity-cost").value)||0,location:$("activity-location").value.trim()};
    return activity;
  }
  async function geocode(activity){
    if(!activity.location)return;
    try{
      const query=encodeURIComponent(activity.location+", "+state.trip.destination);
      const response=await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+query,{headers:{Accept:"application/json"}});
      if(!response.ok)return;const results=await response.json();
      if(results[0]){activity.lat=Number(results[0].lat);activity.lon=Number(results[0].lon);}
    }catch(error){console.info("Could not look up this activity location.");}
  }
  async function submitActivity(asIdea=false){
    const a=activityFromForm();if(!a)return;
    const dayIndex=Number($("activity-day").value)||0;
    await geocode(a);
    if(asIdea)state.trip.ideas.push(a);else state.trip.days[dayIndex].activities.push(a);
    $("activity-dialog").close();render();save(true);toast(asIdea?"Saved to your ideas.":"Activity added to your itinerary.");
  }
  function exportTrip(){
    const blob=new Blob([JSON.stringify({product:"Travlzi",exportedAt:new Date().toISOString(),trip:state.trip},null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="travlzi-"+state.trip.destination.toLowerCase().replace(/[^a-z0-9]+/g,"-")+"-trip.json";a.click();URL.revokeObjectURL(url);toast("Trip exported as JSON.");
  }
  async function smartBuild(){
    if(!updateTripFromForm())return;
    const endpoint=window.TRAVLZI_CONFIG&&window.TRAVLZI_CONFIG.aiEndpoint;
    if(endpoint){
      try{
        const response=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({destination:state.trip.destination,origin:state.trip.origin,startDate:state.trip.startDate,endDate:state.trip.endDate,travellers:state.trip.travellers,style:state.trip.travelStyle,budgetPerPerson:state.trip.budget})});
        if(!response.ok)throw new Error("Planner service returned "+response.status);
        const data=await response.json();
        if(Array.isArray(data.days)&&data.days.length){state.trip.days=data.days;render();save(true);toast("Your personalised itinerary is ready.");return;}
      }catch(error){console.warn("AI itinerary endpoint unavailable; using local starter plan.",error);}
    }
    state.trip.days=buildDays(state.trip);state.trip.ideas=[];
    render();save(true);
    toast("A starter itinerary is ready. Drag, edit and make it yours.");
  }
  function suggestTweak(){
    const ideas=[
      "Try leaving one afternoon free for an unplanned discovery.",
      "Add a local breakfast or food market to experience the destination like a local.",
      "Group nearby attractions on the same day to reduce travel time.",
      "Keep your first day light so there is room for the journey and check-in.",
      "Add a nature stop or viewpoint around sunset for a slower finish."
    ];
    const suggestion=ideas[Math.floor(Math.random()*ideas.length)];toast(suggestion);
  }
  $("trip-form").addEventListener("submit",event=>{event.preventDefault();smartBuild();});
  $("add-activity-button").addEventListener("click",openDialog);
  $("activity-form").addEventListener("submit",event=>{event.preventDefault();submitActivity(false);});
  $("save-as-idea").addEventListener("click",()=>submitActivity(true));
  $("dialog-close").addEventListener("click",()=>$("activity-dialog").close());
  $("activity-dialog").addEventListener("click",event=>{if(event.target===$("activity-dialog"))$("activity-dialog").close();});
  $("export-button").addEventListener("click",exportTrip);
  $("print-button").addEventListener("click",()=>window.print());
  $("suggest-button").addEventListener("click",suggestTweak);
  $("map-reset").addEventListener("click",()=>{if(state.map)state.map.setView(mapCenter(),11);});
  $("trip-form").addEventListener("change",()=>{if(updateTripFromForm()){renderStats();save(true);}});
  $("whatsapp-planner").addEventListener("click",event=>{
    const number="918147728538";const text="Hi Travlzi! I'd like help planning a "+state.trip.days.length+"-day trip to "+state.trip.destination+" from "+state.trip.origin+".";
    event.currentTarget.href="https://wa.me/"+number+"?text="+encodeURIComponent(text);
  });
  state.trip=load();setFormFromTrip();renderStats();initMap();render();save(true);
})();