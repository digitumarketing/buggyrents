# BuggyRents — GTM container build sheet

Container `GTM-PP58RGD2`. GA4 property `G-HKVDWC923V`.

**Every tag on this site lives in this container.** GA4 was removed from `Base.astro` on
5 Sep 2026 at the client's direction. `CLAUDE.md` launch item 2 records that reversal, what
it cost and the two build guards that replaced the one given up. Read it before changing
anything here.

**This file describes the container. It is not the container.** The container lives on
Google's servers, it can be edited without touching this repo, and nothing in the build can
read it. When the two disagree, the container is what is running and this file is what is
wrong. Fix this file.

---

## 0. The contract between the site and the container

This is the part that must not drift. The site pushes three events to the dataLayer, from
one delegated listener in `src/layouts/Base.astro`. Everything below is built on these
names, so renaming one in code without renaming it here silently stops a lead being counted.

```js
window.dataLayer.push({
  event:        'whatsapp_click' | 'call_click' | 'generate_lead',
  lead_page:    '/dune-buggy-dubai/',   // location.pathname
  lead_cluster: 'buggy' | 'quad' | 'dirtbike' | 'safari' | 'other',
  lead_method:  'link' | 'whatsapp_form' | 'email_form'
});
```

`lead_cluster` is resolved at build time from `src/data/clusters.ts`, so a lead can be
attributed to a service without maintaining a second list of URL prefixes in GTM.

`lead_method` says how the enquiry started. `link` is any WhatsApp or phone link anywhere on
the site. `whatsapp_form` and `email_form` are the two buttons on the contact page, which
report themselves because the WhatsApp one opens a window rather than following a link and
no click handler can see it.

The build fails if any of this goes missing from the built HTML. It cannot check that the
container still listens for it.

---

## 1. Variables

Create three **Data Layer Variables** under Variables, User-Defined, New, Data Layer
Variable. Version 2, no default value.

| Variable name | Data layer variable name |
|---|---|
| `DLV - lead_page` | `lead_page` |
| `DLV - lead_cluster` | `lead_cluster` |
| `DLV - lead_method` | `lead_method` |

Then create one **Constant** so the measurement ID is written once in the container:

| Variable name | Type | Value |
|---|---|---|
| `CONST - GA4 Measurement ID` | Constant | `G-HKVDWC923V` |

Every GA4 tag below references the constant. Do not type the ID into a tag. This is the
same rule the repo follows for prices and audit counts, and for the same reason.

While you are in Variables, tick the built-in ones you will want later: **Page Path**,
**Page URL**, **Referrer**, **Click URL**, **Click Text**, **Event**.

---

## 2. Triggers

Three **Custom Event** triggers, under Triggers, New, Custom Event. Event name must match
exactly, all events, no filters.

| Trigger name | Event name |
|---|---|
| `CE - whatsapp_click` | `whatsapp_click` |
| `CE - call_click` | `call_click` |
| `CE - generate_lead` | `generate_lead` |

---

## 3. The GA4 configuration tag

Tags, New, **Google Tag**.

- Tag ID: `{{CONST - GA4 Measurement ID}}`
- Trigger: **Initialization - All Pages**, not All Pages

Use Initialization rather than All Pages so the Google tag is guaranteed to load before any
event tag can fire on the same page view. With All Pages, a fast click can fire an event
tag before the tag that configures the property, and that event is dropped.

Nothing else goes in this tag. Do not add a second one. One property configured twice is the
bug that doubled every figure in the client's reports from 3 to 4 September 2026.

---

## 4. The three lead event tags

Tags, New, **Google Analytics: GA4 Event**, one per trigger. All three take the same shape.

- Measurement ID: `{{CONST - GA4 Measurement ID}}`
- Event Name: `whatsapp_click`, `call_click`, `generate_lead` respectively
- Event Parameters:

| Parameter name | Value |
|---|---|
| `lead_page` | `{{DLV - lead_page}}` |
| `lead_cluster` | `{{DLV - lead_cluster}}` |
| `lead_method` | `{{DLV - lead_method}}` |

Keep the GA4 event name identical to the dataLayer event name. Two names for one thing is
how a report ends up counting neither.

---

## 5. GA4 property settings, done in GA4 and not in GTM

**Register the parameters, or the reports will be empty.** Admin, Custom definitions, Create
custom dimension. Three of them, scope Event:

| Dimension name | Event parameter |
|---|---|
| Lead page | `lead_page` |
| Lead cluster | `lead_cluster` |
| Lead method | `lead_method` |

A parameter that is not registered is collected but cannot be used in a report, and it is
not backfilled: a dimension created in October shows nothing for September. Do this on the
same day as the first publish.

**Mark the key events.** Admin, Events, Key events, and mark all three of `whatsapp_click`,
`call_click` and `generate_lead`. An event only appears here after it has fired at least
once, so publish first, click each button on the live site, then come back.

**Leave Enhanced Measurement on**, in Admin, Data streams, the web stream, Enhanced
measurement. It gives scrolls, outbound clicks, file downloads and site search for free.

One thing to know about it: an outbound click on a `wa.me` link fires GA4's own `click`
event as well as our `whatsapp_click`. They are different event names so nothing is
double-counted, but the monthly report must use `whatsapp_click` and ignore `click`, or the
WhatsApp number will look roughly twice what it is.

**Link Google Ads and Search Console** while in Admin, Product links. The Search Console
link is what lets you see landing page and query data next to the lead numbers, which is
most of the monthly report in one screen.

---

## 6. Counting leads honestly

The target in `docs/SEO-PLAN.md` is five organic converted leads a month, and a lead there is
**an organic session that produced at least one enquiry**, not an enquiry event.

In GA4 that is the **Sessions with key event** metric, filtered to Session default channel
group = Organic Search, not the event count. A visitor who taps WhatsApp, comes back and
calls is one lead. Reporting the event count instead inflates the number by roughly a third
on this kind of site, and it is the first thing a client checks when the leads on the report
do not match the messages in their phone.

---

## 7. Other tags, in the order they are worth adding

**Google Ads conversion tracking.** Add the Google Ads Conversion Linker tag on All Pages
first: without it, conversions are attributed badly once a click passes through the ad
redirect. Then import the three key events from GA4 into Google Ads as conversions rather
than building separate Ads conversion tags. One definition, two products, no drift.

**Meta pixel**, if the client runs Meta ads. Base code on All Pages, then a `Lead` standard
event on the same three custom event triggers already built above. TikTok and Snap follow the
same shape and reuse the triggers, which is the whole reason for consolidating in a container.

**Consent Mode v2.** Worth doing, not worth doing in the first publish. This business takes
UK and European visitors, so consent signals affect both Ads and GA4 modelling. Set it up
after the lead numbers are confirmed working, so that if something stops reporting you know
which change caused it.

**Server-side GTM.** Out of scope. Revisit only if ad blockers are visibly eating the numbers.

---

## 8. Publish, then prove it

1. **Preview** in GTM, open the live site in the tab it launches.
2. Click the floating WhatsApp button. Tag Assistant should show the `whatsapp_click`
   dataLayer event, the trigger firing, and the GA4 event tag with all three parameters
   populated. A blank parameter here means the variable name does not match section 0.
3. Click the floating call button. Same check for `call_click`.
4. Submit the contact form both ways. `generate_lead` with `lead_method` of
   `whatsapp_form` and then `email_form`.
5. Open **GA4 Realtime** alongside and confirm the events arrive. Tag Assistant shows the
   tag fired; only Realtime shows GA4 received it.
6. **Publish**, with a version name that says what changed.
7. Come back the next day and check the events are still arriving. Confirm exactly one GA4
   property in the container, and no second Google tag.

---

## 9. What breaks this, and what will not tell you

**Nothing in the build can see inside the container.** Deleting the GA4 tag stops all
measurement and every audit stays green. The site keeps serving, the reports keep arriving,
and they read zero. Check Realtime after every container publish, not just the first.

**Do not paste a Google-supplied GA4 or GTM snippet into the head or body code fields in
Site settings.** That is how the container was loaded twice on 3 September 2026 and how the
property was configured twice the day after. The analytics audit now fails the build on a
GA4 property in the HTML, so a paste will stop the deploy rather than corrupt the data,
which is the right way round but is still an outage.

**Do not change the GTM ID field in Site settings without changing
`src/data/site.ts`.** The code holds a fallback container id for the case where the client
clears the field. The CMS value wins whenever it is set, so a stale fallback only surfaces
later, when the field is empty and the wrong container quietly answers.

**If a lead event name changes in code, change it here in the same commit.** The build
checks the events exist in the page. It has no idea whether anything is listening.
