import { config, collection, singleton, fields } from '@keystatic/core';

/* Badge and blurb used to be looked up in code from a hardcoded table keyed by the
   duration label ("30 minutes", "1 hour", …). That worked for the durations we
   shipped and failed the moment the client added one: a new "2 Hour" row matched
   no key, so the card on the tour page rendered the fallback badge "Option" above
   an empty paragraph. The copy belongs with the price it describes, so it is now
   entered in the CMS alongside it and the card can never be half-built again. */
const durationField = fields.array(
  fields.object({
    label:   fields.text({ label: 'Duration label', description: 'Exactly as it should read on the page, e.g. "2 hours".', defaultValue: '30 minutes' }),
    minutes: fields.integer({ label: 'Minutes', defaultValue: 30 }),
    price:   fields.integer({ label: 'Price (AED)', defaultValue: 0 }),
    badge:   fields.text({ label: 'Card badge', description: 'Short tag above the duration, e.g. "Entry ride", "Most balanced".', defaultValue: '' }),
    blurb:   fields.text({ label: 'Card description', description: 'One or two sentences on who this duration suits. Shown under the badge.', multiline: true, defaultValue: '' })
  }),
  { label: 'Durations & prices', itemLabel: p => `${p.fields.label.value} — AED ${p.fields.price.value}` }
);

const vehicle = (label: string, path: string) =>
  collection({
    label,
    slugField: 'name',
    path: `src/content/${path}/*`,
    format: { data: 'json' },
    schema: {
      name:      fields.slug({ name: { label: 'Name' } }),
      shortName: fields.text({ label: 'Short name' }),
      engine:    fields.text({ label: 'Engine' }),
      seats:     fields.integer({ label: 'Seats', defaultValue: 2 }),
      minAge:    fields.integer({ label: 'Minimum age', defaultValue: 18 }),
      area:      fields.text({ label: 'Riding area' }),
      image:     fields.text({ label: 'Image path' }),
      /* Optional. Left blank, the page falls back to the shared hero for its
         category, which is why all eleven buggy pages currently open with the same
         photo. There is exactly one buggy hero in the library at a usable size, so
         this cannot be fixed in code: it needs landscape photography at 2000px or
         wider, one per machine. The field is here so that the day those arrive the
         client can assign them without a developer. */
      heroImage: fields.text({ label: 'Hero image path (optional)', description: 'Leave blank to use the category hero. Needs to be at least 1600px wide.', defaultValue: '' }),
      blurb:     fields.text({ label: 'Short description', multiline: true }),
      durations: durationField,
      featured:  fields.checkbox({ label: 'Show on homepage', defaultValue: false }),
      /* JSON has no inherent order. Without this the fleet re-sorts alphabetically
         on every build and the cheapest machine stops being first on the page. */
      order:     fields.integer({ label: 'Display order', defaultValue: 99 })
    }
  });

export default config({
  /* GitHub mode, not local. In local mode the CMS only ever runs on one laptop and
     writes to that machine's disk, which is why nothing the client did would have
     reached the site. In GitHub mode every save is a commit to the repo, Cloudflare
     rebuilds, and the change is live in about two minutes.

     The nine build audits still apply, because they run on the built HTML rather
     than the source. A CMS edit that breaks a rule fails the deploy and the live
     site keeps serving the previous version. That is the safe outcome, but it is
     silent, so see CLIENT-GUIDE.md for what each failure means. */
  storage: {
    kind: 'github',
    repo: { owner: 'digitumarketing', name: 'buggyrents' }
  },
  ui: { brand: { name: 'Buggy Rents' } },
  collections: {
    buggies:   vehicle('Dune buggies', 'buggies'),
    quads:     vehicle('Quad bikes', 'quads'),
    dirtbikes: vehicle('Dirt bikes', 'dirtbikes'),
    safari: collection({
      label: 'Desert safari packages',
      slugField: 'name',
      path: 'src/content/safari/*',
      format: { data: 'json' },
      schema: {
        name:     fields.slug({ name: { label: 'Package name' } }),
        group:    fields.select({
          label: 'Type',
          description: 'Shared packages are priced per person. Private packages are priced per vehicle.',
          options: [
            { label: 'Shared 4x4', value: 'shared' },
            { label: 'Private', value: 'private' }
          ],
          defaultValue: 'shared'
        }),
        vehicle:  fields.text({ label: 'Vehicle' }),
        capacity: fields.text({ label: 'Capacity' }),
        duration: fields.text({ label: 'Duration' }),
        priceLabel: fields.text({
          label: 'Price basis',
          description: 'Printed on every card. "Per person" or "Private Land Cruiser". Getting this wrong shows a group a per person price as if it were the total.',
          defaultValue: 'Per person'
        }),
        price:    fields.integer({ label: 'Price (AED)', defaultValue: 0 }),
        was:      fields.integer({ label: 'Former price (AED), optional' }),
        image:    fields.text({ label: 'Image key' }),
        blurb:    fields.text({ label: 'Short description', multiline: true }),
        includes: fields.array(fields.text({ label: 'Item' }), {
          label: 'What is included', itemLabel: p => p.value
        }),
        featured: fields.checkbox({ label: 'Feature this package', defaultValue: false }),
        order:    fields.integer({ label: 'Display order', defaultValue: 99 })
      }
    }),
    /* Blog articles.
       The only collection that is Markdoc rather than JSON, because it is the only
       one the client actually WRITES rather than fills in: headings, bold, links,
       lists and tables in an editor instead of HTML typed into a textarea.
       Everything that feeds structured data (the FAQ pairs) stays as fields, since
       Google needs question and answer separately and prose cannot be split back
       apart reliably. */
    posts: collection({
      label: 'Blog articles',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'body' },
      entryLayout: 'content',
      columns: ['title', 'date'],
      schema: {
        title:   fields.slug({
          name: { label: 'Title', description: 'Also the h1. Put the target keyword in it, in natural language.' },
          slug: { label: 'URL slug', description: 'Changing this breaks any link to the old address. Leave it alone once published.' }
        }),
        excerpt: fields.text({ label: 'Excerpt', description: 'Used as the meta description and on the guide cards. Aim for 150 to 160 characters.', multiline: true }),
        date:    fields.text({ label: 'Date', description: 'YYYY-MM-DD.', defaultValue: '' }),
        category: fields.select({
          label: 'Topic',
          options: [
            { label: 'Dune buggy', value: 'buggy' },
            { label: 'Quad bike', value: 'quad' },
            { label: 'Desert safari', value: 'safari' },
            { label: 'Planning', value: 'planning' }
          ],
          defaultValue: 'planning'
        }),
        /* Separate from the topic on purpose: an article filed under Planning can
           still be illustrated with buggy photos. img() checks this at build time,
           so a quad article can never show a buggy by accident. */
        subject: fields.select({
          label: 'Photo subject',
          description: 'Which part of the library the images must come from. The build fails if an image does not match.',
          options: [
            { label: 'Dune buggy', value: 'buggy' },
            { label: 'Quad bike', value: 'quad' },
            { label: 'Dirt bike', value: 'dirtbike' },
            { label: 'Desert safari', value: 'safari' }
          ],
          defaultValue: 'buggy'
        }),
        heroImage:  fields.text({ label: 'Hero image key' }),
        image:      fields.text({ label: 'Card and article image key' }),
        finalImage: fields.text({ label: 'Closing CTA image key' }),
        keyword:    fields.text({ label: 'Target keyword', description: 'Never shown on the page. It is here so you can see what this article is meant to rank for before rewriting the title.' }),
        intro:      fields.text({ label: 'Opening paragraph', description: 'Sits above Key takeaways.', multiline: true }),
        takeaways:  fields.array(fields.text({ label: 'Takeaway' }), {
          label: 'Key takeaways', itemLabel: p => p.value
        }),
        body: fields.markdoc({ label: 'Article body' }),
        faqs: fields.array(
          fields.object({
            q: fields.text({ label: 'Question' }),
            a: fields.text({ label: 'Answer', multiline: true })
          }),
          { label: 'Frequently asked questions', itemLabel: p => p.fields.q.value }
        ),
        closing:       fields.text({ label: 'Closing line', description: 'Last paragraph of the article. HTML links are allowed here.', multiline: true }),
        helpTitle:     fields.text({ label: 'Help panel heading' }),
        helpText:      fields.text({ label: 'Help panel text', multiline: true }),
        helpMessage:   fields.text({ label: 'Help panel WhatsApp message', multiline: true }),
        helpHref:      fields.text({ label: 'Help panel link URL' }),
        helpLinkLabel: fields.text({ label: 'Help panel link text' }),
        finalH2:       fields.text({ label: 'Final CTA heading' }),
        finalLede:     fields.text({ label: 'Final CTA text', multiline: true })
      }
    }),
    faqs: collection({
      label: 'FAQs',
      slugField: 'question',
      path: 'src/content/faqs/*',
      format: { data: 'json' },
      schema: {
        question: fields.slug({ name: { label: 'Question' } }),
        answer:   fields.text({ label: 'Answer', multiline: true }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Dune buggy', value: 'buggy' },
            { label: 'Quad bike', value: 'quad' },
            { label: 'Dirt bike', value: 'dirtbike' },
            { label: 'General', value: 'general' }
          ],
          defaultValue: 'general'
        })
      }
    }),

    /* The three category pillar pages: dune buggy, quad bike, KTM dirt bike.
       Every hand-written word on those pages lives here. The fleet list and the
       hero image do not: they are wired from the category in code, because a
       client editing a copy of the fleet would be maintaining it twice.

       Prices in this copy are written as {buggyFrom}, {quadFrom}, {dirtbikeFrom},
       {rating} and {reviewCount}. The build fills them in from the real data, so a
       headline stays editable without its number going stale. A token that is
       misspelled fails the build rather than printing onto the page. */
    pillars: collection({
      label: 'Category pages',
      slugField: 'crumb',
      path: 'src/content/pillars/*',
      format: { data: 'json' },
      columns: ['crumb'],
      schema: {
        crumb: fields.slug({
          name: { label: 'Breadcrumb name', description: 'Shown in the breadcrumb trail, e.g. "Dune Buggy Dubai".' },
          slug: { label: 'URL slug', description: 'Must stay as it is. These are the highest-ranking pages on the site.' }
        }),
        category: fields.select({
          label: 'Fleet shown on this page',
          description: 'Decides which vehicles and which hero image the page uses.',
          options: [
            { label: 'Dune buggies', value: 'buggy' },
            { label: 'Quad bikes', value: 'quad' },
            { label: 'Dirt bikes', value: 'dirtbike' }
          ],
          defaultValue: 'buggy'
        }),

        title:       fields.text({ label: 'Search result title', description: 'Aim for 60 characters or fewer. The build warns if it will be truncated.' }),
        description: fields.text({ label: 'Search result description', description: 'Aim for 160 characters or fewer.', multiline: true }),
        eyebrow:     fields.text({ label: 'Hero eyebrow' }),
        h1:          fields.text({ label: 'H1' }),
        subhead:     fields.text({ label: 'Hero subheading', multiline: true }),
        lede:        fields.text({ label: 'Hero paragraph', multiline: true }),
        stats: fields.array(
          fields.object({
            v: fields.text({ label: 'Value' }),
            l: fields.text({ label: 'Label' })
          }),
          { label: 'Hero stats', itemLabel: p => `${p.fields.v.value} — ${p.fields.l.value}` }
        ),

        fleetKicker: fields.text({ label: 'Fleet section kicker' }),
        fleetH2:     fields.text({ label: 'Fleet section heading' }),
        fleetLede:   fields.text({ label: 'Fleet section intro', multiline: true }),

        uspKicker: fields.text({ label: 'Selling points kicker' }),
        uspH2:     fields.text({ label: 'Selling points heading' }),
        uspLede:   fields.text({ label: 'Selling points intro', multiline: true }),
        usps: fields.array(
          fields.object({
            h: fields.text({ label: 'Heading' }),
            p: fields.text({ label: 'Text', multiline: true })
          }),
          { label: 'Selling points', itemLabel: p => p.fields.h.value }
        ),

        flowKicker: fields.text({ label: 'Tour flow kicker' }),
        flowH2:     fields.text({ label: 'Tour flow heading' }),
        flowLede:   fields.text({ label: 'Tour flow intro', multiline: true }),
        steps: fields.array(
          fields.object({
            label: fields.text({ label: 'Step label' }),
            h:     fields.text({ label: 'Heading' }),
            p:     fields.text({ label: 'Text', multiline: true })
          }),
          { label: 'Tour flow steps', itemLabel: p => p.fields.h.value }
        ),

        faqKicker: fields.text({ label: 'FAQ kicker' }),
        faqH2:     fields.text({ label: 'FAQ heading' }),
        faqLede:   fields.text({ label: 'FAQ intro', multiline: true }),
        faqs: fields.array(
          fields.object({
            q: fields.text({ label: 'Question' }),
            a: fields.text({ label: 'Answer', multiline: true })
          }),
          { label: 'FAQ', description: 'These also feed the FAQ rich result in Google, so keep answers self-contained.', itemLabel: p => p.fields.q.value }
        ),

        lfKicker:  fields.text({ label: 'Guide kicker' }),
        lfHeading: fields.text({ label: 'Guide heading' }),
        lfIntro:   fields.text({ label: 'Guide intro', description: 'HTML is allowed here.', multiline: true }),
        lfBlocks: fields.array(
          fields.object({
            h:    fields.text({ label: 'Heading' }),
            html: fields.text({ label: 'HTML', description: 'Paragraphs, lists and links. Class names such as lf-lead and pill are styled by the template.', multiline: true })
          }),
          { label: 'Guide sections', itemLabel: p => p.fields.h.value }
        ),

        relKicker: fields.text({ label: 'Cross-sell kicker' }),
        relH2:     fields.text({ label: 'Cross-sell heading' }),
        relLede:   fields.text({ label: 'Cross-sell intro', multiline: true }),
        related: fields.array(
          fields.object({
            tag:   fields.text({ label: 'Tag' }),
            title: fields.text({ label: 'Title' }),
            desc:  fields.text({ label: 'Description', multiline: true }),
            href:  fields.text({ label: 'Link' }),
            img:   fields.text({ label: 'Image key' })
          }),
          { label: 'Cross-sell cards', itemLabel: p => p.fields.title.value }
        )
      }
    }),

    /* Seven policy and information pages, and the three About / FAQ pages.
       Both use a shared field set because both templates take the same shape: hero,
       trust strip, intro, cards, checks, steps, optional long-form guide, FAQ,
       related links, final CTA.

       Two fields are structural rather than copy and must not be edited:
       - "export" is the name the code looks the page up by. Change it and the page
         disappears from the build.
       - "path" is the URL. Change it and every link to the page breaks, along with
         whatever ranking it has.
       They are visible rather than hidden so nobody wonders where the URL is set. */
    support: collection({
      label: 'Policy and info pages',
      slugField: 'short',
      path: 'src/content/support/*',
      format: { data: 'json' },
      columns: ['short', 'path'],
      schema: supportSchema()
    }),

    about: collection({
      label: 'About and FAQ pages',
      slugField: 'short',
      path: 'src/content/about/*',
      format: { data: 'json' },
      columns: ['short', 'path'],
      schema: {
        ...supportSchema(),
        reviewsKicker: fields.text({ label: 'Reviews section kicker' }),
        reviewsH2:     fields.text({ label: 'Reviews section heading' }),
        reviewsLede:   fields.text({ label: 'Reviews section intro', multiline: true }),
        askKicker:     fields.text({ label: 'Contact section kicker' }),
        askH2:         fields.text({ label: 'Contact section heading' }),
        askLede:       fields.text({ label: 'Contact section intro', multiline: true }),
        askCards: fields.array(
          fields.object({
            tag:   fields.text({ label: 'Channel' }),
            value: fields.text({ label: 'Value' }),
            note:  fields.text({ label: 'Note', multiline: true }),
            href:  fields.text({ label: 'Link' })
          }),
          { label: 'Contact cards', itemLabel: p => p.fields.tag.value }
        ),
        bentoKicker: fields.text({ label: 'Question picker kicker' }),
        bentoH2:     fields.text({ label: 'Question picker heading' }),
        bentoLede:   fields.text({ label: 'Question picker intro', multiline: true }),
        bento: fields.array(
          fields.object({
            tag:     fields.text({ label: 'Tag' }),
            h:       fields.text({ label: 'Heading' }),
            p:       fields.text({ label: 'Text', multiline: true }),
            feature: fields.checkbox({ label: 'Make this tile large', defaultValue: false })
          }),
          { label: 'Question tiles', itemLabel: p => p.fields.h.value }
        ),
        handledKicker: fields.text({ label: 'What is handled kicker' }),
        handledH2:     fields.text({ label: 'What is handled heading' }),
        handledLede:   fields.text({ label: 'What is handled intro', multiline: true }),
        handledList: fields.array(
          fields.object({
            h: fields.text({ label: 'Group heading' }),
            items: fields.array(fields.text({ label: 'Item' }), { label: 'Items', itemLabel: p => p.value })
          }),
          { label: 'What is handled', itemLabel: p => p.fields.h.value }
        ),
        minis: fields.array(
          fields.object({
            n: fields.text({ label: 'Number or figure' }),
            h: fields.text({ label: 'Heading' }),
            p: fields.text({ label: 'Text', multiline: true })
          }),
          { label: 'Intro mini cards', itemLabel: p => p.fields.h.value }
        )
      }
    }),

    /* Ten pickup-route pages, one entry each. Only what is genuinely specific to
       the place lives here. The sentences that appear on all ten are built in code
       from these four values, so correcting a shared line is one edit rather than
       ten, and the pages cannot drift apart over time. */
    locations: collection({
      label: 'Location pages',
      slugField: 'name',
      path: 'src/content/locations/*',
      format: { data: 'json' },
      columns: ['name', 'drive'],
      schema: {
        name:    fields.slug({
          name: { label: 'Page name', description: 'Used in the title tag and the breadcrumb.' },
          slug: { label: 'URL slug', description: 'Changing this breaks every link to the page and its Google ranking. Leave it alone once published.' }
        }),
        short:   fields.text({ label: 'Short name', description: 'The place on its own, e.g. "Dubai Marina". It is dropped into roughly thirty sentences across the page, so keep it short and natural.' }),
        emirate: fields.text({ label: 'Emirate', description: 'Exactly "Dubai" for free pickup. Anything else makes the page say the transfer is quoted, so a typo here changes what the page promises.' }),
        drive:   fields.text({ label: 'Drive time', description: 'e.g. "40-55 min". Printed in the stats strip, the FAQ and the guide.' }),
        intro:   fields.text({ label: 'Opening paragraph', multiline: true }),
        keywords: fields.array(fields.text({ label: 'Keyword' }), {
          label: 'Target keywords', description: 'Never shown on the page. They record what this page is meant to rank for.', itemLabel: p => p.value
        }),
        order:   fields.integer({ label: 'Display order', defaultValue: 99 })
      }
    }),

    /* Eight "who the ride is for" pages. Same split as the location pages. */
    audiences: collection({
      label: 'Audience pages',
      slugField: 'name',
      path: 'src/content/audiences/*',
      format: { data: 'json' },
      columns: ['name', 'pitch'],
      schema: {
        name:  fields.slug({
          name: { label: 'Page name' },
          slug: { label: 'URL slug', description: 'Changing this breaks every link to the page. Leave it alone once published.' }
        }),
        short: fields.text({ label: 'Short name', description: 'e.g. "Families". Used in the hero eyebrow.' }),
        pitch: fields.text({ label: 'One-line pitch', description: 'Shown beside the heading, e.g. "One 4-seater keeps everyone together".' }),
        vehicles: fields.text({ label: 'Recommended vehicles', description: 'e.g. "4-seater buggy - kids quad from age 6".' }),
        intro: fields.text({ label: 'Opening paragraph', multiline: true }),
        keywords: fields.array(fields.text({ label: 'Keyword' }), {
          label: 'Target keywords', description: 'Never shown on the page.', itemLabel: p => p.value
        }),
        order: fields.integer({ label: 'Display order', defaultValue: 99 })
      }
    }),

    /* Reviews are a collection rather than one long field because they arrive one
       at a time. This gives an "add review" button instead of a wall of text, and
       a single review can be removed if a guest asks for it to come down.
       The 4.9 rating and the review count live in Site settings, since they
       describe the Google profile as a whole. */
    reviews: collection({
      label: 'Google reviews',
      slugField: 'author',
      path: 'src/content/reviews/*',
      format: { data: 'json' },
      columns: ['author', 'rating'],
      schema: {
        author: fields.slug({ name: { label: 'Guest name', description: 'Exactly as it appears on Google. Never invent a name.' } }),
        rating: fields.integer({ label: 'Stars', description: 'Only 5-star reviews with text are shown in the slider.', defaultValue: 5 }),
        text:   fields.text({ label: 'Review text', multiline: true }),
        order:  fields.integer({ label: 'Display order', defaultValue: 99 })
      }
    })
  },
  singletons: {
    /* Flat on purpose. Keystatic renders a flat object as a plain list of labelled
       inputs; nested objects become collapsible panels that hide the one field the
       client came here to change. site.ts rebuilds the nested shape in code. */
    settings: singleton({
      label: 'Site settings',
      path: 'src/content/settings',
      format: { data: 'json' },
      schema: {
        name:      fields.text({ label: 'Business name' }),
        legalName: fields.text({ label: 'Legal name', description: 'Used in the copyright line.' }),
        domain:    fields.text({ label: 'Domain', description: 'With https and no trailing slash. Every canonical URL and schema link is built from this. Changing it wrongly breaks all of them.' }),
        tagline:   fields.text({ label: 'Tagline', multiline: true }),

        phone:     fields.text({ label: 'Phone, as displayed' }),
        phoneRaw:  fields.text({ label: 'Phone, for tel: links', description: 'No spaces, e.g. +971562095713.' }),
        whatsapp:  fields.text({ label: 'WhatsApp number', description: 'Digits only, no plus, e.g. 971562095713.' }),
        email:     fields.text({ label: 'Email' }),

        addressStreet:   fields.text({ label: 'Street' }),
        addressDistrict: fields.text({ label: 'District' }),
        addressCity:     fields.text({ label: 'City' }),
        addressCountry:  fields.text({ label: 'Country code', description: 'Two letters, e.g. AE. Goes into schema, not onto the page.' }),
        addressFull:     fields.text({ label: 'Full address, as displayed' }),

        mapsPlaceId: fields.text({ label: 'Google Place ID' }),
        mapsLink:    fields.text({ label: 'Google Business Profile link', description: 'The address links here from the footer and the contact page. It is where guests leave the reviews that feed the rating below.' }),
        mapsEmbed:   fields.text({ label: 'Google Maps embed URL' }),

        hoursOpens:  fields.text({ label: 'Opens', description: '24-hour time, e.g. 00:00.' }),
        hoursCloses: fields.text({ label: 'Closes', description: '24-hour time, e.g. 23:59.' }),
        hoursLabel:  fields.text({ label: 'Hours, as displayed' }),

        lat: fields.number({ label: 'Latitude' }),
        lng: fields.number({ label: 'Longitude' }),

        guides:       fields.text({ label: 'Number of guides', description: 'e.g. 50+' }),
        fleetSize:    fields.text({ label: 'Fleet size', description: 'e.g. 70+' }),
        founded:      fields.integer({ label: 'Year founded' }),
        guestsServed: fields.text({ label: 'Guests served', description: 'e.g. 17K+' }),

        /* Deliberately empty. The client confirmed on 8 Aug 2026 that no number
           exists yet. Leave it blank rather than typing anything that looks like
           one: it appears on Terms, About, the footer and in schema. */
        tradeLicence: fields.text({ label: 'Trade licence number', description: 'Leave blank until you hold a real number. Never enter a placeholder.' }),

        /* Feeds schema sameAs, which is how Google ties this site, the Google
           Business Profile and the social accounts into one entity. */
        social: fields.array(
          fields.object({
            name: fields.text({ label: 'Network' }),
            url:  fields.text({ label: 'Profile URL' })
          }),
          { label: 'Social profiles', itemLabel: p => p.fields.name.value }
        ),

        awards: fields.array(
          fields.object({
            name: fields.text({ label: 'Award' }),
            year: fields.integer({ label: 'Year' })
          }),
          { label: 'Awards', itemLabel: p => p.fields.name.value }
        ),

        agencyName: fields.text({ label: 'Agency credit name' }),
        agencyUrl:  fields.text({ label: 'Agency credit URL' }),

        /* Shown on every page beside the Google logo, so these must match what the
           profile actually says. */
        totalReviews:  fields.integer({ label: 'Google review count' }),
        averageRating: fields.number({ label: 'Google average rating' }),

        /* Analytics & verification codes. Injected on the LIVE (production) site
           only, so local dev and audit runs never land in the client's reports.
           GA4 also runs hardcoded in Base.astro; these fields cover GTM and
           anything else the client needs to paste and verify. */
        gtmId:    fields.text({ label: 'Google Tag Manager ID', description: 'e.g. GTM-XXXXXXX. Leave blank if not using GTM. Adds the GTM container (head + <noscript>) to every page.' }),
        headCode: fields.text({ label: 'Head code (analytics / verification)', description: 'Raw HTML injected into <head> on the live site: GA4 gtag, Search Console or Bing verification meta tags, Meta Pixel, etc. Paste the whole snippet. Leave blank if unused.', multiline: true }),
        bodyCode: fields.text({ label: 'Body code (after <body>)', description: 'Raw HTML injected right after the opening <body> tag, e.g. the GTM <noscript> fallback. Leave blank if unused.', multiline: true })
      }
    }),

    homepage: singleton({
      label: 'Homepage',
      path: 'src/content/homepage',
      format: { data: 'json' },
      schema: {
        trustStats: fields.array(
          fields.object({
            value:    fields.text({ label: 'Big number or phrase' }),
            label:    fields.text({ label: 'Label' }),
            sub:      fields.text({ label: 'Sub-label' }),
            verified: fields.checkbox({ label: 'Show the verified tick', defaultValue: true })
          }),
          { label: 'Trust strip', itemLabel: p => `${p.fields.value.value} — ${p.fields.label.value}` }
        ),

        buggyIntro: fields.object({
          eyebrow:    fields.text({ label: 'Eyebrow' }),
          heading:    fields.text({ label: 'Heading' }),
          sub:        fields.text({ label: 'Sub-heading' }),
          paragraphs: fields.array(fields.text({ label: 'Paragraph', multiline: true }), { label: 'Paragraphs', itemLabel: p => p.value.slice(0, 60) }),
          checklist:  fields.array(fields.text({ label: 'Point' }), { label: 'Checklist', itemLabel: p => p.value }),
          image:      fields.text({ label: 'Image key' })
        }, { label: 'Dune buggy section' }),

        quadIntro: fields.object({
          eyebrow:    fields.text({ label: 'Eyebrow' }),
          heading:    fields.text({ label: 'Heading' }),
          sub:        fields.text({ label: 'Sub-heading' }),
          paragraphs: fields.array(fields.text({ label: 'Paragraph', multiline: true }), { label: 'Paragraphs', itemLabel: p => p.value.slice(0, 60) }),
          checklist:  fields.array(fields.text({ label: 'Point' }), { label: 'Checklist', itemLabel: p => p.value }),
          image:      fields.text({ label: 'Image key' })
        }, { label: 'Quad bike section' }),

        tourStyles: fields.array(
          fields.object({
            title: fields.text({ label: 'Title' }),
            tag:   fields.text({ label: 'Tag' }),
            body:  fields.text({ label: 'Description', multiline: true })
          }),
          { label: 'Who it suits', itemLabel: p => p.fields.title.value }
        ),

        /* Feeds FAQPage schema as well as the accordion, which is why question and
           answer stay separate. */
        faqs: fields.array(
          fields.object({
            q: fields.text({ label: 'Question' }),
            a: fields.text({ label: 'Answer', multiline: true })
          }),
          { label: 'Homepage FAQ', itemLabel: p => p.fields.q.value }
        ),

        longFormHeading: fields.text({ label: 'Long-form reader heading' }),
        longFormBlocks: fields.array(
          fields.object({
            h: fields.text({ label: 'Heading' }),
            p: fields.text({ label: 'Paragraph', multiline: true })
          }),
          { label: 'Long-form reader blocks', itemLabel: p => p.fields.h.value }
        )
      }
    }),

    /* One line changed here appears in a dozen places across the support pages, the
       location pages, the tour pages and the FAQ answers. That is the point: the
       cancellation window is written once, not remembered on eleven pages. */
    policies: singleton({
      label: 'Combos, add-ons and policies',
      path: 'src/content/policies',
      format: { data: 'json' },
      schema: {
        bbqCombos: fields.array(
          fields.object({
            slug:     fields.text({ label: 'Slug' }),
            name:     fields.text({ label: 'Name' }),
            type:     fields.select({ label: 'Type', options: [{ label: 'Buggy', value: 'buggy' }, { label: 'Quad', value: 'quad' }], defaultValue: 'buggy' }),
            includes: fields.text({ label: 'What is included', multiline: true }),
            capacity: fields.text({ label: 'Capacity' }),
            price:    fields.integer({ label: 'Price (AED)', defaultValue: 0 })
          }),
          { label: 'Buggy + BBQ combos', itemLabel: p => `${p.fields.name.value} — AED ${p.fields.price.value}` }
        ),
        quadSafariCombos: fields.array(
          fields.object({
            slug:     fields.text({ label: 'Slug' }),
            name:     fields.text({ label: 'Name' }),
            type:     fields.select({ label: 'Type', options: [{ label: 'Buggy', value: 'buggy' }, { label: 'Quad', value: 'quad' }], defaultValue: 'quad' }),
            includes: fields.text({ label: 'What is included', multiline: true }),
            capacity: fields.text({ label: 'Capacity' }),
            price:    fields.integer({ label: 'Price (AED)', defaultValue: 0 })
          }),
          { label: 'Quad + safari combos', itemLabel: p => `${p.fields.name.value} — AED ${p.fields.price.value}` }
        ),
        addOns: fields.array(
          fields.object({
            name:  fields.text({ label: 'Add-on' }),
            /* Blank is meaningful: it keeps the row out of the price comparison
               table, which is right for anything quoted individually. 0 means
               genuinely free and still appears. */
            price: fields.integer({ label: 'Price (AED)', description: 'Enter 0 for free. Leave blank if it is quoted individually, which keeps it out of the price table. The label below is what actually prints, so "AED 0" never appears.' }),
            label: fields.text({ label: 'Price label', description: 'e.g. Free, AED 100, Custom quote.' }),
            note:  fields.text({ label: 'Note' })
          }),
          { label: 'Add-ons', itemLabel: p => `${p.fields.name.value} — ${p.fields.label.value}` }
        ),

        transfersSummary:      fields.text({ label: 'Pickup summary', description: 'Hotel pickup inside Dubai is FREE. Never write "quoted" for a Dubai pickup.', multiline: true }),
        transfersOutsideDubai: fields.text({ label: 'Outer emirates pickup', multiline: true }),

        paymentMethods: fields.array(fields.text({ label: 'Method' }), { label: 'Payment methods', itemLabel: p => p.value }),
        paymentSummary: fields.text({ label: 'Payment summary', multiline: true }),
        paymentDetail:  fields.text({ label: 'Payment detail', multiline: true }),

        cancellationHours: fields.integer({ label: 'Free cancellation window (hours)', defaultValue: 24 }),
        cancellation:      fields.text({ label: 'Cancellation policy', multiline: true }),
        weather:           fields.text({ label: 'Weather policy', multiline: true }),
        deposit:           fields.text({ label: 'Deposit policy', multiline: true })
      }
    })
  }
});

/* Shared by the support pages and the About / FAQ pages. Both templates take the
   same eleven sections, so describing the fields twice would guarantee the two
   drift apart the first time one of them changes. */
function supportSchema() {
  return {
    short: fields.slug({
      name: { label: 'Page name', description: 'The last item in the breadcrumb.' },
      slug: { label: 'File name', description: 'Internal only. Not the URL.' }
    }),
    export: fields.text({ label: 'Code reference', description: 'DO NOT EDIT. The name the build looks this page up by.' }),
    path:   fields.text({ label: 'URL path', description: 'DO NOT EDIT once published. Changing it breaks every link to this page and loses its ranking.' }),

    title:       fields.text({ label: 'Search result title', description: '60 characters or fewer.' }),
    description: fields.text({ label: 'Search result description', description: '160 characters or fewer.', multiline: true }),

    crumb: fields.array(
      fields.object({
        name: fields.text({ label: 'Name' }),
        href: fields.text({ label: 'Link' })
      }),
      { label: 'Breadcrumb trail', description: 'Between Home and this page.', itemLabel: p => p.fields.name.value }
    ),

    heroImage:   fields.text({ label: 'Hero image key' }),
    finalImage:  fields.text({ label: 'Final CTA image key' }),
    heroSubject: fields.text({ label: 'Hero image subject', description: 'buggy, quad, dirtbike or safari. The build fails if the image does not match.' }),

    kicker: fields.text({ label: 'Hero kicker' }),
    h1Lead: fields.text({ label: 'H1, plain part' }),
    h1Em:   fields.text({ label: 'H1, highlighted part' }),
    lede:   fields.text({ label: 'Hero paragraph', multiline: true }),
    chips:  fields.array(fields.text({ label: 'Chip' }), { label: 'Hero chips', itemLabel: p => p.value }),

    ctaPrimary: fields.object({
      label:   fields.text({ label: 'Button text' }),
      message: fields.text({ label: 'WhatsApp message', multiline: true })
    }, { label: 'Primary button' }),
    ctaSecondary: fields.object({
      label: fields.text({ label: 'Button text' }),
      href:  fields.text({ label: 'Link' })
    }, { label: 'Secondary button' }),

    panel: fields.object({
      kicker: fields.text({ label: 'Kicker' }),
      title:  fields.text({ label: 'Title' }),
      sub:    fields.text({ label: 'Subtitle', multiline: true }),
      points: fields.array(fields.text({ label: 'Point' }), { label: 'Points', itemLabel: p => p.value })
    }, { label: 'Hero panel' }),

    trust: fields.array(
      fields.object({
        tag:   fields.text({ label: 'Tag' }),
        value: fields.text({ label: 'Value' }),
        note:  fields.text({ label: 'Note' })
      }),
      { label: 'Trust strip', itemLabel: p => `${p.fields.value.value} — ${p.fields.tag.value}` }
    ),

    introKicker: fields.text({ label: 'Intro kicker' }),
    introH2:     fields.text({ label: 'Intro heading' }),
    introLede:   fields.text({ label: 'Intro lede', multiline: true }),
    introBody:   fields.array(fields.text({ label: 'Paragraph', multiline: true }), { label: 'Intro paragraphs', itemLabel: p => p.value.slice(0, 60) }),

    cardsKicker: fields.text({ label: 'Cards kicker' }),
    cardsH2:     fields.text({ label: 'Cards heading' }),
    cardsLede:   fields.text({ label: 'Cards intro', multiline: true }),
    cards: fields.array(
      fields.object({
        tag: fields.text({ label: 'Tag' }),
        h:   fields.text({ label: 'Heading' }),
        p:   fields.text({ label: 'Text', multiline: true })
      }),
      { label: 'Cards', itemLabel: p => p.fields.h.value }
    ),

    checksKicker: fields.text({ label: 'Checks kicker' }),
    checksH2:     fields.text({ label: 'Checks heading' }),
    checksLede:   fields.text({ label: 'Checks intro', multiline: true }),
    checks: fields.array(
      fields.object({
        tag: fields.text({ label: 'Tag' }),
        h:   fields.text({ label: 'Heading' }),
        p:   fields.text({ label: 'Text', multiline: true })
      }),
      { label: 'Checks', itemLabel: p => p.fields.h.value }
    ),

    stepsKicker: fields.text({ label: 'Steps kicker' }),
    stepsH2:     fields.text({ label: 'Steps heading' }),
    stepsLede:   fields.text({ label: 'Steps intro', multiline: true }),
    steps: fields.array(
      fields.object({
        h: fields.text({ label: 'Heading' }),
        p: fields.text({ label: 'Text', multiline: true })
      }),
      { label: 'Steps', itemLabel: p => p.fields.h.value }
    ),

    guideKicker: fields.text({ label: 'Guide kicker' }),
    guideH2:     fields.text({ label: 'Guide heading' }),
    guideIntro:  fields.text({ label: 'Guide intro', description: 'HTML is allowed.', multiline: true }),
    guideBlocks: fields.array(
      fields.object({
        h:    fields.text({ label: 'Heading' }),
        html: fields.text({ label: 'HTML', multiline: true })
      }),
      { label: 'Guide sections', itemLabel: p => p.fields.h.value }
    ),

    faqKicker: fields.text({ label: 'FAQ kicker' }),
    faqH2:     fields.text({ label: 'FAQ heading' }),
    faqLede:   fields.text({ label: 'FAQ intro', multiline: true }),
    faqs: fields.array(
      fields.object({
        q: fields.text({ label: 'Question' }),
        a: fields.text({ label: 'Answer', multiline: true })
      }),
      { label: 'FAQ', description: 'Also feeds the FAQ rich result in Google, so each answer must stand on its own.', itemLabel: p => p.fields.q.value }
    ),

    linksKicker: fields.text({ label: 'Related links kicker' }),
    linksH2:     fields.text({ label: 'Related links heading' }),
    links: fields.array(
      fields.object({
        tag:   fields.text({ label: 'Tag' }),
        title: fields.text({ label: 'Title' }),
        desc:  fields.text({ label: 'Description', multiline: true }),
        href:  fields.text({ label: 'Link' })
      }),
      { label: 'Related links', itemLabel: p => p.fields.title.value }
    ),

    finalKicker: fields.text({ label: 'Final CTA kicker' }),
    finalH2:     fields.text({ label: 'Final CTA heading' }),
    finalLede:   fields.text({ label: 'Final CTA text', multiline: true })
  };
}
