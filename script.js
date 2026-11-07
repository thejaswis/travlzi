const fallbackContent = {
  heroTitle: "Travel that feels like you.",
  heroSubtitle: "Thoughtfully planned journeys, shaped around your kind of adventure — with real-world tips and better-value finds.",
  heroImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=85",
  approachImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1100&q=85",
  founderName: "Thejaswi",
  founderBio: "I believe the best journeys feel personal. Travlzi brings together destination know-how, thoughtful planning, and little details that turn a holiday into your story.",
  whatsappNumber: "918147728538",
  email: "",
  destinations: [
    { name: "Kerala", country: "India", tag: "Slow & scenic", description: "Backwater mornings, misty tea gardens, and a slower kind of escape.", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85" },
    { name: "Bali", country: "Indonesia", tag: "Island energy", description: "Waterfalls, green rice terraces, beach sunsets, and hidden local gems.", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85" },
    { name: "Kyoto", country: "Japan", tag: "Culture & calm", description: "Quiet lanes, beautiful temples, seasonal colour, and unforgettable food.", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=85" },
    { name: "Swiss Alps", country: "Switzerland", tag: "Mountain air", description: "Panoramic train rides, alpine villages, and big-sky mountain views.", image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=85" },
    { name: "Interlaken", country: "Switzerland", tag: "Christmas escape", description: "A three-day Swiss getaway with snowy peaks, festive lights, scenic mountain trains, and local winter treats.", image: "https://raw.githubusercontent.com/thejaswis/travlzi/feature/modern-travlzi-landing/Interlaken/IMG4.JPG", detailsUrl: "interlaken.html" }
  ]
};

let content = fallbackContent;
const byId = id => document.getElementById(id);
const safeText = value => String(value ?? "");

function setContactLinks() {
  const number = safeText(content.whatsappNumber).replace(/\D/g, "");
  const email = safeText(content.email).trim();
  const whatsappLink = byId("contact-whatsapp");
  const emailLink = byId("contact-email-link");
  const hint = byId("contact-hint");
  if (number) {
    whatsappLink.href = "https://wa.me/" + number + "?text=" + encodeURIComponent("Hi Travlzi! I'd love help planning a trip.");
    whatsappLink.target = "_blank";
    whatsappLink.rel = "noopener noreferrer";
  } else {
    whatsappLink.href = "https://wa.me/";
    hint.textContent = "Add your WhatsApp number in content.json to activate direct chat. Use country code, digits only.";
  }
  if (email) {
    emailLink.href = "mailto:" + email;
    emailLink.textContent = "Or send an email ↗";
  } else {
    emailLink.href = "mailto:hello@travlzi.com";
  }
  if (number && email) hint.textContent = "We'd love to hear what kind of trip you're dreaming of.";
  else if (number && !email) hint.textContent = "WhatsApp is ready. Add an email in content.json if you'd like to offer email contact too.";
}

function renderDestinations() {
  const grid = byId("destination-grid");
  grid.replaceChildren();
  (content.destinations || []).forEach((destination) => {
    const card = document.createElement("article");
    card.className = "destination-card";
    const imageWrap = document.createElement("div");
    imageWrap.className = "destination-photo-wrap";
    const image = document.createElement("img");
    image.className = "destination-photo";
    image.src = destination.image || fallbackContent.destinations[0].image;
    image.alt = "Travel inspiration in " + safeText(destination.name);
    image.loading = "lazy";
    imageWrap.append(image);
    const tag = document.createElement("span");
    tag.className = "destination-tag";
    tag.textContent = safeText(destination.tag || destination.country || "Explore");
    imageWrap.append(tag);
    const body = document.createElement("div");
    body.className = "destination-card-body";
    const title = document.createElement("h3");
    title.textContent = safeText(destination.name);
    const description = document.createElement("p");
    description.textContent = safeText(destination.description);
    const link = document.createElement("a");
    link.className = "destination-link";
    link.href = destination.detailsUrl || "#contact";
    link.textContent = destination.detailsUrl ? "Explore itinerary ↗" : "Plan this trip ↗";
    link.addEventListener("click", () => {
      window.setTimeout(() => {
        const input = byId("chat-input");
        if (input) input.value = "I'd like to plan a trip to " + safeText(destination.name);
      }, 0);
    });
    body.append(title, description, link);
    card.append(imageWrap, body);
    grid.append(card);
  });
}

function applyContent() {
  byId("hero-title").innerHTML = safeText(content.heroTitle || fallbackContent.heroTitle)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/\.(\s|$)/, ".<br><em>").replace(/\.$/, "</em>");
  byId("hero-subtitle").textContent = safeText(content.heroSubtitle || fallbackContent.heroSubtitle);
  byId("hero-image").src = content.heroImage || fallbackContent.heroImage;
  byId("approach-image").src = content.approachImage || fallbackContent.approachImage;
  byId("founder-name").textContent = safeText(content.founderName || fallbackContent.founderName) + ".";
  byId("founder-bio").textContent = safeText(content.founderBio || fallbackContent.founderBio);
  byId("year").textContent = new Date().getFullYear();
  renderDestinations();
  setContactLinks();
}

async function loadContent() {
  try {
    const response = await fetch("content.json", { cache: "no-store" });
    if (response.ok) content = { ...fallbackContent, ...(await response.json()) };
  } catch (error) {
    console.info("Using built-in Travlzi content until content.json is available.");
  }
  applyContent();
}

const menuToggle = byId("menu-toggle");
const navLinks = byId("nav-links");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const launcher = byId("chat-launcher");
const panel = byId("chat-panel");
function toggleChat(force) {
  const shouldOpen = typeof force === "boolean" ? force : panel.hidden;
  panel.hidden = !shouldOpen;
  launcher.setAttribute("aria-expanded", String(shouldOpen));
  if (shouldOpen) byId("chat-input").focus();
}
launcher.addEventListener("click", () => toggleChat());
byId("chat-close").addEventListener("click", () => toggleChat(false));

function addMessage(text, who) {
  const message = document.createElement("div");
  message.className = who === "user" ? "user-message" : "bot-message";
  // Make WhatsApp URLs in bot replies clickable without interpreting arbitrary HTML.
    const whatsappUrlPattern = /https:\/\/wa\.me\/[^\s]+/g;
  let lastIndex = 0;
  for (const match of text.matchAll(whatsappUrlPattern)) {
    const url = match[0];
    message.append(document.createTextNode(text.slice(lastIndex, match.index)));
    const link = document.createElement("a");
    link.href = url;
    link.textContent = "Open WhatsApp chat ↗";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    message.append(link);
    lastIndex = match.index + url.length;
  }
  message.append(document.createTextNode(text.slice(lastIndex)));
  byId("chat-messages").append(message);
  byId("chat-messages").scrollTop = byId("chat-messages").scrollHeight;
}

function replyTo(message) {
  const text = message.toLowerCase();
  if (/destination|where|ideas|suggest|place/.test(text)) {
    const names = (content.destinations || []).map(d => d.name).filter(Boolean);
    return "Here are a few places to start dreaming about: " + names.join(", ") + ". Tell us your dates, budget, and travel style and we can help shape a plan around you.";
  }
  if (/how|work|experience|personal|plan/.test(text)) {
    return "We start with what matters to you: your dates, budget, interests, and pace. Travlzi focuses on personal itineraries, practical destination insights, and better-value options. Tap “Let's talk on WhatsApp” to reach the team.";
  }
  if (/price|cost|budget|deal|cheap/.test(text)) {
    const number = safeText(content.whatsappNumber).replace(/\D/g, "");
    const link = number ? " https://wa.me/" + number + "?text=" + encodeURIComponent("Hi Travlzi! I'd love help planning a trip.") : "";
    return "A good-value trip depends on your dates, starting city, and travel style. Share your rough budget and destination with the Travlzi team on WhatsApp so your options can be tailored to you." + link;
  }
  if (/whatsapp|human|person|contact|team|book|booking/.test(text)) {
    const number = safeText(content.whatsappNumber).replace(/\D/g, "");
    if (number) return "Absolutely! Message the Travlzi team on WhatsApp: https://wa.me/" + number + "?text=" + encodeURIComponent("Hi Travlzi! I'd love help planning a trip.");
    return "Happy to connect you with the Travlzi team! The WhatsApp number still needs to be added to content.json. Once it is, the contact button will open a ready-to-send message.";
  }
  return "That sounds exciting! I’m a simple starter helper, so I can share basic planning guidance but can’t check live prices or make bookings. Try asking for destination ideas, budget tips, or how planning works — or message the Travlzi team for personal help.";
}

function sendChatMessage(text) {
  const cleaned = text.trim();
  if (!cleaned) return;
  addMessage(cleaned, "user");
  addMessage(replyTo(cleaned), "bot");
}
byId("chat-form").addEventListener("submit", event => {
  event.preventDefault();
  const input = byId("chat-input");
  sendChatMessage(input.value);
  input.value = "";
});
byId("chat-quick-replies").addEventListener("click", event => {
  const button = event.target.closest("button[data-message]");
  if (button) sendChatMessage(button.dataset.message);
});


const travelEssentials = [
  { category:"summer", icon:"☀", title:"UV-protection sunglasses", reason:"A practical pick for bright days, sightseeing and beach time.", search:"UV protection sunglasses" },
  { category:"summer", icon:"☀", title:"Wide-brim sun hat", reason:"Adds shade during outdoor walks and sunny excursions.", search:"wide brim sun hat travel" },
  { category:"summer", icon:"☀", title:"Reusable water bottle", reason:"Keep water handy while exploring; choose a size that fits your day bag.", search:"reusable leakproof water bottle" },
  { category:"winter", icon:"❄", title:"Thermal base layers", reason:"A useful first layer for cold-weather destinations.", search:"thermal base layer clothing" },
  { category:"winter", icon:"❄", title:"Warm gloves and beanie", reason:"Compact accessories that help on chilly walks and windy viewpoints.", search:"winter gloves beanie set" },
  { category:"winter", icon:"❄", title:"Insulated jacket", reason:"Look for weather-appropriate insulation and a comfortable fit.", search:"packable insulated winter jacket" },
  { category:"rainy", icon:"☂", title:"Packable rain jacket", reason:"A lightweight outer layer for changeable weather.", search:"packable waterproof rain jacket" },
  { category:"rainy", icon:"☂", title:"Compact travel umbrella", reason:"An easy-to-carry option for city breaks and sudden showers.", search:"compact windproof travel umbrella" },
  { category:"rainy", icon:"☂", title:"Water-resistant day bag", reason:"Helps keep everyday travel items protected from light rain.", search:"water resistant daypack backpack" },
  { category:"adventure", icon:"↟", title:"Comfortable walking shoes", reason:"Prioritise fit, grip and the terrain you actually plan to cover.", search:"comfortable trekking walking shoes" },
  { category:"adventure", icon:"↟", title:"Daypack with padded straps", reason:"A handy carry-all for snacks, a water bottle and an extra layer.", search:"lightweight hiking daypack padded straps" },
  { category:"adventure", icon:"↟", title:"Packing organisers", reason:"Separate clothing and small essentials to make unpacking easier.", search:"travel packing cubes organiser set" }
];

function renderTravelEssentials(filter = "all") {
  const grid = byId("essentials-grid");
  if (!grid) return;
  grid.replaceChildren();
  travelEssentials.filter(item => filter === "all" || item.category === filter).forEach(item => {
    const card = document.createElement("article");
    card.className = "essential-card";
    const icon = document.createElement("span");
    icon.className = "essential-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = item.icon;
    const tag = document.createElement("span");
    tag.className = "essential-category";
    tag.textContent = item.category;
    const title = document.createElement("h3");
    title.textContent = item.title;
    const reason = document.createElement("p");
    reason.textContent = item.reason;
    const links = document.createElement("div");
    links.className = "essential-links";
    [["Amazon India","https://www.amazon.in/s?k="],["Flipkart","https://www.flipkart.com/search?q="]].forEach(([label, base]) => {
      const link = document.createElement("a");
      link.href = base + encodeURIComponent(item.search);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = label + " ↗";
      links.append(link);
    });
    card.append(icon, tag, title, reason, links);
    grid.append(card);
  });
}

const essentialsFilters = byId("essentials-filters");
if (essentialsFilters) {
  // Bind each filter directly so taps work reliably on desktop and mobile.
  const filterButtons = essentialsFilters.querySelectorAll("button[data-filter]");
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selectedFilter = button.getAttribute("data-filter") || "all";
      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", active ? "true" : "false");
      });
      renderTravelEssentials(selectedFilter);
    });
  });
  renderTravelEssentials("all");
}

loadContent();