# Functionalities checklist (what you can test)

Tick each after you verify behaviour and that **frontend text/images** match what you set in the CMS (not stale cache — hard refresh if needed).

## Authentication & admin

- [ ] Open `/admin`, log in
- [ ] Log out, log in again
- [ ] Session persists across refresh

## Globals (site-wide)

- [ ] **Settings** — `siteTitle`, `defaultMetaDescription`, `searchEngineVisibility` save and reload
- [ ] **Header** — `brandText`, `brandUrl`, menu rows (label + url + optional new tab), CTA group (label, url, new tab)
- [ ] **Footer** — brand, description, navigation + legal link groups, contact lines, copyright, tagline, section headings (Navigate / Legal / Contact)

## Media

- [ ] Upload new image (JPEG/PNG/WebP), required **alt** text
- [ ] Edit alt / caption
- [ ] Use uploaded media in a page block (relation picker)
- [ ] Confirm file appears under `uploads/media` on disk (local)

## Pages collection

- [ ] List/filter pages in admin
- [ ] **Draft vs published** — draft hidden from public read rules (if you test logged-out site)
- [ ] **Homepage** — only one page should be homepage; toggling updates others (hook behaviour)
- [ ] **Slug + URL** — `url` derived from slug/homepage (verify in admin sidebar)
- [ ] **Meta** group — title + description for `<title>` / meta where implemented
- [ ] **Layout blocks** — reorder blocks, add block, remove block, **hide section** checkbox if used
- [ ] **Block: Salon Hero** — eyebrow, heading, emphasis phrase, subtitle, bullets, primary CTA, cta meta, trust line, portrait image, featured-in labels, stat, logo strip rows
- [ ] **Block: Pain Points** — eyebrow, heading prefix/emphasis, quote, pain cards (label, title, body), section ID for anchors
- [ ] **Block: Method Steps** — eyebrow, two-line heading, step prefix, steps array
- [ ] **Block: Outcomes Grid** — eyebrow, heading, shared item body, outcome titles, primary CTA
- [ ] **Block: Case Study** — eyebrow, heading prefix/emphasis, image, tag, title, body, quote
- [ ] **Block: About + stats** — eyebrow, heading, body, stats rows
- [ ] **Block: CTA panel** — eyebrow, heading, body, primary CTA (interactive light is client-side)
- [ ] **Block: FAQ list** — eyebrow, heading, question + **answer** per row; accordion (+ opens answer, − when open)
- [ ] **Block: Booking lead form** — intro copy, points, button label, response meta, form labels, placeholders, revenue/team size option arrays
- [ ] **Block: Gallery grid** — hero eyebrow/heading/intro, close label, gallery items (label, title, copy, metric, image); lightbox open/close/Escape
- [ ] **Block: Blog list** — hero copy, post limit; list pulls from **Blogs** collection

## Blogs collection

- [ ] Create post: title, slug, category, excerpt, read time, read link label, back link label, hero + mid images, content sections with nested points
- [ ] **Publish** post — appears on `/blog` and correct `/blog/{slug}`
- [ ] **Draft** post — does not appear in public list (per access rules)
- [ ] Edit existing post — frontend updates

## Frontend routes (logged-out)

- [ ] `/` — homepage layout + header/footer
- [ ] `/booking` — booking page + form (submit prevented client-side; no backend handler unless you add one)
- [ ] `/gallery` — cards + lightbox
- [ ] `/blog` — index from CMS
- [ ] `/blog/{slug}` — article layout, mid-image after first section
- [ ] `/admin` still loads while browsing site
- [ ] **404** — unknown path shows not-found page
- [ ] **Anchors** — header links to `/#results`, `/#process`, etc. scroll on home

## REST API (optional)

- [ ] `GET /api/pages?limit=5` returns JSON
- [ ] `GET /api/blogs?where[slug][equals]=weekly-owner-rhythm` returns one doc
- [ ] `GET /api/media?limit=1` returns media

## Performance / UX (light)

- [ ] Scroll-reveal still runs on route change (if enabled)
- [ ] No console errors on key pages
- [ ] Images load (Payload URLs or remote after seed)

## Regression after schema change

- [ ] `npm run generate:types` and `npm run generate:importmap` after collection/block edits
- [ ] `npm run typecheck` / `npm run build` in CI or locally
