# Globals, settings, and Media

These affect **every page** (header/footer) or **reusable assets** (media).

---

## Settings (`settings` global)

| Field | Test action |
|-------|-------------|
| Site title | Change to `TEST Veronica Advisory Site` — verify browser tab / metadata where used |
| Default meta description | Set long TEST string — verify default SEO description if page meta empty |
| Search engine visibility | Toggle — verify behaviour if you wire robots/meta to this flag later |

---

## Header (`header` global)

| Field | Example TEST change |
|-------|---------------------|
| Brand text | `TEST Veronica.` |
| Brand URL | `/` or `/booking` for a quick link test |
| Menu rows | Add row: label `TEST Pricing`, url `/#faq` |
| CTA — label | `TEST Audit` |
| CTA — url | `/booking` |
| CTA — open in new tab | Toggle and verify `target="_blank"` when on |

**Pass:** header on `/`, `/booking`, `/gallery`, `/blog` all show updated brand and menu; CTA works.

---

## Footer (`footer` global)

| Field | Example TEST change |
|-------|---------------------|
| Brand text | `TEST Footer brand` |
| Description | `TEST Footer tagline paragraph.` |
| Navigation heading | `TEST Explore` |
| Navigation links | Add `TEST Contact` → `mailto:test@example.com` |
| Legal heading | `TEST Legal` |
| Legal links | Change first link label to `TEST Imprint` |
| Contact heading | `TEST Say hello` |
| Contact lines | Replace first line with `TEST hello+test@veronica.studio` |
| Copyright | `TEST © 2026 QA run` |
| Tagline | `TEST Built for owners who test.` |

**Pass:** footer grid updates on all routes.

---

## Media collection

### Upload flow

- [ ] **Create** new media: choose file, set **alt** (required).
- [ ] Confirm file on disk under `uploads/media/` (local).
- [ ] **Edit** alt text → use same media in a page block → alt on `<img>` updates (or matches your `MediaImage` helper).

### Suggested test files

- Small PNG (logo) — check thumbnail in admin.
- Large JPEG — check layout on hero / blog hero.

### Used by seed (reference alts)

Alt strings from seed include: `Veronica portrait`, `Case study salon interior`, gallery and blog image alts in `scripts/seed.ts`. Searching Media by alt helps QA find the right asset.

---

## Cross-page checklist (globals + pages)

1. Change header **Brand text** → reload `/` and `/blog` → both show new text.
2. Change footer **Copyright** → reload `/booking` → footer bottom updates.
3. Upload new **Media** → assign to homepage **Salon Hero** image → hero portrait swaps.

---

## API quick check (optional)

```http
GET /api/globals/header
GET /api/globals/footer
GET /api/globals/settings
```

(Exact REST paths depend on Payload global slug exposure; if 404, use admin UI as source of truth.)
