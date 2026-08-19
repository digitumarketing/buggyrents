# BuggyRents — project memory

Read this first in any BuggyRents session. It is the standing brief.

## Where the documentation lives, and why it is arranged this way

The git repository root is `site/`, not the folder above it. Until 19 Aug 2026 these
documents sat in the parent folder, which meant they were on one laptop and nowhere
else: everything explaining *why* the code is the way it is would have been lost with
that machine, leaving a repo full of decisions nobody could reconstruct.

| File | Purpose |
|---|---|
| `site/CLAUDE.md` | This file. The standing brief. |
| `site/docs/HANDOVER.md` | Session history and the forward plan. Read after this. |
| `site/docs/ARTICLE-PROMPT.md` | Master copy of the blog article prompt. |

**`../CLAUDE.md` is a symlink to this file. Do not delete it and do not replace it with
a copy.** Claude Code discovers `CLAUDE.md` in the working directory and its parents,
and the working directory is the folder *above* the repo. Without that symlink this
brief stops loading automatically and every session starts blind. With a copy instead of
a symlink, the two drift apart within a week and nobody knows which one is true.

---

## 1. The business

| Field | Value |
|---|---|
| Brand | Buggy Rents (wordmark) / BuggyRents (domain) |
| Domain | buggyrents.com |
| Phone + WhatsApp | +971 56 209 5713 → `wa.me/971562095713` |
| Email | Buggyrents@gmail.com |
| Address | Dubai-Hatta Rd, Al Awir Second, Dubai, UAE |
| Google Place ID | ChIJo88Daad39T4RnM7myjfeJdQ |
| Social | **5 live accounts** — facebook/buggyrents · instagram/buggyrents · tiktok/@buggyrents · youtube channel UCxg840PdCcCJ0GCnG018EBg · pinterest/buggyrents. Recorded as "none" until 10 Aug 2026, which was wrong. In footer and in schema `sameAs`. |
| Live chat | Deferred; leave room in the floating action bar |
| Award | TripAdvisor Travellers' Choice (real, use it) |
| Founded | 2020 |
| Guests served | 17K+ |
| Google rating | 4.9 from 41 reviews |
| GitHub | github.com/digitumarketing |
| Cloudflare | buggyrents@gmail.com |
| Competitor | desertbuggyrental.com |

**The old WordPress site is still live on buggyrents.com** and ranks on these URLs.
`astro.config.mjs` carries 301s for all of them; verified against page-sitemap.xml
10 Aug 2026. `/dune-buggy-dubai/` and `/quad-bike-dubai/` match the new URLs exactly
and need none. Do not remove the redirects: without them every ranking page 404s
the moment the domain switches.

| Old URL | Goes to |
|---|---|
| /dune-buggy-rental-dubai/ , /dune-buggy-rental/ | /dune-buggy-dubai/ |
| /atv-rental-dubai/ , /quad-bike-rental-dubai/ | /quad-bike-dubai/ |
| /dirt-bike-rental-dubai/ , /dirt-bike-dubai/ | /ktm-dirt-bike-dubai/ |
| /contact-us/ , /thank-you/ | /contact/ |

**Each redirect is written twice, and both copies are needed.** Astro strips the trailing
slash when it turns `redirects` in `astro.config.mjs` into `dist/_redirects`, but WordPress
published every one of these URLs *with* a slash, so that is the form Google indexed and the
form a visitor clicks. Cloudflare matches `_redirects` on the exact path. The slashed forms
are therefore written by hand in `public/_redirects`, which the adapter merges in above the
generated rules. Do not "tidy up" the duplication, and do not add slashed keys to
`astro.config.mjs` instead — Astro answers those with a duplicate rule and a stray
meta-refresh HTML page rather than a 301.

**`run_worker_first` in `wrangler.toml` is load-bearing.** With `not_found_handling = "404-page"`
Cloudflare's asset router answers anything with no file behind it and never reaches the Worker.
That is right for typos and wrong for `/keystatic`, `/keystatic/*` and `/api/*`, which exist only
inside the Worker. Remove that line and the CMS and the contact form both start returning the
404 page. Bare `/keystatic` is listed separately because `/keystatic/*` does not match it.

**Never** reintroduce: `desertbuggyrental`, `+971 52 440 9525`, their tawk.to ID, their social handles, `#E8762D`, `rgba(20,184,200,…)`.

**No trade licence number.** Client confirmed 8 Aug 2026 the number is not available yet — "wo abi
ne ha, to us ko abi kahen na likho". Do not write a licence number, and do not write a placeholder
that looks like one, on Terms, About, footer or in schema. Leave the claim out entirely until the
client supplies a real number.

**Contact form submits to both** — POST to the Cloudflare Worker which emails Buggyrents@gmail.com,
and open WhatsApp with the same body. Decided 8 Aug 2026.

**Never write "DTCM"** anywhere in page content, copy, meta or schema — client instruction, 7 Aug 2026.
The file `templates/BuggyRents-about-dtcm-trust-page.html` keeps its name on disk but its
DTCM trust claims must not be reproduced. No trade licence number until the client supplies one.

---

## 2. THE RULE — follow the attached templates exactly

The HTML files in this folder are the **layout specification**. Reproduce their section
structure, order and component patterns. **Do not invent new layouts.**
If a page type has no template here, **ask the client for one before building.**

Root folder = core templates. `templates/` subfolder = everything else.

| Page type | Template file | System | Sections |
|---|---|---|---|
| Homepage | `BuggyRents-home.html` | `dbr-*` | 13 |
| Category pillar (Dune Buggy, Quad, KTM, Safari) | `BuggyRents-dune-buggy.html` | `dbr-pillar__*` | 8 |
| Tour / product | `BuggyRents-polaris-rzr-2-seater.html` | `dbr-cluster__*` | 10 |
| Price guide | `BuggyRents-dune-buggy-price-guide.html` | `dbr-cluster__*` | 10 |
| FAQ | `BuggyRents-dune-buggy-faqs.html` | `dbr-about__*` | 11 |
| Location | `BuggyRents-Sharjah-Full-Rebrand.html` | `dbr-location__*` | 9 |
| Audience pillar | `templates/BuggyRents-dubai-desert-adventures-audience.html` | `dbr-pillar__*` | 8 |
| Audience sub-page | `templates/BuggyRents-corporate-groups-page.html` | `dbr-support__*` | 9 |
| About us | `templates/BuggyRents-about-dtcm-trust-page.html` | `dbr-about__*` | 11 |
| Privacy policy | `templates/BuggyRents-privacy-policy.html` | `dbr-support__*` | 9 |
| Refund policy | `templates/BuggyRents-refund-policy.html` | `dbr-support__*` | 9 |
| Contact | `templates/BuggyRents-contact-page.html` | `dbr-contact__*` | 6 |
| Blog index | `templates/BuggyRents-blogs.html` | `dbr-blogs__*` | 3 |
| Blog article | `templates/BuggyRents-5-quadbike-mistakes.html` | `dbr-hero` + `dbr-article-wrap` + `dbr-final-cta` | 3 |
| 404 | `templates/BuggyRents-404-page.html` | `dbr-error-*` | 4 |
| HTML sitemap | `templates/BuggyRents-html-sitemap.html` | utility classes | 3 |

**Reuse — 16 page types, only 11 systems:**
- `dbr-cluster` → tour pages **and** price guides
- `dbr-pillar` → category pillars **and** audience pillar
- `dbr-about` → FAQ pages **and** about us
- `dbr-support` → privacy, refund, **and** audience sub-pages (also terms, safety, fleet)

### Section maps

**Pillar (8):** hero → reviews strip `--light` → vehicle grid `--dark` → decision cards `--light` → process `--sand` → FAQ `--sand #faq` → long-form `--content` → cross-sell `--light`

**Cluster / tour + price (10):** hero → spec-strip → duration & price cards `--light #combos` → what's included `--sand` → process `--light` → why this vehicle `--dark` → safety rules `--sand` → FAQ `--light` → compare next options `--sand` → how to choose (long-form) `--light`

**FAQ / about (11):** hero → trust-strip → intro `--light` → what to confirm `--dark` → pick your question `--sand` → what's handled `--light` → reviews `--reviews` → ask the team `--sand` → FAQ accordion `--faq` → related links `--links` → final CTA `__final`

**Location (9):** hero → stats → intro `--light` → activity by control style `--sand` → pickup process `--light` → confirm before leaving `--dark` → FAQ `--light #faq` → nearby pages `--sand` → final CTA `__final #book`

**Support (9):** hero → trust-strip → intro `--light` → confirm before payment `--sand` → details that change the recommendation `--dark` → question-to-booking path `--light` → FAQ `--faq` → related pages `--sand` → final CTA `__final`

**Contact (6):** hero → fastest contact route `--main` → form section → social `--social` (omit, no accounts) → FAQ `--faq` → final CTA `__cta`

**Blog index (3):** hero → post list → CTA
**Blog article (3):** hero → `dbr-article-wrap` (key takeaways → what to expect → main h2/h3 body → how to book → comparison table → FAQ) → final CTA
**404 (4):** error hero → recovery → pillar links → help

Section modifiers: `--light` `--dark` `--sand` `--content` `--reviews` `--faq` `--links` `--main` `--social`.

### Contact form spec
Fields: `website_url` (honeypot, hidden), `name`, `phone`, `email`, `message`.
Submits to WhatsApp or email in exactly this body:

```
Hi BuggyRents,

Name:
Phone:
Email:

Message:
```

---

## 3. Client decisions already made — do not re-ask

- **Design:** competitor clone structure + BuggyRents identity
- **Stack:** Astro 5 + Keystatic CMS + Cloudflare Pages via GitHub (Hostinger rejected)
- **Fonts:** Option A — Plus Jakarta Sans (headings) + Instrument Sans (body)
- **Colours:** orange `#FF6600`, navy `#323D4E`, gold `#FFC757`, sand `#FAE7C0` — sampled from the logo
- **Orange as TEXT uses `var(--c-orange-text)`, never `var(--c-orange)`.** Approved 8 Aug 2026.
  `#FF6600` on white is 2.94:1 and fails WCAG AA, so text and links use `#C24E00` (4.79:1).
  Fills, buttons, bullets and bars keep the bright orange. On dark surfaces the ratios invert
  (bright 3.74:1, dark 2.29:1), so a rule in `global.css` flips the token back to bright inside
  any `--dark`, `__hero`, `__final`, `__trust` or `__cta` container. Use the token and the right
  shade is picked automatically. This cut sitewide contrast warnings from 3,947 to 1,436.
- **Buttons:** `border-radius: 10px`. **Not** pills. Icon-only floating buttons stay circular.
- **Floating actions:** WhatsApp + phone, bottom right
- **Scrollable long-form reader** with mid CTA tile and closing CTA tile, placed **before the FAQ section, on every major page**
- **Phase 1 scope:** dune buggy, quad bike, KTM dirt bike, desert safari
- **Language:** English only for Phase 1
- **Email:** Gmail approved for launch

---

## 4. Confirmed pricing — all per vehicle, never per person

Lives in `site/src/data/vehicles.ts`.

**Dune buggy** — 11 packages, durations 30 min / 1 hr / 2 hr / 4 hr (no 3 hr, client removed it).
Polaris RZR 1000 2-str 300/550/999/2199 · 4-str 350/550/1099/2299 · Polaris Turbo 2-str 800/1099/1999 ·
Turbo 4-str 750/999/2299 · Polaris Pro 700/1100/1300 · Can-Am X3 2-str 600/999/1299 ·
X3 4-str 700/999/1499 · X3 Turbo RR 2-str 1000/1299 · Turbo RR 4-str 1299/1799 ·
Maverick R 2-str 900/1299/1999 · Maverick R 4-str 999/1299.
**Client confirmed the Turbo 4-seater really is cheaper than the 2-seater. Do not "fix" it.**

**Quad** (30 min / 1 / 2 / 3 / 4 hr): Kids 70–90cc age 6+ 75/140/250/350/450 · Single seat boundary
150–250cc age 12+ 89/150/300/400/500 · Double seat boundary 250–350cc age 14+ 150/250/400/500/600 ·
Single seat open desert 250–350cc age 14+ 200/350/500/700/900 · Double seat open desert 350–450cc
age 16+ 300/450/600/900/1100 · Yamaha Raptor 700cc age 14+ 500/700/1200/1700/2200

**MINIMUM AGE CHANGED 12 Aug 2026 — client instruction.** Every vehicle that was 18+
is now **14+**: all eleven dune buggies, the Yamaha Raptor 700cc and the KTM 450.
The quad tiers that were already 6, 12, 14 and 16 are unchanged and must stay that way.

This was not a data-only edit. Roughly a dozen hand-written sentences hardcoded 18,
and the KTM page carried "Eighteen, with no exceptions. The bike is too heavy and too
fast in sand for younger riders", which would have contradicted the table beside it.
That answer is rewritten around **rider screening** rather than age: the guide watches
clutch control on flat sand before the route opens, and anyone not ready is moved to a
quad or a buggy for the same slot. Keep that framing. If the age moves again, search
the whole repo for the number rather than only the CMS, because most of the copy is
derived from `minAge` but not all of it.

**KTM 450 dirt bike**: 500/700/1200/1500/2000. No Husqvarna, no beginner tier.

**Desert safari** — 12 packages in `site/src/data/safari.ts`.

**Combos and policies** in `site/src/data/extras.ts`: 5 buggy+BBQ combos (450–1000, buggy session
is 30 min on all), 2 quad+safari combos (200 for 30 min quad, 300 for 1 hr), sandboarding free,
camel ride 100, group bookings custom.

**Hotel pickup within Dubai is FREE.** Outer emirates quoted. Never write "quoted with booking"
for a Dubai pickup. Free cancellation up to 24 hours before. No deposit on standard slots.

**Payment:** cash, card and bank transfer all accepted, paid on the spot at the base before riding.
Nothing due at booking time.

**NO INSURANCE — and do not mention its absence either.** The business carries no rider
insurance. Two separate rules, both enforced by `scripts/audit-contrast.mjs`:

1. **Never claim cover.** No "insured", "fully covered", "insurance included", or any sentence
   that reads as cover we provide. The build fails on these. Confirmed 7 Aug 2026.
2. **Never state the absence either.** Client instruction 8 Aug 2026 — "itna b straight ne hona,
   ye mention hi na kro". Do not write "we carry no rider insurance", "not insured", "you ride
   uninsured". It kills conversion on a marketing page and it is not required anywhere.

**The approved framing is guest-owned advice:** "Check that your travel insurance includes desert
sports and off road activities before you travel. Many standard policies exclude them." This is
true, useful to the reader, and can never be misread as cover we provide. The audit permits any
sentence matching `your|my (own) (travel|medical) insurance|policy|cover`, and still fails a bare
claim. Keep one line of it on Terms and Conditions — that page is what protects the client if an
injured guest later claims they believed they were covered. Do not remove it from Terms.

Marketing surfaces (hero panels, trust strips, cards) carry hooks instead: 17K+ guests since 2020,
4.9 Google rating, TripAdvisor Travellers' Choice, no deposit, free 24-hour cancellation,
free Dubai pickup, per-vehicle pricing, kids from age 6.

**Business:** open 24/7 · lat/long 25.153303, 55.635006 · 50+ guides · 70+ vehicles.

---

## 5. Keyword research — 6 Semrush CSVs, 502 keywords, 117,560 monthly volume

| Cluster | Keywords | Volume | Avg KD | Head term |
|---|---|---|---|---|
| **Desert safari** | 322 | **97,220** | 64 | desert safari dubai (49,500) |
| Dune buggy | 79 | 13,280 | 86 | dune buggy dubai (5,400) |
| Quad bike | 104 | 8,620 | 87 | quad biking dubai (4,400) |
| KTM / dirt bike | 27 | 300 | 96 | ktm dirt bikes (90) |

Sub-intents: price 9,310 · timing 4,640 · location 2,310 · info-blog 1,800 · audience 1,340.

**CLIENT DIRECTION — do not re-argue this.** Dune buggy and quad bike are the **primary
services** and lead the build. Desert safari is **secondary**: the business offers it, but it is
a Phase 2 expansion. Do not reorder the plan around search volume alone.

Search volume is therefore a *tiebreaker within* the buggy and quad clusters, not a reason to
promote safari. `quad biking dubai` — 4,400 volume at **KD 26** — is the best
volume-to-difficulty ratio on the list and should rank fastest. Build quad before buggy.

KTM is negligible for search (300 volume, KD 96) — build it for conversion, not traffic.

**30 quick wins at KD ≤ 25:** dubai desert safari without dune bashing (KD 2) · what to wear to
desert safari dubai (KD 7) · dubai desert safari outfit (KD 7) · vip hummer desert safari dubai
(KD 7) · quad biking dubai price (KD 9) · hummer desert safari dubai (KD 9) · red dune desert
safari dubai (KD 22, 1,000 vol) · dubai desert safari location (KD 20, 720) · overnight desert
safari dubai (KD 19, 590) · quad bike desert safari dubai (KD 21, 590) · sunrise desert safari
dubai (KD 22, 480) · dune buggy dubai price (KD 20, 320) · desert safari dubai timings (KD 19).

---

## 5b. Image rules — do not break these

- **One source folder:** `images-library/` (177 unique originals, deduplicated). The old
  `images/` year folders and `Picture for websites` are redundant.
- **Every site image is WebP**, exported to `site/public/assets/images/lib/` (content) and
  `/hero/` (hero backgrounds).
- **Filenames are keyword-descriptive**; alt text describes the actual photo, not the page title.
- **Every image carries a `subject`** (`buggy` `quad` `dirtbike` `safari`) in `src/data/images.ts`.
  `img(key, subject)` throws at build time on a mismatch, so a KTM page can never show a buggy.
- **No image may appear twice on the same page** — enforced by `scripts/audit-contrast.mjs`.
- **Hero backgrounds:** must match the page subject, be **at least 1600px wide** (2560 preferred)
  so they do not pixelate, and carry a `focal` value so the subject sits clear of the
  left-aligned heading. Build warns below 1600px.
- **Minimum resolution — enforced.** `scripts/audit-contrast.mjs` **fails the build** on any
  shipped image under **500px** wide and **warns** under **900px**. Cards render ~400px wide,
  so 800px is the real floor on a 2x screen. Added 8 Aug 2026 after a **260×194** thumbnail
  (`Sports-and-Outdoor-Activities-in-Dubai.jpg`) shipped as a quad cross-sell card.
  Never re-add that original — it has no larger copy.
- **Before exporting, always check the original's pixel size.** Several files in
  `images-library/` are WordPress thumbnails, not originals. A descriptive filename does not
  mean a usable file.
- **Known gap — client action needed.** 12 shipped images are between 500px and 900px and are
  already at their native maximum, confirmed by perceptual-hash matching against all 177
  originals. There is no larger copy in the library. Ask the client for replacements at 2000px+:
  quad `kids-quad-bike-dubai-fenced-riding-area` (720) · `double-seat-quad-biking-dubai-red-dunes`
  (889) · `quad-bike-group-tour-dubai-open-desert` (669) · `quad-bike-rental-fleet-parked-al-awir-dubai`
  (720, portrait) · buggy `dune-buggy-sunrise-desert-tour-dubai` (700) ·
  `polaris-rzr-pro-white-dune-buggy-dubai` (720, portrait) ·
  `can-am-maverick-x3-4-seater-family-buggy-ride-dubai` (720) ·
  `dune-buggy-sunset-ride-lahbab-red-dunes-dubai` (886, portrait) · KTM
  `ktm-450-dirt-bike-rider-dubai-desert` (569) · `ktm-dirt-bike-fleet-lined-up-dubai-desert` (700) ·
  `dirt-bike-desert-motocross-action-dubai` (720) · `dirt-bike-group-tour-dubai-desert` (700).
  **Landscape shots at 2000px+ are the single highest-value asset request.**
- **All four audits now run on every build** — `"build": "astro build && npm run audit"`.
  Before 8 Aug 2026 the build script was `astro build` alone, so none of the audits ever ran
  on Cloudflare. Do not remove the `&& npm run audit`.

---

## 5c. Titles, meta descriptions and the em-dash fallout

**The brand suffix is optional, not fixed.** `pageTitle()` in `src/data/seo.ts` appends
` | Buggy Rents` only when the result stays inside 60 characters, and drops it when it
does not. Before this, 40 of 64 titles were being truncated in search results and the
14 characters spent restating the brand were the ones pushing the price off the end of
a tour page result. Google appends the site name anyway. Never hardcode the suffix into
a title again; wrap it in `pageTitle()`.

`TITLE_MAX` 60 and `DESC_MAX` 160 live in that one file. The metadata audit **warns**
rather than fails on a long title, because the real limit is pixel width, and a hard
failure would block the client's own content edits over a two-character overrun. A page
with **no** title or description does fail: that is a missing tag, not a guideline.

**Three bugs found while fixing this, all from the same source.** Stripping em dashes
sitewide left `" ,  "` behind wherever a dash had joined two phrases, and it was visible
on nine pages including the homepage h1 area. Two `clamp()` calls also lost their first
comma (`clamp(1rem.9rem + .45vw, 1.22rem)`), which makes the whole declaration invalid,
so the homepage hero tagline and the long-form reader intro had been rendering at their
inherited size since the first build. `audit-contrast.mjs` now fails on both patterns.
The separator now lives in `Hero.astro` rather than in each string passed to it.

## 6. Content and SEO standard

Act as a senior SEO with deep ranking experience. Every page must have:

- One `h1` containing the primary keyword, in natural language
- Logical `h2` → `h3` → `h4` hierarchy, no skipped levels
- Primary keyword in title, `h1`, first 100 words, one `h2`, meta description, URL
- Semantic variants and entities throughout, not repetition of the exact match
- Schema: `Organization`/`LocalBusiness` sitewide, plus `Product`+`Offer`, `FAQPage`,
  `BreadcrumbList`, `AggregateRating` where they apply
- Internal links using descriptive anchors, pillar ↔ cluster ↔ location ↔ audience
- EEAT signals: real prices, real safety detail, named riding areas, real award
- **All copy original.** Layout is copied; words are not. Duplicate copy will not rank.
- **Never fabricate** review counts, ratings, guest names or licence numbers.
  Mark them `PLACEHOLDER` and flag them to the client.

---

## 6b. Desert safari cluster — built 12 Aug 2026

**The safari pillar moved from `/desert-safari-dubai-deals/` to `/desert-safari-dubai/`.**
The old slug targeted "desert safari dubai deals" (390 searches, KD 28) while the clean
path, which matches the 49,500-volume head term and the convention every other pillar
follows, returned a 404. The old URL carried 248 internal links, so it 301s in both the
slashed and unslashed forms. Do not point anything at `-deals` again.

**Eight child pages, one per PRODUCT rather than one per keyword.** Six target keywords are
synonyms of an existing package and three describe no package at all, so a page per keyword
would have been a doorway-page set. Merged deliberately:

| Merged into | Because |
|---|---|
| sunrise → morning page | same product, no separate sunrise package exists |
| night → evening page | same product, the camp half simply runs after dark |
| ATV → quad bike safari page | ATV and quad are the same machine |
| deluxe → private and VIP page | same four private packages |

Pages: `evening-desert-safari` · `morning-desert-safari` · `overnight-desert-safari` ·
`quad-bike-desert-safari` · `private-desert-safari` · `dune-buggy-desert-safari` on the
**dbr-cluster** system via `SafariCluster.astro`, plus `red-dune-desert-safari` on
**dbr-location** and `faq` on **dbr-about**.

**`SafariCluster.astro` is separate from `Cluster.astro` on purpose.** Cluster.astro is typed
against `Vehicle` and prints "Per vehicle" under every price. Safari pricing is mixed: shared
packages are **per person**, private ones are **per vehicle**. Bending Cluster.astro to take
both shapes would have pushed a union type through the 20 existing tour pages for their
benefit of nothing, and the one thing that must never break here is the price basis. Same
reasoning as the pillar not using `Pillar.astro`.

**No price is a literal in `safariPages.ts`.** Every figure is read from the package data, so
the price audit cannot report a stale number and a CMS price change updates the copy, cards,
schema Offer and WhatsApp message together. `packagesFor()` throws at build time if a page
references a package the client has deleted.

**Seven safari photos against eight pages.** Each page takes three, chosen so no two pages
share a set, and the image-variety audit now covers `desert-safari-dubai` as well as the three
vehicle directories. When the 2000px landscape shots in §5b arrive, widen those sets rather
than adding pages.

**`Location.astro` gained an optional `parent`** so the red dunes page reads
Home / Desert Safari Dubai / Red Dunes instead of claiming to sit under `/locations/`, which
holds pickup areas. Its closing-CTA image also falls back to the content library when the name
is not a hero, because there is exactly one safari hero and it is already that page's own hero.
Both default to the previous behaviour and the ten pickup pages built byte-identical.

---

## 7. Build state

**All 11 template systems are built. 74 pages, zero broken links, zero orphans.**
Was 65 before the safari cluster of 12 Aug 2026.

**A 14th audit: root-resolves.** If `dist/x/` contains child pages, `dist/x/index.html` must
exist. This is the bug that put `/desert-safari-dubai/price/` live under a parent that 404d,
and no existing audit could see it: the link audit only checks links that are written, and
nothing linked to the missing parent. It found a second instance the first time it ran,
`/audience/`, which had eight child pages and no hub. That hub is now built.

`npm run build` runs eleven audits, all of which fail the build: contrast (both the
token check and a full DOM cascade walk), colour syntax, image reuse and alt text,
image resolution, **cross-page image variety**, insurance claims, em dashes, missing
referenced assets, placeholders such as `[object Object]`, and a price cross-check.
Do not remove `&& npm run audit`.

**Fixes made 10 Aug 2026 that must not be undone:**

- **`ReviewsCarousel` owns its own shell CSS.** It used `pl__shell` from `pillar.css`,
  which is not loaded on the FAQ and About pages, so the reviews strip ran the full
  width of the browser there. A shared component may not depend on which page-level
  stylesheet happens to be imported.
- **Duration cards take `badge` and `blurb` from the CMS.** They were looked up in
  code from a table keyed by the duration *label*, so a client adding "2 Hour" got the
  fallback badge "Option" over an empty paragraph. The fallback table is now keyed by
  **minutes**, which is a number field and cannot be typed three different ways. All
  68 existing duration rows were backfilled so the CMS never shows a blank field for
  copy that is visible on the site.
- **Duration labels are tidied on load** in `vehicles.ts`: a missing space between a
  digit and a letter is inserted, because that label is printed into the card, the
  price table, the schema Offer and the WhatsApp booking message at once.
- **Tour page images are offset per vehicle.** Gallery picks used index 0,1,2 of a
  pool built identically for every vehicle, so all 11 buggy pages showed the same
  three photos and the same six cross-sell cards. Both now rotate by the vehicle's
  position in its category. The image-variety audit fails the build if two tour pages
  in a category ever carry an identical image set again.
- **Heroes are still shared per category** and that is a content gap, not a code one:
  the library holds one usable buggy hero. `heroImage` is now an optional per-vehicle
  CMS field, so the day landscape shots at 2000px+ arrive they can be assigned
  without a developer.
- **Long tokens wrap.** `Buggyrents@gmail.com` overflowed its card at narrow widths;
  `overflow-wrap: anywhere` on `.ab__contact-card strong` and `.ct__channel strong`.
- **Footer carries the agency credit**, `site.agency` → digitum.marketing, `noopener`
  but deliberately not `nofollow`.
- **The address links to the Google Business Profile** in the footer and twice on the
  contact page, and the reviews widget's rating link lost its `nofollow`. That profile
  is where the 4.9 rating shown across the site comes from.

XML sitemap is generated by `@astrojs/sitemap` at `/sitemap-index.xml`, which is
what `robots.txt` has always pointed at. 404 and Keystatic are filtered out.

Favicons, apple touch icon, web manifest and the Open Graph card all live in
`public/` and were generated from the brand mark. The OG card matters more than it
looks: WhatsApp is this business's main channel and links had no preview before.

`site/` — Astro project, builds clean, 19 pages.

Done: tokens, global CSS, Base layout, Header, Footer, FloatingActions, VehicleCard,
PriceTable, LongFormReader, homepage (13 sections), location template ×10, audience template ×8.

Data files: `site.ts` `vehicles.ts` `nav.ts` `home.ts` `longform.ts` `locations.ts` `audiences.ts`.

Build in `/tmp` not the synced folder — `npm install` times out over the mount.

**Open placeholders:** trust-strip numbers · trade licence number · real Google/TripAdvisor
reviews and rating · desert safari prices · GA4/GSC access.

---

## 8. Live as of 10 Aug 2026

buggyrents.com now serves this site. The old WordPress install is gone from the domain.
Deployed as a **Cloudflare Worker** named `buggyrents`, built from `digitumarketing/buggyrents`
on push to `main`. Build `npm run build`, deploy `npx wrangler deploy`, root directory `/`
(the repo root *is* `site/`). Verified live: `/keystatic` loads, `/contact-us/` 301s to
`/contact/`, `/sitemap-index.xml` lists 64 URLs.

Keystatic runs in GitHub storage mode against the app **buggyrents-cms**. Four values make it
work, and they live in two different places for a reason:

| Where | Name |
|---|---|
| Worker → Variables and secrets (runtime) | `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, `RESEND_API_KEY` |
| Worker → Build → Variables and secrets | `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG = buggyrents-cms`, `NODE_VERSION = 22` |

The slug is a **build** variable, not a runtime one: it is baked into the browser bundle at
build time, so setting it as a secret does nothing. This is the step that is always missed.

**Always `git pull --rebase` before pushing.** Keystatic commits straight to `main` on GitHub
every time the client saves, so the remote moves without anyone touching the laptop. A plain
push is rejected as soon as that has happened. Rebase rather than merge: the client's content
commits touch only `src/content/*.json`, so they never conflict with code changes, and a merge
commit for every CMS edit would bury the history.

**Cloudflare injects its own block into `robots.txt`.** AI Crawl Control is on by default and
prepends `Disallow: /` for ClaudeBot, GPTBot, CCBot, Google-Extended, Bytespider and others
above our rules, plus `ai-train=no`. Google Search is unaffected either way.

**Client decision 10 Aug 2026: AI crawlers are allowed.** `public/robots.txt` now carries
`Content-Signal: search=yes, ai-input=yes, ai-train=yes`. That file alone is not enough —
Cloudflare prepends its rules above ours, so the managed block must also be switched off in
the dashboard: **AI Crawl Control → Directives → turn off managed robots.txt**, and per-crawler
switches live on the **Crawlers** tab. If the live `/robots.txt` still shows a
`# BEGIN Cloudflare Managed content` section, that dashboard step has not been done.

### Launch checklist — closed 10 Aug 2026

All five items are done and verified on the live domain:

1. Search Console verified, `/sitemap-index.xml` submitted.
2. GA4 `G-HKVDWC923V` in `Base.astro`, on all 65 pages. Wrapped in `import.meta.env.PROD`
   so local dev and audit runs never appear in the client's reports.
3. buggyrents.com verified at Resend. DKIM sits on the root domain, which is why the From
   address can be any `@buggyrents.com` mailbox. The `send` MX and TXT records are the
   bounce and SPF subdomain, **not** a sending address — `send@buggyrents.com` is a
   misreading of the DNS table and was raised once already.
4. Contact form tested end to end; mail arrives from `bookings@buggyrents.com`, not spam.
   `bookings@` is send-only, so `reply_to` carries the guest's address.
5. Legacy 301s confirmed live with and without a trailing slash.

Keystatic is proven end to end: commit `8b5fe74` was written to `main` by the CMS itself.

### CMS migration — agreed scope, 10 Aug 2026

Client wants **every hand-written word on all 65 pages editable**, organised **page by page**.

What must NOT move into the CMS: copy that is *derived* from vehicle data. Changing one
price today updates 40+ places automatically — pillar page, price table, FAQ answers,
schema Offer, WhatsApp message, blog articles, contact dropdown. Turning those into
separate CMS fields would hand the client 40 places to edit and one page that lies the
moment they miss one. Layout, section order and the 11 template systems stay in code too.

| Phase | Covers | State |
|---|---|---|
| 1 | 6 blog articles → Markdoc collection | **done** |
| 2 | homepage, site settings, reviews, combos and policies | **done** |
| 3 | 10 location + 8 audience pages | **done** |
| 4 | 3 category pillar pages | **done** |
| 5 | 7 support pages, About, 2 FAQ pages | **done** |

**Phases 4 and 5 detail.** `pillars.ts`, `support.ts` and `aboutBuild.ts` are adapters over
`src/content/{pillars,support,about}/*.json`. `pillarBuild.ts` is gone; both pillar pages
now import from `pillars.ts`. All 65 pages came out byte-identical.

**`src/data/tokens.ts` is what makes this safe, and it is the piece to understand.**
Moving page copy into the CMS collides with the rule that a price is written once and
derived everywhere. "Self-drive tours from AED 300" is prose the client should be able to
rewrite, but the 300 in it is not. Frozen into a CMS field it goes stale the first time a
price changes, and the page then contradicts the table below it. So the client writes
`from AED {buggyFrom}` and the build fills it in.

Available tokens: `buggyFrom` `quadFrom` `dirtbikeFrom` `safariFrom` · `buggyCount`
`quadCount` `dirtbikeCount` · `rating` `reviewCount` · `phone` `email` `address` `guests`
`fleet` `guides` `founded` · `cancellation` `weather` `deposit` `payment` `paymentFull`
`pickup` `pickupOuter`.

A misspelled token throws at build time in `fill()`, and a **token audit** also scans the
built HTML, because a field added to a schema and forgotten in its adapter would print the
raw `{buggyFrom}` onto a live booking page. That failure mode is worse than any build error,
so it fails the build.

**Long-form price ladders are deliberately NOT tokenised.** A paragraph listing
"AED 75 / 140 / 250 / 350 / 450" is a real ladder, not a derived headline, and tokenising
every figure would make it unreadable in the editor for no benefit. Those are covered by
the price audit, which flags any AED figure in copy that matches no current price.

**Dumping code to JSON needs `vite-node`, not `tsx`.** Every data module now uses
`import.meta.glob`, which only exists inside Vite. `npx vite-node -c <config with the @ alias>`
runs them; plain `tsx` fails on the first adapter.

**Phase 1 detail.** `posts.ts` was 502 lines of TypeScript with HTML strings; it is now an
adapter over `src/content/posts/*.mdoc`. The body is a real rich text field so the client
writes prose, not HTML. FAQ pairs stay as fields because they feed `FAQPage` schema and
free text cannot be split back into question and answer reliably. Heading ids come from
`markdoc.config.mjs`, and the table of contents is built from the headings Astro reports
rather than regex over the body. Comparison tables are now markdown tables, so
`.ar__body table` carries its own horizontal scroll.

**Phase 2 detail.** `site.ts`, `home.ts`, `extras.ts` and `reviews.ts` are now adapters over
`src/content/{settings,homepage,policies}.json` and `src/content/reviews/*.json`. Exports are
unchanged, so no template was touched.

- **The JSON is flat and the adapter rebuilds the nested shape.** Keystatic renders a flat
  object as a plain list of labelled inputs; nested objects become collapsible panels that
  hide the field the client is looking for. Flat in the CMS, nested in code.
- **Reviews are a collection, not one field**, because they arrive one at a time and a single
  one may need removing. The 4.9 rating and the count stay in Site settings: they describe the
  Google profile as a whole, and they are printed beside the Google logo on every page.
- **`addOns.price` must stay nullable.** `null` means "quoted individually" and `prices.ts`
  filters those rows out of the comparison table. Converting it to `0` during the migration put
  "Group and corporate bookings" into the safari price table labelled Free. Caught by the byte
  comparison, not by any audit.
- **The price audit reads `policies.json` now.** It used to regex `src/data/extras.ts`; when the
  combos moved, seven prices silently dropped off the known list and began reporting as stale.

**Phase 3 detail.** `locations.ts` and `audiences.ts` are adapters over
`src/content/{locations,audiences}/*.json`, one file per page. Only what is genuinely
specific to a page lives there: name, short name, emirate, drive time, intro, keywords.

The ten location pages are one page with a different place name in it, so the shared
sentences stay in `locationPages.ts` and are built from those values. Putting them in each
file would turn one correction into ten edits with nine chances to miss one, and after a
year the pages would read like ten different companies. **`emirate` is the field to watch:**
anything other than `Dubai` flips the page from "free pickup" to "transfer quoted", so a
typo there changes what the page promises a guest.

All 18 pages came out byte-identical.

**Navigation stays in code, deliberately.** Header and footer links are structural: a mistyped
href fails the link audit, which fails the build, which blocks every future deploy including
the client's own content edits. The labels almost never change, so the risk buys nothing.

**Every phase is verified by byte-comparing all 65 built pages against the previous build.**
Phase 1 result: 59 identical, 6 changed, and the 6 are exactly the articles. Word counts and
heading counts matched before and after on all six. Do not skip this check — it is the only
thing that catches copy quietly changing during a migration.
