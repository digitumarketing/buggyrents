# Buggy Rents — website

Astro 5 · Keystatic CMS · Cloudflare Pages

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
```

Keystatic admin: http://localhost:4321/keystatic

## Build

```bash
npm run build      # outputs to dist/
```

## Deploy — Cloudflare Pages

1. Push this folder to GitHub
2. Cloudflare dashboard → Workers & Pages → Create → Pages → connect the repo
3. Build command `npm run build`, output directory `dist`, Node version `22`
4. Add a `SESSION` KV binding (required by the Cloudflare adapter)
5. For Keystatic GitHub mode in production, switch `storage.kind` to `'github'` in
   `keystatic.config.ts` and add the GitHub App env vars

## Structure

```
src/
  data/site.ts        business details, WhatsApp helpers  ← single source of truth
  data/vehicles.ts    all 45 price points across 12 vehicles
  data/nav.ts         header and footer navigation
  styles/tokens.css   brand colours (#FF6600, #323D4E) + Option A fonts
  styles/global.css   base styles, buttons, cards, layout helpers
  components/         Header, Footer, FloatingActions, VehicleCard, PriceTable
  layouts/Base.astro  shell + SEO head + JSON-LD
  pages/              routes
public/assets/
  brand/              logo, white logo variant, icon
  images/             curated photography, year/month paths preserved
```

## Notes

- Prices live in `src/data/vehicles.ts`. Editing one number updates every page.
- `waLink()` and `bookMessage()` build WhatsApp URLs pre-filled with the vehicle,
  duration and price the visitor was looking at.
- Dirt bike pricing is provisional — set from market research, awaiting client sign-off.
- No social links anywhere: the client has no accounts yet.
