# BuggyRents — session handover, 12 Aug 2026

---

## 0. Session addendum, later on 12 Aug 2026 — desert safari cluster

**Committed, pushed and verified live as `d692229` on 12 Aug 2026.** No rebase conflict:
the client had not saved anything through the CMS in the meantime. Confirmed on the live
domain: `/desert-safari-dubai/` serves the pillar, `/desert-safari-dubai-deals/` 301s to
it with the canonical pointing at the new URL, and the safari dropdown, footer links and
safari FAQ are all in place.

The keyword numbers were put in front of the client as agreed in §5 item 3, and the
call was to build the safari long tail without contesting the head terms. Result:
**65 pages to 74**, and a fourteenth audit.

### What was found while checking the numbers
Two pages that should have existed did not, and no audit could see either:

1. `/desert-safari-dubai/` returned the 404 while `/desert-safari-dubai/price/` was
   live and indexed beneath it. The pillar had been built at
   `/desert-safari-dubai-deals/`, a slug targeting a 390-search KD-28 variant instead
   of the 49,500 head term, and the child's breadcrumb schema jumped sideways to the
   `-deals` URL to cover for the missing parent.
2. `/audience/` had eight child pages and no hub. Found by the new audit on its first
   run.

Neither was visible to the link audit, which only checks links that are written, or to
the orphan audit, which only looks at pages that exist. A page that *should* exist and
does not is invisible to both. That is now the **root-resolves audit** and it fails the
build.

### What was built
- Pillar moved to `/desert-safari-dubai/`, 301 in both slashed and unslashed forms. The
  old URL carried 248 internal links.
- Six tour pages on dbr-cluster via a new `SafariCluster.astro`: evening, morning,
  overnight, quad/ATV, private and VIP, dune buggy safari.
- `red-dune-desert-safari` on dbr-location, targeting red dune (1,000, KD 22), safari
  location (720, KD 20) and location map (110).
- `desert-safari-dubai/faq` on dbr-about, matching the buggy and quad FAQ pattern.
- `/audience/` hub, mirroring the locations hub.
- Nav dropdown, footer links, HTML sitemap and the pillar's own hub section.

**One page per product, not per keyword.** Sunrise merged into morning, night into
evening, ATV into quad, deluxe into private, because no separate package exists for any
of them and a page per keyword would have been a doorway set. CLAUDE.md §6b has the table.

### Verification
- All **15 audits pass**, 74 pages. (14 at the time of this session; the link audit was
  added 4 Sep 2026.)
- **Byte-compared all 65 pre-existing pages.** Every diff is the nav dropdown, the footer
  link and the `-deals` URL swap. The only two others are both benign and were checked:
  the ten location pages have a CSS chunk renamed from `_slug_.DlOLRAfy.css` to
  `red-dune-desert-safari.DlOLRAfy.css`, **same hash, byte-identical content**, because
  Astro names a shared chunk after its first importer; and the HTML sitemap count went
  62 to 72.
- `/desert-safari-dubai-deals/` emits a clean 301 with **no stray meta-refresh page**.
- Sitemap: 73 URLs, all ten safari pages and the audience hub present.

### Still to do on this
1. **Search Console.** Run URL Inspection on `/desert-safari-dubai/` and request
   indexing. The old URL carried 248 internal links, so it is worth telling Google
   rather than waiting. Then watch for `-deals` dropping out and the new URL coming in.
   Expect two to six weeks.
2. **The eight scheduled safari articles now have somewhere to land.** That was the whole
   argument for building this. Get the client's prompt before writing them.
4. Safari photography is now the binding constraint: seven photos across eight pages, with
   each page taking three in a distinct set. The variety audit will fail the build before
   it lets two pages converge, so the next safari page genuinely needs new images first.

---

Read this **after** `CLAUDE.md`. That file is the standing brief and is loaded
automatically in this folder; it holds the business facts, the pricing, the template
rules and the hard prohibitions. This file covers what changed in the session of
10 to 12 Aug 2026 and what happens next.

If the two ever disagree, `CLAUDE.md` wins and should be corrected.

---

## 1. Where things stand

**buggyrents.com is live, indexed and fully editable by the client.**

| | |
|---|---|
| Pages | 65 built, 64 in the sitemap (404 excluded) |
| Broken links / orphans / missing h1 / thin pages | 0 |
| Build audits | 13, all run on every build, all fail the build |
| Deploy | Cloudflare Worker `buggyrents`, builds from `digitumarketing/buggyrents` on push to `main` |
| CMS | Keystatic at `/keystatic`, GitHub storage mode, working end to end |
| Analytics | GA4 `G-HKVDWC923V`, Search Console verified, sitemap submitted |
| Email | Resend, sending as `bookings@buggyrents.com`, verified working |
| Last commit | `1a49d25` Phases 4 and 5 |

**Everything hand-written on all 65 pages is now editable in the CMS.** That was the
client's explicit request and it is finished. What is *not* in the CMS is deliberate:
layout, section order, the 11 template systems, navigation, and any copy derived from
vehicle data. Section 4 explains why.

---

## 2. What was done in this session

### Deployment and infrastructure
- Fixed the failing deploy: `public/.assetsignore` keeps `_worker.js` out of the
  assets bucket.
- Bound the `SESSION` KV namespace, without which Keystatic login fails at runtime.
- Added `run_worker_first = ["/keystatic", "/keystatic/*", "/api/*"]`. With
  `not_found_handling = "404-page"`, Cloudflare's asset router answers anything with
  no file behind it and never reaches the Worker, which broke the CMS and the contact
  form. **Do not remove that line.**
- Keystatic wired to GitHub App `buggyrents-cms`; three runtime secrets plus the
  build variable `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`. The slug is a *build* variable,
  not a secret. This is the step that is always missed.
- GA4 added, gated behind `import.meta.env.PROD` so dev and audit runs never pollute
  the client's reports.
- Resend verified; `CONTACT_FROM` now `bookings@buggyrents.com`. That mailbox is
  send-only, so the API route sets `reply_to` to the guest's address.
- AI crawlers allowed: content signals in `public/robots.txt` **plus** the Cloudflare
  managed robots.txt block switched off in the dashboard. Both were needed.

### SEO
- **Legacy 301s fixed.** Astro strips the trailing slash when generating
  `_redirects`, but WordPress published every old URL *with* one, so the indexed form
  was 404ing. The slashed forms are now written by hand in `public/_redirects`.
- **Titles and meta descriptions.** 40 titles were over 60 characters and 29
  descriptions over 160, so both were being truncated in search results. Now **0 and
  0**. `pageTitle()` in `src/data/seo.ts` appends ` | Buggy Rents` only when it fits
  and drops it when it does not. Never hardcode the suffix again.
- Google Business Profile linked from the address in the footer and twice on the
  contact page; `nofollow` removed from the reviews widget link.
- Footer agency credit: "Designed & Marketing By Digitum" → digitum.marketing.

### Bugs found and fixed that nobody had reported
These all shared one cause: a comma removed during an earlier sitewide edit.
- `clamp(1rem.9rem + .45vw, 1.22rem)` in two places. Invalid CSS, so the whole
  declaration was dropped and the homepage hero tagline and the long-form reader
  intro had been rendering at the wrong size since the first build.
- `.pg th.pg td { ... }` in the homepage price table. Matches nothing, so padding and
  alignment never applied and the table fell back to browser defaults.
- `" ,  "` left behind wherever an em dash had joined two phrases. Visible on nine
  pages including the homepage h1 area and every audience meta description.
- All three now fail the build via `audit-contrast.mjs`.

### Client-reported fixes
- Reviews strip ran full width on FAQ and About pages: `ReviewsCarousel` was using
  `pl__shell` from `pillar.css`, which those pages do not load. The component now
  owns its shell CSS.
- Duration cards rendered half-built when the client added a price. Badge and blurb
  were looked up by duration *label*; the fallback table is now keyed by **minutes**,
  and both fields are in the CMS. All 68 existing rows backfilled.
- `Buggyrents@gmail.com` overflowed its card. `overflow-wrap: anywhere`.
- Every buggy page showed the same three gallery photos and the same six cross-sell
  cards. Both now rotate by the vehicle's position in its category, and a new audit
  fails the build if two tour pages in a category ever share an identical image set.
- Homepage reviews section was a stale placeholder saying "awaiting real review
  data" while 17 real reviews were live on every other page. Now uses the carousel.
- TripAdvisor award logo was invisible: every supplied asset is a **white** logo and
  it was on a white card. Now on a navy tile at 768px.
- Two extra "tour styles" cards so the grid is not half empty.
- **Minimum age 18 → 14** on all eleven buggies, the Yamaha Raptor 700 and the
  KTM 450. Quad tiers at 6, 12, 14 and 16 are unchanged. About a dozen hand-written
  sentences hardcoded 18 and were rewritten; the KTM answer that said "Eighteen, with
  no exceptions" is now built around **rider screening** instead of age.

### CMS migration, all five phases
| Phase | Covers | Verified |
|---|---|---|
| 1 | 6 blog articles → Markdoc with a rich text editor | 59 identical, 6 changed (the articles) |
| 2 | Homepage, site settings, reviews, combos and policies | 62 identical, 3 changed (a client CMS edit) |
| 3 | 10 location + 8 audience pages | 65 identical |
| 4 | 3 category pillar pages | 65 identical |
| 5 | 7 support pages, About, 2 FAQ pages | 65 identical |

**Every phase was verified by byte-comparing all 65 built pages before and after.**
Do not skip this. It is the only thing that catches copy changing silently, and it
caught a real bug in Phase 2: converting `addOns.price` from `null` to `0` put
"Group and corporate bookings" into the safari price table labelled **Free**.

---

## 3. How to work on this

```bash
cd ~/Documents/Claude/BuggyRents/site

# ALWAYS commit first, then pull. Keystatic commits straight to main every time the
# client saves, so the remote moves without anyone touching the laptop.
git add -A && git commit -m "..." && git pull --rebase && git push
```

- **Build in `/tmp`, not the synced folder.** `npm install` times out over the mount.
  Copy the tree, `npm install`, `npm run build`.
- **`npm run build` runs `astro build && npm run audit`.** Never remove the audit half.
- **Dumping a data module to JSON needs `vite-node`, not `tsx`.** Every data file now
  uses `import.meta.glob`, which only exists inside Vite:
  ```bash
  npx vite-node@2 -c <config with the @ alias> script.ts
  ```
- **Byte-compare after any content refactor:**
  ```bash
  for f in $(cd dist && find . -name "*.html"); do cmp -s dist/$f /tmp/baseline/$f || echo "changed: $f"; done
  ```

### The 13 audits
contrast (token check) · contrast (full DOM cascade walk) · colour syntax, including
malformed `clamp()` and stray `" ,  "` · image reuse and alt text · image resolution ·
cross-page image variety · insurance claims · em dashes · missing referenced assets ·
placeholders like `[object Object]` · price cross-check · title and description length ·
unfilled CMS tokens.

---

## 4. The one architectural idea to understand

`src/data/tokens.ts`.

Moving page copy into the CMS collides with the rule that a price is written once and
derived everywhere. "Self-drive tours from AED 300" is prose the client should be able
to rewrite — but the 300 is not. Frozen into a CMS field it goes stale the first time a
price changes, and the page then contradicts the price table directly below it.

So the client writes `from AED {buggyFrom}` and the build fills it in.

Available tokens: `buggyFrom` `quadFrom` `dirtbikeFrom` `safariFrom` · `buggyCount`
`quadCount` `dirtbikeCount` · `rating` `reviewCount` · `phone` `email` `address`
`guests` `fleet` `guides` `founded` · `cancellation` `weather` `deposit` `payment`
`paymentFull` `pickup` `pickupOuter`.

A misspelled token throws in `fill()`, **and** a separate token audit scans the built
HTML — because a field added to a schema and forgotten in its adapter would print raw
`{buggyFrom}` onto a live booking page, which is worse than any build error.

Long-form price ladders like "AED 75 / 140 / 250 / 350 / 450" are deliberately **not**
tokenised. They are real lists, not derived headlines, and tokenising each figure would
make them unreadable in the editor. The price audit covers them instead.

---

## 5. Pending — developer side

### Immediate
1. **Client guide.** Now the highest-value remaining task. A plain-language document
   covering: how to log in, what each CMS section controls, what tokens are and how to
   use them, and — most importantly — **what a failed build means**. A CMS edit that
   breaks a rule fails the deploy silently: the live site keeps serving the previous
   version and the client gets no notification. They need to know where to look and
   what the eleven failure messages mean.
2. **24 quick-win articles.** The client will supply a prompt to use for these. Six of
   the thirty KD ≤ 25 keywords are written. Still open, from the named list:
   dubai desert safari outfit (KD 7) · vip hummer desert safari dubai (KD 7) ·
   hummer desert safari dubai (KD 9) · red dune desert safari dubai (KD 22, 1,000) ·
   dubai desert safari location (KD 20, 720) · overnight desert safari dubai (KD 19,
   590) · quad bike desert safari dubai (KD 21, 590) · sunrise desert safari dubai
   (KD 22, 480).
   *Ask for the prompt before writing. Consider saving it as a skill so it does not
   have to be pasted every time.*

### The big open decision
3. **Desert safari.** 97,220 monthly search volume, which is **83% of the entire
   keyword pool**, and the site has two real safari pages. Dune buggy has 15 and quad
   has 10 for 13,280 and 8,620 respectively. The client's standing direction is that
   safari is a Phase 2 expansion and buggy/quad lead. **Do not re-argue that decision
   unprompted** — but the next six months of traffic turn on it, so put the number in
   front of them once before serious content work starts.

### Lower priority
4. Bing Webmaster Tools. Five minutes, and Bing's UAE share is not negligible.
5. Check Search Console → **Indexing → Pages** for how many of the 64 URLs are
   actually indexed. The Sitemaps report showing "64 discovered" is not the same
   thing. Expect partial coverage for 2 to 6 weeks on a new domain; look for errors
   rather than for "Discovered - currently not indexed", which is normal.
6. Core Web Vitals have never been measured. Public pages ship about 2 KB of JS, so
   this is likely fine, but it is an assumption.

---

## 6. Pending — client side, these are blockers

1. **Photography. The single highest-value asset request.**
   - Eleven buggy tour pages open with the **same hero photo** because the library
     holds exactly one usable buggy hero. The code is ready: `heroImage` is an
     optional per-vehicle CMS field. It needs landscape shots at 2000px+, one per
     machine.
   - Twelve shipped images are between 500px and 900px wide and are already at their
     native maximum, confirmed by perceptual-hash matching against all 177 originals.
     The list is in `CLAUDE.md` §5b. Quad and KTM are the most urgent.
   - Desert safari has 13 packages and 8 photos.
2. **Trade licence number.** Still not supplied. Real EEAT signal for a local
   business. Until then the field stays empty — never a placeholder that looks like a
   number.
3. **Google reviews.** 4.9 from **41 reviews**. In this category competitors run
   500+. A system for asking after every ride — a WhatsApp message with the profile
   link — is the biggest single lever on local pack ranking, bigger than anything left
   to do on the site.
4. **Citations and OTA listings.** TripAdvisor, GetYourGuide, Viator, Klook, local
   Dubai directories. Ranking factor and a booking channel in its own right.

---

## 7. Known issues and accepted debt

- **5 AED figures in copy match no current price** and are reported as warnings on
  every build: AED 90 on 6 pages (e.g. `/about-us/`), AED 356 on one blog, and
  AED 198 / 594 / 51 on `/desert-safari-dubai/price/`. Most are per-head divisions of
  a real price, which is legitimate. Worth a pass to confirm each one.
- **680 colour pairs are below WCAG AA but readable.** Mostly white on brand orange
  at 2.94:1 for buttons. This is a client design call that was made deliberately; the
  audit warns rather than fails. Do not "fix" it without asking.
- **Heading anchors on blog articles changed** during the Markdoc migration, from
  hand-written ids like `#cost` to derived ones like `#which-is-actually-cheaper`.
  Only the in-page contents linked to them, so nothing broke, but any external deep
  link would have.
- Navigation stays in code deliberately. A header or footer href renders on all 75 pages,
  so a mistyped one is 75 broken links rather than one. The labels almost never change,
  so exposing them to editing buys nothing.

  This entry originally said a mistyped href failed the link audit. No link audit existed
  when it was written; `scripts/audit-links.mjs` added one on 4 Sep 2026, and only from
  that date does the build actually catch it.

---

## 8. Suggested order for the next session

1. Ask whether they want the **client guide** first or the **articles** first.
2. If articles: get their prompt, and offer to save it as a reusable skill.
3. Put the desert safari number in front of them once, then follow their call.
4. Chase the photography list — it has been open the longest and blocks the most.

Before starting anything, run a build and confirm all 13 audits still pass. The client
edits content through the CMS between sessions, so the tree will have moved.
