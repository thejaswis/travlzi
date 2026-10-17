# Travlzi

A responsive, modern travel-planning landing page with an ocean-blue and teal palette, featured destinations, founder introduction, and a lightweight travel FAQ helper.

## Deploy with GitHub Pages

1. Merge this feature branch into `main`.
2. Open repository **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select `main` and `/(root)`, then save.
5. When published, the site should be available at https://thejaswis.github.io/travlzi/.

## Edit the website content

Open `content.json` and edit the values:

- `heroTitle`, `heroSubtitle`: main headline and introduction.
- `founderName`, `founderBio`: founder section.
- `heroImage`, `approachImage`: large page photos.
- `destinations`: destination names, descriptions, tags, and image URLs.
- `whatsappNumber`: WhatsApp number in international format using digits only, including country code.
- `email`: contact email address.

You can edit `content.json` directly in GitHub: open the file, click the pencil icon, make changes, and commit them. To use your own photos, upload them into an `images/` folder and use a relative path such as `images/hero.jpg`.

## WhatsApp and chat helper

The WhatsApp contact button opens a pre-filled message. Add your real number to `content.json` to activate the direct link. Leave it blank until you are ready to publish your contact details.

The floating website chat is a basic rule-based FAQ helper, not an AI model. It cannot check live prices or make bookings. A real AI chatbot needs a server-side endpoint to keep API keys secret. Never put a private API key in `script.js` or other public website files.

## Notes

- Destination photos currently use remote Unsplash image URLs; replace them with your own approved images if preferred.
- The founder text is starter copy. Personalize it so it accurately reflects the founder's real story and destination experience.
- This is a static site and requires no build step or paid hosting.