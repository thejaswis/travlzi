const travelEssentials = [
  {category:"summer",icon:"☀",title:"UV-protection sunglasses",reason:"A practical pick for bright days, sightseeing and beach time.",search:"UV protection sunglasses"},
  {category:"summer",icon:"☀",title:"Wide-brim sun hat",reason:"Adds shade during outdoor walks and sunny excursions.",search:"wide brim sun hat travel"},
  {category:"summer",icon:"☀",title:"Reusable water bottle",reason:"Keep water handy while exploring; choose a size that fits your day bag.",search:"reusable leakproof water bottle"},
  {category:"winter",icon:"❄",title:"Thermal base layers",reason:"A useful first layer for cold-weather destinations.",search:"thermal base layer clothing"},
  {category:"winter",icon:"❄",title:"Warm gloves and beanie",reason:"Compact accessories that help on chilly walks and windy viewpoints.",search:"winter gloves beanie set"},
  {category:"winter",icon:"❄",title:"Insulated jacket",reason:"Look for weather-appropriate insulation and a comfortable fit.",search:"packable insulated winter jacket"},
  {category:"rainy",icon:"☂",title:"Packable rain jacket",reason:"A lightweight outer layer for changeable weather.",search:"packable waterproof rain jacket"},
  {category:"rainy",icon:"☂",title:"Compact travel umbrella",reason:"An easy-to-carry option for city breaks and sudden showers.",search:"compact windproof travel umbrella"},
  {category:"rainy",icon:"☂",title:"Water-resistant day bag",reason:"Helps keep everyday travel items protected from light rain.",search:"water resistant daypack backpack"},
  {category:"adventure",icon:"↟",title:"Comfortable walking shoes",reason:"Prioritise fit, grip and the terrain you actually plan to cover.",search:"comfortable trekking walking shoes"},
  {category:"adventure",icon:"↟",title:"Daypack with padded straps",reason:"A handy carry-all for snacks, a water bottle and an extra layer.",search:"lightweight hiking daypack padded straps"},
  {category:"adventure",icon:"↟",title:"Packing organisers",reason:"Separate clothing and small essentials to make unpacking easier.",search:"travel packing cubes organiser set"}
];
const grid=document.getElementById("essentials-grid");
const filters=document.getElementById("essentials-filters");
function renderEssentials(filter="all"){
  grid.replaceChildren();
  const matches=travelEssentials.filter(item=>filter==="all"||item.category===filter);
  if(!matches.length){const p=document.createElement("p");p.className="empty";p.textContent="No items in this category yet.";grid.append(p);return;}
  matches.forEach(item=>{
    const card=document.createElement("article");card.className="card";
    const icon=document.createElement("span");icon.className="icon";icon.setAttribute("aria-hidden","true");icon.textContent=item.icon;
    const category=document.createElement("span");category.className="category";category.textContent=item.category;
    const title=document.createElement("h2");title.textContent=item.title;
    const reason=document.createElement("p");reason.textContent=item.reason;
    const links=document.createElement("div");links.className="links";
    [["Amazon India","https://www.amazon.in/s?k="],["Flipkart","https://www.flipkart.com/search?q="]].forEach(([label,url])=>{
      const a=document.createElement("a");a.href=url+encodeURIComponent(item.search);a.target="_blank";a.rel="noopener noreferrer";a.textContent=label+" ↗";links.append(a);
    });
    card.append(icon,category,title,reason,links);grid.append(card);
  });
}
filters.querySelectorAll("button[data-filter]").forEach(button=>{
  button.addEventListener("click",()=>{
    const selected=button.dataset.filter||"all";
    filters.querySelectorAll("button[data-filter]").forEach(item=>{
      const active=item===button;item.classList.toggle("active",active);item.setAttribute("aria-pressed",String(active));
    });
    renderEssentials(selected);
  });
});
document.getElementById("year").textContent=new Date().getFullYear();
renderEssentials();