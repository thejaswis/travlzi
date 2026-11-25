# Travlzi

A responsive travel inspiration website and browser-based trip planner.

## Deploy with GitHub Pages

Travlzi remains a static website. No build step or package installation is required.

1. Merge the feature branch into `main`.
2. Open repository **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select `main` and `/(root)`, then save.

The planner is available at `/planner.html`. Existing destination pages, travel essentials, privacy page, content JSON and homepage remain static assets.

## Trip planner features

- Build a day-by-day starter itinerary from a destination and date range.
- Drag activities between days and reorder them by dropping into a day.
- Add activities, costs, notes, times and optional map locations.
- Keep undecided activities in an ideas tray.
- View itinerary pins and a connecting line on an OpenStreetMap-powered map.
- Estimate group budget and daily allowance.
- Save the current trip in browser local storage.
- Browse a destination activity library, filter/search activities, and add a removed activity back to any day.
- Edit activity cost estimates; the budget snapshot recalculates planned spend, remaining per-person budget, group budget and category totals.
- Display amounts in INR, USD, EUR, GBP, AED, SGD, AUD, CAD, JPY, THB, LKR or MYR using cached reference exchange rates.
- Switch planner interface labels between English, Hindi, Kannada, Tamil, Telugu, Malayalam, Marathi and Bengali.
- Export a trip as JSON or print it.
- Mobile-friendly layout and accessible form controls.

The initial destination templates cover Goa, Kerala, Bali, Kyoto, Interlaken, Inverness, Pondicherry (Puducherry) and Agatti Island. Other destination names receive a clearly labelled generic starter plan, with the map centred on the destination when geocoding is available; they do not silently fall back to Goa.

## AI itinerary endpoint (optional integration)

The public GitHub Pages site must never contain an OpenAI API key or any other private credential.

To connect a real AI itinerary service, provide a same-origin or trusted HTTPS endpoint before `planner.js` loads:

```html
<script>
  window.TRAVLZI_CONFIG = {
    aiEndpoint: "https://YOUR-SERVER.example.com/api/itinerary"
  };
</script>
<script src="planner.js" defer></script>
```

The planner sends a POST JSON body containing `destination`, `origin`, `startDate`, `endDate`, `travellers`, `style` and `budgetPerPerson`. The endpoint should return JSON with a `days` array. Each day should have a `date` and an `activities` array. Each activity can contain `id`, `name`, `note`, `category`, `time`, `cost`, `lat` and `lon`.

Without this endpoint, the planner creates a curated local starter itinerary. It does not claim to be an LLM-powered service.

## External services

- Leaflet is loaded from unpkg for map display.
- Map tiles and geocoding use OpenStreetMap services.
- Map/geocoding availability depends on third-party service availability and usage policies. No API key is embedded in the site.
- The planner stores trips locally in the current browser. There is no account, cloud sync or multi-user collaboration yet. Activity costs and the trip budget are stored in INR; the selected currency is a display/input conversion. The exchange-rate service is refreshed no more than once per 20 hours per browser profile and cached locally. Rates are indicative reference rates, not payment quotes. The rate provider requires visible attribution, included in the budget panel. The language selector translates planner interface labels; destination names and curated activity descriptions remain in their authored language.

## Edit homepage content

Edit `content.json` to change the hero, founder details, destination cards and contact details. Use relative image paths for assets stored in `images/`.

## Security and privacy

Do not add private API keys to client-side JavaScript, HTML or JSON files. A real AI integration should run behind a server-side endpoint with rate limits, input validation and abuse protection.
