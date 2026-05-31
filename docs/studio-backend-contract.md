# Studio Backend Contract

This contract defines how the `/_studio` UI persists content updates to file-backed CMS storage.

## Endpoint summary

- `GET /api/cms/pages`
  - Returns page index metadata for Studio list view.
- `GET /api/cms/site`
  - Returns global site content from `content/site/site.json`.
- `POST /api/cms/site`
  - Updates global site content.
- `GET /api/cms/pages/:slug`
  - Returns full page document from `content/pages/:slug.json`.
- `POST /api/cms/pages`
  - Creates a new page document and fails on slug collision.
- `PUT /api/cms/pages/:slug`
  - Updates an existing page document.
- `POST /api/cms/validate`
  - Validates payload shape before write and returns actionable errors.

## File persistence behavior

- Source of truth remains filesystem content:
  - `content/pages/*.json`
  - `content/site/site.json`
- API writes are atomic and must not partially truncate JSON files.
- Save operations should preserve stable `id` values where possible.

## Data constraints for v1 editor

Editable in Studio:
- `title`
- `slug` (with route and file rename safety checks)
- `seo.title`
- `seo.description`
- `sections[*].props`

Protected/deferred in v1:
- aggressive section type refactors
- schema migrations that require renderer rewrites

## Response model

Validation responses:
- `valid`: boolean
- `errors`: string[]

Error responses:
- `error`: string

## Deployment assumptions

- No auth gate for v1 (deferred by request).
- Studio route is manually accessed at `/_studio`.
- Backend process is required for write operations.
