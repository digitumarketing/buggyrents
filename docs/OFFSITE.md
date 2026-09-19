# Off-site and citations — audit, priorities and the NAP block

**Owner of:** everything that happens to this business outside buggyrents.com. What exists,
what is missing, in what order to fix it, and the exact text to use when doing it.

**Who does what, decided 18 Sep 2026.** This engagement produces the audit and the priority
order. **The client's own team executes the listings.** That split is recorded in
`docs/SEO-PLAN.md` §7b along with the risk it creates, and the risk is the point: `§4.4` and
`docs/KEYWORDS.md` §3 both say authority is the binding constraint on reaching the top ten, so
this document is a dependency for the quarter's target rather than a nice-to-have.

A rendered version of this document is published as an artifact for the executing team.
**This file is the owner.** If the two ever disagree, this one is right and the artifact
should be republished from it.

---

## 1. Why this exists, in one paragraph

On-page work is done. `docs/reports/2026-09-baseline.md` (17 Sep) has the buggy cluster at
positions 22 to 30, up fourteen places in a week, and the quad cluster at 52 to 70. **Nothing
on the page moves a six-week-old domain from position 25 into the top ten.** Google needs
other sites to corroborate that this business exists, and right now almost nothing does. That
is the whole reason this document exists, and it is why no amount of further article writing
substitutes for it.

## 2. What the business actually has outside its own site

Verified from `src/content/settings.json` and from searching for the brand on 18 Sep 2026.

| Entity | State | Notes |
|---|---|---|
| Google Business Profile | **Exists** | Place ID `ChIJo88Daad39T4RnM7myjfeJdQ` is in the CMS and 41 reviews at 4.9 render on the site. Claimed and verified status unconfirmed. |
| Facebook | Exists | `facebook.com/buggyrents` |
| Instagram | Exists | `instagram.com/buggyrents/` |
| TikTok | Exists | `tiktok.com/@buggyrents` |
| YouTube | Exists | channel `UCxg840PdCcCJ0GCnG018EBg` |
| Pinterest | Exists | `pinterest.com/buggyrents/` |
| TripAdvisor | **Cannot be located** | Closed 19 Sep, see §3a. No `sameAs` entry possible. |
| GetYourGuide, Viator, Klook, Airbnb | **None found** | No listing under this brand surfaced in search. |
| UAE directories | **None found** | Nothing beyond the socials above. |

**Six external profiles, five of them social.** Social profiles are weak corroboration: they
confirm a brand exists, not that a business operates at an address. The two entity types that
actually carry weight here, a verified map profile and independent review platforms, are one
and zero respectively.

## 3. Two things to fix before any new listing is created

### 3a. The award claim cannot be verified from outside

`settings.json` carries `TripAdvisor Travellers' Choice, 2025` in `awards`, and the article
prompt lists it as approved evidence writers may use. **Searching TripAdvisor for this brand
on 18 Sep 2026 returned no listing for it.** A dozen similarly named Dubai operators appear,
none of them this one.

There are innocent explanations: the listing may sit under a different trading name, or be
attached to a parent company. But the position the site is currently in is that it displays an
award from a platform it does not link to and that cannot be found.

**Closed 19 Sep 2026: the agency decided no verification is needed and the claim stays.**
The risk is recorded rather than argued: the award is displayed without a link to the platform
it comes from, and an OTA can check that during onboarding. No `sameAs` entry can be added
without the URL, so the entity keeps one fewer corroborating profile than it could have.
Do not re-raise this.

### 3b. The schema named five social profiles and neither of the two that matter. Fixed 18 Sep.

Built output on 18 Sep 2026:

```
"sameAs":["facebook.com/buggyrents","instagram.com/buggyrents/","tiktok.com/@buggyrents",
          "youtube.com/channel/UCxg...","pinterest.com/buggyrents/"]
```

`sameAs` is how the site tells Google which external profiles are the same entity, and it is
the mechanism the 5 Sep entity fix (`SEO-PLAN.md` §3.3) was built to feed. **The Google
Business Profile is not in it and neither is TripAdvisor.** Those are the two highest-authority
entities the business owns, and the site is currently pointing Google at Pinterest instead.

**Done 18 Sep 2026.** `sameAs` is now built in `src/data/site.ts` with the Google Business
Profile first, and `Base.astro` reads it from there. Worth knowing how this survived: the
comment above the old line *claimed* it tied in the Google Business Profile, and the code
underneath it only mapped the five social accounts. A comment describing intent is not the
same as code doing it, and nothing in eighteen audits checks that they agree.

TripAdvisor still has to be added and cannot be until §3a produces a URL.

Doing this before the listings work matters: every new citation now lands against an entity
Google has already resolved rather than one it is still assembling.

## 4. Priority order for the executing team

Ordered by effect per hour. Do not reorder to do the easy ones first.

| # | Action | Why it is here |
|---|---|---|
| ~~1~~ | ~~**Bing Webmaster Tools**~~ **Done 19 Sep 2026.** Domain added. Still to confirm in October: is Bing serving the current homepage title rather than the pre-launch one. | Non-Google indexes still serve the **pre-launch** site: search results on 17 Sep showed the old homepage title and the old `/contact-us/` and `/blog/` URLs. ChatGPT's search reads Bing, and ChatGPT sends this site more than twice what Google organic does. Your biggest traffic channel is reading a site that no longer exists. |
| 2 | **Google Business Profile**: five specific fixes, audited 18 Sep and listed in §4b | It is in better shape than expected on hours, address, phone, website, posts and photos. Two things on it are actively working against the rest of this document. |
| 3 | **Produce the TripAdvisor URL**, or confirm there is none | Blocks §3a either way. Ten minutes for someone who knows. |
| 4 | **GetYourGuide, Viator, Klook** | These are a booking channel as well as a citation. They need a trade licence, so timing is the client's. Do not start the application here, just record what each one needs and hand it over. |
| 5 | **UAE directories**: Yellow Pages UAE, Connect.ae, Dubai-focused activity directories | Low individual value, real cumulative value, and cheap. Only after 1 to 3. |

## 4b. The Google Business Profile, audited 18 Sep 2026

Viewed publicly at the Place ID in `settings.json`. Much of it is already good: address, phone,
website, 24-hour opening, owner posts (most recent four days old and well written), photos, and
ten bookable products with instant confirmation. The problems are specific.

### The profile is not called Buggy Rents

The business name on the profile reads:

> Dune Buggy Rental Dubai- ATV Quad Bike Rental Dubai-can-Am maverick Buggy Rental Dubai-Dirt Bike Dubai Raptor 700cc

**This is the single most important finding in this document.** Two separate problems.

It breaks Google's business name guideline, which requires the real-world name. Profiles are
suspended for this, and a suspension takes the 41 reviews with it. The honest other side, which
should be said rather than hidden: **stuffed names do often work in the short term**, which is
why so many operators in this market use them, and renaming usually costs some map visibility
for a few weeks. So this is a judgement call with a real cost either way, not a rule to recite.

The second problem has no upside at all and is the reason to act. **Every other line in this
document assumes the entity is called "Buggy Rents".** The site says Buggy Rents, `sameAs` now
points at this profile, and §5 tells the team to use that exact name on every listing. Right now
the highest-authority profile the business owns is telling Google the company is called
something else entirely. Citations built against a name the map profile does not carry are
weaker than they look, and that is the whole mechanism this document exists to strengthen.

~~Recommended: rename to Buggy Rents.~~ **Decided 19 Sep 2026: the existing profile keeps its
name, and every NEW listing created from here uses `Buggy Rents`.** That is a defensible
middle: the 41 reviews are not put at risk, and the citation set being built now is at least
internally consistent with the website.

What it costs, recorded so the monthly report can read it honestly: the strongest profile the
business owns still carries a different name from every new citation, so the entity Google
assembles stays split between the two for as long as that is true. If the buggy cluster stalls
in the low twenties despite the citation work, this is the first thing to look at again.

### The plus code resolves to Sharjah

The address line reads Dubai correctly. The plus code Google prints underneath it is
`5J3P+82 Sharjah`. Al Awir sits near the border, so this may be nothing, but the pin is what
local ranking uses for "in Dubai" searches and this is worth ten minutes in the dashboard to
confirm it sits on the Dubai side.

### Three smaller ones

**Categories.** Primary is `ATV rental service` and it should stay. Add exactly three
secondaries, no more, because a secondary that does not describe a real service dilutes the
primary rather than adding reach:

| Category | Covers |
|---|---|
| `Adventure sports center` | The buggy and quad fleet as an activity rather than a rental counter |
| `Tour operator` | The twelve safari packages, and the guided nature of every session |
| `Motorcycle rental agency` | The KTM 450, which none of the above describes |

Deliberately not added: `Sightseeing tour agency` and `Tour agency`, both of which describe a
reseller. This business owns its vehicles and runs its own base, and filing it beside agencies
invites exactly the comparison §5 warns about.

**Products.** Ten bookable options are listed against twenty-nine sellable things on the site.
**Answered 19 Sep: the booking integration points at the website itself, not at an OTA**, so
§2 stands and there is no hidden listing. Worth widening the ten to cover the buggy and safari
range, since these appear directly in the map profile where a booking decision often ends.

**The website link was untagged. Tagged 19 Sep 2026.** Left here because the reasoning is what
the monthly report needs.

 GA4 shows Direct as the
largest channel on this site by a distance. Map-profile clicks land in Direct unless the link
carries campaign tags, so a real share of what currently reads as "Direct" is almost certainly
this profile, uncredited. Change the website field to:

```
https://buggyrents.com/?utm_source=google-maps&utm_medium=referral&utm_campaign=gbp
```

That single edit makes the profile's contribution visible in the monthly report instead of
invisible inside Direct. It costs nothing and it is the fastest measurement win left.

---

## 5. The NAP block. Copy this exactly, everywhere.

The single biggest risk in this market is name collision. Searching for this brand returns
`Dune Buggy Rentals`, `Desert Buggy rental`, `Dunes Buggy Rental`, `Dune Buggy Dubai Rental`
and `Buggy Rental Dxb`, all in Dubai, all different companies. **An inconsistent listing does
not merely fail to help, it merges this business into that crowd.**

```
Name     Buggy Rents
Street   Dubai-Hatta Rd
Area     Al Awir Second
City     Dubai
Country  United Arab Emirates
Phone    +971 56 209 5713
Site     https://buggyrents.com
Coords   25.153303, 55.635006
Hours    Open 24 hours, 7 days
```

Rules that matter more than they look:

- **"Buggy Rents". Two words, no "Dubai", no "Rentals", no "LLC".** Whatever the trade licence
  eventually says, the listing name matches the site or the citation is worth nothing.
- **One phone number, written `+971 56 209 5713`.** Not `056`, not `00971`.
- The website link always goes to the **homepage**, never a deep page, and always `https` with
  no trailing path.
- If a platform demands a category, the closest true one is an **ATV rental or off-road
  adventure operator**, not a tour agency. This business owns its vehicles and runs its own
  base, and categorising it as an agency invites comparison with resellers.

**Email: decided 18 Sep 2026, `Buggyrents@gmail.com` stays, everywhere.** A domain address
was proposed and the agency ruled against changing it. That decision is fine and the reason it
is fine is worth stating, because someone will raise it again: for citations, **consistency
beats prestige.** One address used identically on every listing is a working NAP signal. An
address that is `hello@buggyrents.com` on four platforms and Gmail on six is not. Use the Gmail
address on every listing, spelled exactly as above, and do not revisit this.

## 6. What not to do

Paid links, mass directory submissions, and anything offering "500 citations". This is a local
service business in a market full of near-identical brands, and the value of a citation here
comes from being correct and corroborating, not from volume. Ten exact listings beat two
hundred approximate ones, and the approximate ones actively hurt, because every wrong variant
of the name makes the entity harder for Google to resolve.

## 7. How this gets measured

Nothing here has a ranking metric of its own, which is why it gets dropped. Measure it as
completion instead, reported in the monthly client report:

- Items 1 to 5 in §4, done or not done, with dates.
- Bing: is the current homepage title being served in Bing results. That is a yes or no check
  and it is the fastest proof item 1 worked.
- Whether the buggy cluster average position crosses **20**. On-page work has taken it from
  39.5 to roughly 25 and it will stall somewhere in the low twenties without this work. If it
  stalls, that is the evidence, not an opinion.
