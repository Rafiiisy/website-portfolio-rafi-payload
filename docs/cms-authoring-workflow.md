# Author Editing Workflow

This project now supports Studio-first editing with file persistence.

## Start Studio and site preview

```bash
node server/dev-server.mjs
```

Then open:
- `http://localhost:4173/` for the site
- `http://localhost:4173/_studio` for CMS authoring

## Edit an existing page (Studio-first)

1. Open `/_studio`.
2. Pick a page from the dropdown.
3. Edit `title`, `slug`, `seo`, and `sections` JSON.
4. Click **Validate**.
5. Click **Save Page**.

Writes are persisted to `content/pages/<slug>.json`.

## Create a new page

1. Open `/_studio`.
2. Click **New Page** and provide title/slug.
3. Add section documents in `sections[]` with stable `id` and `type`.
4. Save.

## Optional CLI maintenance

```bash
node scripts/cms/add-page.mjs --slug contact --title "Contact"
node scripts/cms/validate-content.mjs
```

## Publish checklist

- `/_studio` can load and save without API errors
- No validation errors
- Route content loads from `content/pages/*.json`
- Unknown section types are resolved or intentionally deferred
