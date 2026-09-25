import { config, collection, singleton, fields } from '@keystatic/core';

import libPhotos from './src/content/images.json';
import heroPhotos from './src/content/hero-images.json';

/* PHOTO PICKERS, 23 Sep 2026.

   Every image field on this page used to be a free-text box holding a key into
   src/data/images.ts. A typo failed the build at best and showed the wrong photo
   at worst, and the client could not add a photo at all without a developer.

   The two photo libraries in the singletons below now hold the files themselves,
   with an upload button and a preview on each one. These pickers read that list,
   so the options are always exactly the photos that exist, and the subject filter
   means a quad page only ever offers quad photos.

   ONE THING TO KNOW: a photo added in the CMS shows up in these dropdowns after
   the next deploy, not immediately, because the options are baked when the admin
   UI is built. Upload it in the photo library, save, wait for the site to rebuild,
   then assign it. That is a Keystatic limitation, not a setting. */
type PhotoRow = { name: string; subject: string };

const photoPicker = (
  photos: PhotoRow[],
  label: string,
  opts: { subject?: string; description?: string; optional?: boolean } = {}
) => {
  const list = photos
    .filter(p => !opts.subject || p.subject === opts.subject)
    .map(p => ({ label: p.name, value: p.name }));
  const options = opts.optional
    ? [{ label: '— none, use the category default —', value: '' }, ...list]
    : list;
  return fields.select({
    label,
    description: opts.description,
    options,
    defaultValue: options[0]?.value ?? ''
  });
};

type PickerOpts = { subject?: string; description?: string; optional?: boolean };
const libPhoto  = (label: string, o: PickerOpts = {}) => photoPicker(libPhotos.photos as PhotoRow[], label, o);
const heroPhoto = (label: string, o: PickerOpts = {}) => photoPicker(heroPhotos.photos as PhotoRow[], label, o);

const subjectOptions = [
  { label: 'Dune buggy', value: 'buggy' },
  { label: 'Quad bike', value: 'quad' },
  { label: 'Dirt bike', value: 'dirtbike' },
  { label: 'Desert safari', value: 'safari' }
];

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
      /* THE CARD PHOTO, an upload like the hero since 25 Sep 2026. This is the
         photo every listing page, cross-sell card and Google result uses for this
         machine, so it is the one the client is most likely to want to change, and
         a dropdown of filenames never showed them what they were changing.

         FLAT FIELDS, NOT AN OBJECT, and that is not a style choice. Keystatic names
         an uploaded file after the field's path, so an image nested inside an object
         lands at <tour>/cardPhoto/file.webp — a folder per field. Flat, it lands at
         <tour>/cardPhoto.webp. The original filename is discarded either way, which
         is why the tour folder carries the descriptive part of the name.

         Required: a tour with no card photo has nothing to show anywhere it is
         listed, so the build refuses rather than rendering a gap. */
      cardPhoto: fields.image({
        label: 'Card photo',
        description: 'Landscape. Used on every listing and cross-sell card for this ride.',
        directory: 'public/assets/images/tours',
        publicPath: '/assets/images/tours',
        validation: { isRequired: true }
      }),
      cardPhotoAlt: fields.text({ label: 'Card photo alt text', description: 'What the photo shows, in one sentence. Read aloud by screen readers and used by Google.', multiline: true, defaultValue: '' }),
      /* AN UPLOAD, NOT A PICKER, and the difference is the whole point. A dropdown
         of names tells the client nothing about what the photo looks like, and
         still needs a developer to get a new photo into the list. This field shows
         the current hero and takes a new file straight from the client's desktop.

         Left empty the page falls back to the shared hero for its category, which
         is what all eleven buggy pages do today. Landscape, 1600px wide or more;
         the build warns below that. */
      heroPhoto: fields.image({
        label: 'Hero photo (optional)',
        description: 'The full-width photo at the top of the page. Landscape, at least 1600px wide. Leave empty to use the shared photo for this category.',
        /* Keystatic files a collection's uploads under the entry's own slug, so this
           lands at /assets/images/tours/<tour>/heroPhoto.webp and the photo belongs
           to the tour rather than the shared pool. The stored path MUST carry that
           slug segment: without it Keystatic looks for the previous file in the
           wrong place on save and GitHub rejects the commit with "a path was
           requested for deletion which does not exist". */
        directory: 'public/assets/images/tours',
        publicPath: '/assets/images/tours'
      }),
      heroPhotoAlt: fields.text({ label: 'Hero photo alt text', description: 'What the photo shows. Only needed when a hero photo is uploaded.', multiline: true, defaultValue: '' }),
      /* The h1 sits on the left, so the machine has to sit away from it or the two
         collide on a wide screen. */
      heroFocal: fields.select({
        label: 'Hero: keep in frame',
        description: 'Which side to hold as the photo crops. The heading is on the left, so "right" suits most photos.',
        options: [
          { label: 'Right', value: 'right' },
          { label: 'Centre', value: 'center' },
          { label: 'Left', value: 'left' }
        ],
        defaultValue: 'right'
      }),
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

     The build audits still apply, because they run on the built HTML rather than
     the source. A CMS edit that breaks a rule fails the deploy and the live site
     keeps serving the previous version. That is the safe outcome, but it is
     silent, so see CLIENT-GUIDE.md for what each failure means.

     There are 15 of them; CLAUDE.md §7 lists them and is the one place the count
     is maintained. This comment said "nine" from launch until 4 Sep 2026, which
     is the kind of number that rots quietly, so it no longer carries its own. */
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
        image:    libPhoto('Card photo', { subject: 'safari' }),
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
        heroImage:  heroPhoto('Hero photo'),
        image:      libPhoto('Card and article photo'),
        finalImage: libPhoto('Closing CTA photo'),
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
            img:   libPhoto('Photo')
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
    /* THE PHOTO LIBRARIES, added 23 Sep 2026.

       Two lists, because the site keeps two pools with different jobs. Library
       photos are the cards and galleries at /assets/images/lib. Hero photos are
       the full-width backgrounds at /assets/images/hero, kept at native resolution
       and carrying a focal point so the machine sits clear of the heading.

       WHY SINGLETONS AND NOT COLLECTIONS, which is the obvious choice for a list
       of things: Keystatic puts a collection's uploads in a folder named after the
       entry, so a photo added that way would land at
       /assets/images/lib/<entry>/<file>.webp. Two of the build audits match the
       flat /assets/images/lib/<name>.webp shape, so a client-uploaded photo would
       quietly stop being resolution-checked, which is the one photo that most needs
       it. A singleton has no entry slug, so uploads stay flat.

       THE NAME MUST MATCH THE FILE. Every guard in src/data/images.ts reads the
       name, not the picture: that a photo does not claim a seat count or a subject
       it does not show is checked against the name. So the name is the thing that
       has to be true, and the build fails if the two drift apart. Upload
       "polaris-rzr-4-seater-side-profile-dubai-desert.webp" and type the same
       thing, without ".webp", as the name.

       ORDER IS THE LIST ORDER. Galleries are picked in this order, so dragging a
       photo up moves it forward in every gallery it qualifies for. */
    photoLibrary: singleton({
      label: 'Photo library',
      path: 'src/content/images',
      format: { data: 'json' },
      schema: {
        photos: fields.array(
          fields.object({
            name: fields.text({
              label: 'Name',
              description: 'The uploaded file name without ".webp". The build checks the photo against this name, so they have to match.'
            }),
            file: fields.image({
              label: 'Photo',
              directory: 'public/assets/images/lib',
              publicPath: '/assets/images/lib',
              validation: { isRequired: true }
            }),
            alt: fields.text({
              label: 'Alt text',
              description: 'What the photo shows, in one sentence. Read aloud by screen readers and used by Google.',
              multiline: true
            }),
            subject: fields.select({
              label: 'Subject',
              description: 'Which pages may use it. The build fails if a quad page is given a buggy photo.',
              options: subjectOptions,
              defaultValue: 'buggy'
            }),
            /* Blank is a real answer, not a missing one: it means the machine is
               not countable in this frame, which makes the photo usable anywhere.
               Setting a seat count here EXCLUDES the photo from pages with the
               other count, which is the guard that fixed the 23 Sep complaint. */
            seats: fields.select({
              label: 'Seats visible',
              description: 'Leave on "not countable" for a distant convoy or a group shot. A seat count keeps the photo off pages for the other size.',
              options: [
                { label: 'Not countable in this frame', value: '' },
                { label: '2 seats', value: '2' },
                { label: '4 seats', value: '4' }
              ],
              defaultValue: ''
            }),
            make: fields.select({
              label: 'Make',
              description: 'Soft preference. It puts a Can-Am first on a Can-Am page but never blocks a photo.',
              options: [
                { label: 'Not specific', value: '' },
                { label: 'Polaris', value: 'polaris' },
                { label: 'Can-Am', value: 'canam' }
              ],
              defaultValue: ''
            })
          }),
          { label: 'Photos', itemLabel: p => p.fields.name.value }
        )
      }
    }),

    heroLibrary: singleton({
      label: 'Hero photo library',
      path: 'src/content/hero-images',
      format: { data: 'json' },
      schema: {
        photos: fields.array(
          fields.object({
            name: fields.text({
              label: 'Name',
              description: 'The uploaded file name without ".webp". The build checks the photo against this name, so they have to match.'
            }),
            file: fields.image({
              label: 'Photo',
              directory: 'public/assets/images/hero',
              publicPath: '/assets/images/hero',
              validation: { isRequired: true }
            }),
            alt: fields.text({ label: 'Alt text', multiline: true }),
            subject: fields.select({
              label: 'Subject',
              options: subjectOptions,
              defaultValue: 'buggy'
            }),
            /* The heading sits on the left, so the machine has to sit away from it
               or the two collide on a wide screen. */
            focal: fields.select({
              label: 'Focal point',
              description: 'Which side of the photo to keep in frame as it crops. The heading sits on the left, so "right" suits most photos.',
              options: [
                { label: 'Right', value: 'right' },
                { label: 'Centre', value: 'center' },
                { label: 'Left', value: 'left' }
              ],
              defaultValue: 'right'
            }),
            /* Typed rather than measured, because the site is rendered on a
               Cloudflare Worker that cannot open the file. The resolution audit
               checks these two numbers against the real photo and fails the build
               if they are wrong, so a guess cannot ship. */
            width: fields.integer({ label: 'Width in pixels', description: 'As exported. 1600 or wider, or it softens on a large screen.', defaultValue: 1600 }),
            height: fields.integer({ label: 'Height in pixels', defaultValue: 1066 }),
            seats: fields.select({
              label: 'Seats visible',
              options: [
                { label: 'Not countable in this frame', value: '' },
                { label: '2 seats', value: '2' },
                { label: '4 seats', value: '4' }
              ],
              defaultValue: ''
            }),
            make: fields.select({
              label: 'Make',
              options: [
                { label: 'Not specific', value: '' },
                { label: 'Polaris', value: 'polaris' },
                { label: 'Can-Am', value: 'canam' }
              ],
              defaultValue: ''
            })
          }),
          { label: 'Hero photos', itemLabel: p => p.fields.name.value }
        )
      }
    }),

    /* Header and footer menus.

       Navigation was held in code until 4 Sep 2026 on the grounds that a mistyped
       href renders on all 75 pages, so one typo is 75 broken links. The reason that
       argument no longer blocks this: scripts/audit-links.mjs now resolves every
       internal href at build time and fails the deploy, and the URL field below
       refuses a malformed path at save time. The risk the old decision was guarding
       against is covered twice over.

       Two things deliberately absent, because nothing renders them and a field the
       client can edit with no effect on the site is worse than no field at all:
       - "Open in a new tab". Every menu link is internal; the components emit no
         target or rel on them.
       - Header call and WhatsApp buttons. Those are built from the phone number in
         Site settings and a generated booking message, so they are already editable
         in one place and cannot drift from the rest of the site.

       nav.ts turns this into the shape the components expect. An item with an empty
       "Dropdown items" list becomes a plain link there, and the footer columns become
       an object keyed by heading. */
    navigation: singleton({
      label: 'Navigation (header & footer)',
      path: 'src/content/navigation',
      format: { data: 'json' },
      schema: {
        header: fields.array(
          fields.object({
            ...navLinkFields(),
            children: fields.array(fields.object(navLinkFields()), {
              label: 'Dropdown items',
              description: 'Leave empty and this stays a plain link with no dropdown.',
              itemLabel: p => p.fields.label.value || 'Untitled link'
            })
          }),
          {
            label: 'Header menu',
            description: 'Drag the handle on the left of a row to reorder. The order here is the order across the top of every page.',
            itemLabel: p => p.fields.label.value || 'Untitled item'
          }
        ),

        /* An array rather than one field per column, so a column can be added,
           removed or dragged. nav.ts rebuilds the object the footer iterates. */
        footerColumns: fields.array(
          fields.object({
            heading: fields.text({
              label: 'Column heading',
              description: 'Printed above the list, e.g. Tours.',
              validation: { isRequired: true }
            }),
            links: fields.array(fields.object(navLinkFields()), {
              label: 'Links',
              itemLabel: p => p.fields.label.value || 'Untitled link'
            })
          }),
          {
            label: 'Footer columns',
            description: 'Drag to reorder the columns, or the links inside one. The contact details, social links and the copyright line are not here: they come from Site settings so they stay the same everywhere.',
            itemLabel: p => p.fields.heading.value || 'Untitled column'
          }
        )
      }
    }),

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
        gtmId:    fields.text({ label: 'Google Tag Manager ID', description: 'e.g. GTM-XXXXXXX. This is the only place GTM needs to go: the ID alone builds both halves of the container, the head script and the <noscript> fallback, on every page. Do not also paste the snippet into the two fields below. Leave blank if not using GTM.' }),
        headCode: fields.text({ label: 'Head code (verification and pixels)', description: 'Raw HTML injected into <head> on the live site. For Search Console or Bing verification tags, a Meta or TikTok pixel, and similar. NOT for Google Tag Manager — use the ID field above, or the container loads twice and every figure in your reports doubles. Leave blank if unused.', multiline: true }),
        bodyCode: fields.text({ label: 'Body code (after <body>)', description: 'Raw HTML injected right after the opening <body> tag, for a pixel that needs to sit there. NOT for the GTM <noscript> fallback, which the ID field above already adds. Leave blank if unused.', multiline: true })
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
          image:      libPhoto('Section photo')
        }, { label: 'Dune buggy section' }),

        quadIntro: fields.object({
          eyebrow:    fields.text({ label: 'Eyebrow' }),
          heading:    fields.text({ label: 'Heading' }),
          sub:        fields.text({ label: 'Sub-heading' }),
          paragraphs: fields.array(fields.text({ label: 'Paragraph', multiline: true }), { label: 'Paragraphs', itemLabel: p => p.value.slice(0, 60) }),
          checklist:  fields.array(fields.text({ label: 'Point' }), { label: 'Checklist', itemLabel: p => p.value }),
          image:      libPhoto('Section photo')
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

/* One menu link. Used by the top-level header items, their dropdown items and every
   footer column, so the URL rule below is stated once and applies everywhere.

   A function rather than a shared const because Keystatic field objects carry
   internal state; reusing one instance across four places in a schema makes the
   four share it. Same reason supportSchema() below is a function.

   WHY THE URL IS VALIDATED HERE AS WELL AS AT BUILD TIME
   The build audit is the backstop and it works, but it fails on Cloudflare after the
   client has already hit save, which means their next content edit cannot deploy
   either until someone fixes the menu. Rejecting the bad value in the editor keeps
   that from ever reaching the repo.

   The pattern catches a missing leading or trailing slash, a bare domain, http
   instead of https, and an empty path segment. It cannot know whether a page exists:
   /ktm-dirt-bike-dubai/prices/ is correctly shaped and still a 404. That is what
   audit-links.mjs is for. The two together cover shape and existence.

   The trailing slash is not cosmetic. Every URL on this site ends in one, and a link
   without it costs the visitor a redirect on the way to the same page.

   KNOWN LIMIT: fragments are rejected. /dune-buggy-dubai/#faq cannot be entered, and
   neither can a query string. That is deliberate rather than an oversight, because
   requiring the URL to end in a slash is what makes the trailing-slash rule
   enforceable, and no menu link needs a fragment today: the section maps use in-page
   anchors within a page, not menu links into one.

   If a menu link to a section is ever genuinely wanted, widen the first alternative to
   allow an optional #fragment rather than removing the anchoring, and extend
   audit-links.mjs at the same time to check the fragment exists on the target page.
   Allowing fragments without that check would let the menu point at an anchor that
   quietly stopped existing, which is the harder bug of the two to notice. */
function navLinkFields() {
  return {
    label: fields.text({
      label: 'Label',
      description: 'What the visitor reads in the menu.',
      validation: { isRequired: true }
    }),
    href: fields.text({
      label: 'URL',
      description: 'A page on this site, written with a slash at each end, e.g. /dune-buggy-dubai/price/. External links need the full address starting https://. Phone and email links are written tel:+971562095713 and mailto:name@example.com.',
      validation: {
        isRequired: true,
        pattern: {
          regex: /^(?:\/(?:[A-Za-z0-9._~%-]+\/)*|https:\/\/[^\s]+|tel:\+?[0-9-]+|mailto:[^\s@]+@[^\s@]+\.[^\s@]+)$/,
          message: 'Needs a slash at the start and the end, like /dune-buggy-dubai/price/. Or a full https://, tel: or mailto: address.'
        }
      }
    })
  };
}

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

    heroImage:   heroPhoto('Hero photo'),
    finalImage:  libPhoto('Final CTA photo'),
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
