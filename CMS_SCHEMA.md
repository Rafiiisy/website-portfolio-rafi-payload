# Portfolio Rafi — CMS schema

## Collections

- `pages` — routes + block layout
- `media` — uploads (hero portrait)
- `users` — admin auth

## Globals

- `settings` — siteName, defaultMeta
- `header` — name, shortName, nav[]
- `footer` — copyright

## Blocks

| Slug | Editable content |
|------|------------------|
| `block-portfolio-hero` | portrait, role, location, name, tagline, social links |
| `block-portfolio-projects` | section copy + project items (before/after cards) |
| `block-portfolio-stack` | skill categories + tags |
| `block-portfolio-testimonials` | client quotes |
| `block-portfolio-contact` | CTA, links, copyright |

## Route map

| Route | CMS document |
|-------|----------------|
| `/` | `pages` where `isHomepage: true` |

Seed source: `scripts/seed-data.ts` (from static `lib/content.js`).
