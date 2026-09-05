# BuggyRents — 90-day SEO, AEO and GEO plan

**Goal: at least 5 organic converted leads per month.** Written 5 Sep 2026. Covers
September, October and November 2026, with a report to the client at the end of each.

Read `CLAUDE.md` first. This file plans work; it does not own facts. Keyword volume and
difficulty live in `CLAUDE.md` §5, the audit suite in §7, the open blockers in
`docs/HANDOVER.md` §5 and §6. Where this plan needs one of those numbers it points at it
rather than repeating it, for the reason that file gives.

---

## 1. What the goal actually requires

A lead here is an **organic session that produced at least one enquiry**: a WhatsApp chat
opened, the contact form submitted, or the phone tapped. Counted per session, not per
event, so a visitor who taps WhatsApp and then calls is one lead and not two. Bookings the
client confirms are counted separately as *won*, because we only ever see the click.

At a 2 to 4 per cent session-to-enquiry rate, which is the normal band for a local service
site with a WhatsApp button on every page, five leads a month needs roughly **125 to 250
organic sessions a month** carrying commercial intent. That is a modest number and it is
reachable. It is also a guess until week 2, when GA4 replaces it with the site's real rate.

**The binding constraint is not traffic. It is that nothing is currently countable.**
`Base.astro` fires `gtag('config')` and nothing else. There is no event on the WhatsApp
button, none on the call button, none on the contact form. Every lead this site has already
produced is invisible, and on today's setup the September report would have nothing in it
but impressions. That is fixed in week 1 before anything else starts.

**Expect a ramp, and set the client's expectation accordingly.** The site went live on the
domain on 10 Aug 2026 and nobody has opened Search Console since. September is realistically
one to three leads while measurement lands and the first pages move; five per month is a
November number that should hold from then on. Promising five in September would be
promising something the indexing timeline cannot deliver.

---

## 2. The three levers, in the order they pay

**1. Measurement.** Nothing below can be reported, tuned or defended without it. One week.

**2. Google Business Profile.** For "dune buggy dubai" and "quad biking dubai" the local
pack sits above the organic results and takes the calls. The review count and the gap to
competitors are in `docs/HANDOVER.md` §6 item 3, which already names review velocity as the
biggest single lever on local ranking. It is also free and needs no
deploy. Treated here as a workstream we run, not a blocker we wait on.

**3. Pages already ranking 11 to 20.** A query in striking distance moves on an on-page
pass, which lands in weeks. A new article on a fresh domain takes two to six months. Until
Search Console has been read we do not know how many of these exist, which is why reading
it is a week-1 task and not a month-3 one.

Content volume is the fourth lever, not the first. It compounds, but it compounds after the
quarter this plan covers.

---

## 3. Month 1 — September: make it countable, then take the near misses

### 3.1 Conversion tracking, week 1, blocks everything

**Done 5 Sep 2026.** Three signals are pushed to the dataLayer by the site, and GTM turns
them into GA4 events. The split matters: the site owns *what happened*, the container owns
*where it is sent*.

| dataLayer event | Fires on | Sent with |
|---|---|---|
| `whatsapp_click` | every `wa.me` link anywhere on the site, including CMS-authored ones | `lead_page`, `lead_cluster`, `lead_method` |
| `call_click` | every `tel:` link | `lead_page`, `lead_cluster`, `lead_method` |
| `generate_lead` | the contact form, both the WhatsApp button and the email button | `lead_page`, `lead_cluster`, `lead_method` |

The click handler is delegated from the document rather than bound per component, so it
covers the floating bar, the header, the footer, every template and any link the client
types into a CMS field, including components that do not exist yet. The contact form
reports itself because its primary button opens WhatsApp with `window.open` and no href
handler can see that.

A **lead-tracking audit** fails the build if any of it goes missing, because a lead counter
that silently stops has no symptom until the month-end report reads zero.

**GA4 was removed from the site's code on the same day and now lives only in GTM**, at the
client's direction, reversing the decision in `CLAUDE.md` launch item 2. That file records
what the reversal cost and the two guards that replaced it. `docs/GTM-SETUP.md` is the
container build sheet.

Still to do by hand, none of it possible from the repo: publish the container, mark the
three events as key events in GA4, and annotate 3 to 4 Sep for the doubled window.

### 3.2 Search Console baseline, week 1

Nobody has looked since launch. Pull and keep as the September baseline:

- **Performance → Queries**, positions 11 to 20. This is the month-1 content list and it
  outranks anything planned in advance, including the list in §3.4 below.
- **Indexing → Pages**, actual indexed count against the sitemap's discovered count.
- URL Inspection on `/desert-safari-dubai/`, which carried 248 internal links to its new
  URL and has never been submitted. `docs/HANDOVER.md` §0 has the count and the history.

### 3.3 The entity fix, week 1 — this is the AEO and GEO foundation

`Base.astro` builds a variable called `localBusiness` and gives it `@type:
'TouristAttraction'`. That is a Place, not a LocalBusiness. It cannot legitimately carry
`priceRange`, it is not eligible for local business rich results, and it describes the
dunes rather than the operator. `CLAUDE.md` §6 has said `LocalBusiness` since the standard
was written; the code has never matched it.

Fix as `@type: ['LocalBusiness', 'TouristAttraction']`, which is valid JSON-LD and keeps
both readings, and add while there:

- `@id` on the entity, referenced from every page's other schema, so Google and the AI
  crawlers resolve one business rather than 75 unlinked mentions
- `aggregateRating`, read from the same site data the reviews strip already renders, so it
  stays eligible and cannot drift from what the page shows
- `geo` coordinates and `areaServed` for Dubai and the northern emirates
- `hasOfferCatalog` pointing at the four cluster pillars

This is one change and it is the highest-leverage hour in the quarter. Entity clarity is
what both the local pack and an AI answer engine need before anything else counts.

### 3.4 Pages, September — the four that are missing before any new ones

Four pages 404 today that every other cluster has: the dirt bike FAQ, and the three service
safety pages. `docs/HANDOVER.md` §8 item 6 has the detail on why no audit catches it. These
are commercial pages with a booking CTA, not articles, and they ship before article one.

Then the low-difficulty safari long tail, in the order `CLAUDE.md` §5 puts them, working
down the KD ≤ 25 list from the top: `dubai desert safari location`, `overnight desert safari
dubai`, `quad bike desert safari dubai`, `sunrise desert safari dubai`, `dubai desert safari
outfit`. This is long tail only. The head terms stay uncontested, per the standing client
direction in §5 which is not being re-argued.

Everything goes through the `buggyrents-article` skill, which loads automatically here. The
cannibalisation check in its STEP 0 runs against the live pages and its verdict wins over
this list.

**Image supply is the hard ceiling on page volume.** The image-variety audit fails the build
when two pages in a cluster share an image set, and `CLAUDE.md` §6b records how little
headroom the safari sets have left. At 8 to 12 pages a month the existing library runs out
during September, so plan each month against the images that exist.

---

## 4. Month 2 — October: volume, answers and the machines that read them

### 4.1 AEO — being the answer, not just a result

The FAQ blocks and `FAQPage` markup already exist across the templates. What is missing is
the shape of the answers. Every FAQ answer and every article's opening gets an **answer-first
block**: the direct answer in 40 to 55 words in the first paragraph, then the detail. Use the
vendored `featured-snippet-optimizer` skill against the queries Search Console shows the site
already ranking for, rather than guessing.

Priority questions, all of which this business can answer from its own operation and most
competitors cannot: minimum age, licence requirements, what a Dubai pickup costs, what is
included, what to wear, how long to book, whether it is safe.

### 4.2 GEO — being cited by the answer engines

A rising share of Dubai trip planning starts in an assistant rather than a search box, and
the citation rules are not the same as ranking rules.

- **`public/llms.txt`**, which does not exist today: the business, the four clusters, the
  price basis, the age rules, and the canonical URL for each cluster. Generate it from the
  same data the pages use so it cannot go stale, and add it to the audit suite.
- **Bing Webmaster Tools**, which is `docs/HANDOVER.md` §5 item 4 and has been sitting at
  "five minutes" since August. It feeds ChatGPT's search index. Do it in week 1 of October.
- **NAP consistency** across the profile, the site, and the OTA and directory listings in
  `docs/HANDOVER.md` §6 item 4. An assistant that finds three phone numbers for one business
  cites neither.
- **First-party detail**, which is the actual differentiator. The client owns the vehicles,
  employs the guides and runs the sessions from its own base. Named dune areas, real session
  structure, what actually happens when a rider cannot handle the machine. Use the vendored
  `expert-interview` skill on the client once and mine the transcript all quarter. Assistants
  cite specifics and skip pages that read like every other page.

### 4.3 Pages, October

8 to 12, continuing down the KD ≤ 25 list, plus whatever September's Search Console pull put
in striking distance. Rewrites of near-miss pages come before new articles every time.

### 4.4 Authority

The vendored `linkbuilding` skill classifies the phase and picks tactics for it. On a domain
this age the honest answer is citations and listings before outreach: TripAdvisor,
GetYourGuide, Viator, Klook and the Dubai directories in `docs/HANDOVER.md` §6 item 4, which
are a booking channel in their own right as well as a ranking signal.

---

## 5. Month 3 — November: convert what is already arriving

By now GA4 has two months of real data and the question changes from how many people arrive
to how many of them ask.

- **Rate, not volume.** Which pages get sessions and no `whatsapp_click`. Fix those before
  chasing more traffic: on a 200-session month, moving 2 per cent to 4 per cent is four extra
  leads, which is the entire target.
- **Trust.** The five AED figures in copy that match no current price, `docs/HANDOVER.md` §7,
  and the trade licence in §6 item 2. Both are EEAT and both are visible to a guest deciding
  whether to send money to a stranger in another country.
- **Core Web Vitals**, `docs/HANDOVER.md` §5 item 6, never measured. Likely fine on 2 KB of
  JS, but it is an assumption and November is when to retire it.
- **`eeat-audit` and `page-audit`** across the four pillars and the price pages, which are
  where the money pages are.
- Hold the review cadence. It compounds and it is the one thing that does not stop working.

---

## 6. The existing backlog, mapped onto this

`docs/HANDOVER.md` keeps the full list. This is only which of it is SEO work and when.

| Item | Where | When |
|---|---|---|
| Search Console never read | H §5.5 | Week 1, blocks the content list |
| Four cluster pages 404 | H §8.6 | September, before articles |
| Citations and OTA listings | H §6.4 | October |
| Bing Webmaster Tools | H §5.4 | October, counts as GEO |
| Five stale AED figures | H §7 | November, EEAT |
| Core Web Vitals unmeasured | H §5.6 | November |
| GA4 annotation for 3 to 4 Sep | C launch item 2 | Week 1 |
| Client guide | H §5.1 | Not SEO. After the quarter. |
| 18 typecheck errors | H §8.5 | Not SEO. Independent of this plan. |
| 680 contrast pairs below AA | H §7 | Leave. Client design decision. |

---

## 7. The monthly client report

Same five sections every month, generated from the same three sources, so month 2 is a
diff against month 1 rather than a new document. Sent within three working days of month end.

1. **Leads.** Organic sessions with at least one enquiry event, split by WhatsApp, form and
   call, against the target of five. Plus bookings the client confirms. This section goes
   first because it is the only one the client is actually buying.
2. **Visibility.** Impressions, clicks and average position from Search Console, and the
   queries that moved. Positions 11 to 20 called out as next month's list.
3. **Local.** Review count and rating, profile views, calls and direction requests.
4. **What shipped.** Pages published, pages rewritten, technical work done.
5. **Next month.** Three to five specific things, and anything we are blocked on, named with
   the date it was first asked for.

Never report a number this file or the client cannot trace back to a screen in GA4, Search
Console or the profile. The first invented figure is the last report they trust.

---

## 8. What would make this fail

- **Tracking slips past week 1.** Then September's report has no lead section and the whole
  quarter is being judged on impressions.
- **We write to the plan instead of to Search Console.** The list in §3.4 was written before
  anyone read the queries. When the two disagree, the queries win.
- **The client is promised five leads in September.** The indexing timeline cannot deliver it,
  and month 1 then reads as a failure while the plan is actually on track.
