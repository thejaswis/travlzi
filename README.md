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
- Keep activities assigned to their day; individual stops cannot be dragged to another day.
- Swap entire day plans with the previous or next day using the day arrows.
- Add an activity directly to a specific day, edit its time and estimated duration, or remove it from that day.
- See the automatically updated estimated time total for each day. Older saved activities receive sensible category-based duration estimates.
- Add activities, costs, notes, times and optional map locations.
- Keep undecided activities in an ideas tray.
- View itinerary pins and a connecting line on an OpenStreetMap-powered map.
- Estimate group budget and daily allowance from scheduled activities only (saved ideas are excluded).
- Record actual group expenses by date and category, separately from itinerary estimates; view total actual spend, per-person average and remaining group budget.
- Save the current trip in browser local storage.
- Browse a destination activity library, filter/search activities, and add a removed activity back to any day.
- Show clearly labelled, destination- and proximity-matched sponsored local partners inline after the closest relevant stop in each day itinerary. Each card displays the business name and a “Sponsored by example.com” attribution by default (customisable per partner). Partner placements are loaded from `partners.json`; businesses can enquire through the partner link.
- Edit activity cost estimates; the budget snapshot recalculates planned spend, remaining per-person budget, group budget and category totals. Category totals include scheduled activities only, not saved ideas.
- Keep a separate actual-expense ledger. Each entry is a total group payment; the planner calculates actual spend per person by dividing by traveller count.
- Display amounts in INR, USD, EUR, GBP, AED, SGD, AUD, CAD, JPY, THB, LKR or MYR using cached reference exchange rates.
- Switch planner interface labels between English, Hindi, Kannada, Tamil, Telugu, Malayalam, Marathi, Bengali, Spanish, French, German, Italian and Japanese.
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

The planner sends a POST JSON body containing `destination`, `origin`, `startDate`, `endDate`, `travellers`, `style` and `budgetPerPerson`. The endpoint should return JSON with a `days` array. Each day should have a `date` and an `activities` array. Each activity can contain `id`, `name`, `note`, `category`, `time`, `durationMinutes`, `cost`, `lat` and `lon`. When `durationMinutes` is omitted, the planner supplies a category-based estimate.

Without this endpoint, the planner creates a curated local starter itinerary. It does not claim to be an LLM-powered service.

## External services

- Leaflet is loaded from unpkg for map display.
- Map tiles and geocoding use OpenStreetMap services.
- Map/geocoding availability depends on third-party service availability and usage policies. No API key is embedded in the site.
- The planner stores trips locally in the current browser. There is no account, cloud sync or multi-user collaboration yet. Activity costs and the trip budget are stored in INR; the selected currency is a display/input conversion. The exchange-rate service is refreshed no more than once per 20 hours per browser profile and cached locally. Rates are indicative reference rates, not payment quotes. The rate provider requires visible attribution, included in the budget panel. The language selector offers English, eight Indian languages and five international languages (Spanish, French, German, Italian and Japanese). Destination names and curated activity descriptions remain in their authored language. Actual expenses are saved in INR and displayed in the selected currency, separately from planned estimates.

## Edit homepage content

Edit `content.json` to change the hero, founder details, destination cards and contact details. Use relative image paths for assets stored in `images/`.

## Security and privacy

Do not add private API keys to client-side JavaScript, HTML or JSON files. A real AI integration should run behind a server-side endpoint with rate limits, input validation and abuse protection.


## Sponsored local partners

The planner reads an optional static `partners.json` directory. Add one object per approved partner:

```json
[
  {
    "id": "goa-example-stay",
    "name": "Business display name",
    "destinations": ["Goa"],
    "category": "Stay",
    "area": "Candolim",
    "lat": 15.52,
    "lon": 73.76,
    "description": "Short factual description of the business.",
    "offer": "Optional traveller offer",
    "website": "https://example.com",
    "whatsapp": "919999999999",
    "active": true
  }
]
```

A partner is shown only for an exact destination match and when it is within 25 km of a planned stop on that day. Up to two closest partners appear inline immediately after their nearest planned stop; they are display-only and do not change itinerary activities, time totals, costs or map pins. Set `active` to `false` to pause a listing. Set optional `sponsorDomain` (for example, `example.com`) to customise the “Sponsored by …” attribution. Keep paid placements clearly labelled as **Sponsored** and verify business details, offers and links before publishing.

This is a static, manually managed directory: partner enquiries go to Travlzi over WhatsApp. It does not yet provide vendor accounts, payment collection, campaign analytics or automated billing. Do not add unverified businesses or imply that a listing is endorsed by Travlzi.
