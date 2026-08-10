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
        averageRating: fields.number({ label: 'Google average rating' })
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
