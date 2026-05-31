# Strapi Seed Export (Salon Mastery v2)

This folder contains portable seed data for Strapi 5 and the mapping used by the frontend.

## Inputs and assumptions

- Strapi base URL: `STRAPI_URL` (default example: `http://localhost:1337`)
- Import auth: `STRAPI_API_TOKEN` (server/CI only, never browser)
- Content type API path: `/api/pages`
- Slugs included: `home`, `booking`
- Site globals are included as `site.json` (optional import based on your Strapi schema)

## Files

- `pages/home.json`, `pages/booking.json`: canonical app-contract page JSON
- `mapping.section-types.json`: `section.type` <-> Strapi dynamic zone component UID mapping
- `site.json`: optional global site payload

## Section mapping

- `hero` -> `sections.hero`
- `landing` -> `sections.landing`
- `booking-form` -> `sections.booking-form`

## Import pages into Strapi

1. Ensure Strapi has a `Page` collection type with at least:
   - `slug` (unique)
   - `title`
   - `seo` component (`title`, `description`)
   - `sections` dynamic zone with components matching `mapping.section-types.json`
2. Run:

```bash
STRAPI_URL=http://localhost:1337 STRAPI_API_TOKEN=YOUR_TOKEN node scripts/strapi/import-seed-pages.mjs
```

## Idempotency strategy

The importer is safe to re-run:

- fetch by slug
- `PUT` when page exists
- `POST` when page does not exist

## Read-path notes

Frontend reads Strapi via `lib/strapi-pages-api.js` and normalizes each entry into:

`{ id, title, slug, seo, sections: [{ id, type, props }] }`
