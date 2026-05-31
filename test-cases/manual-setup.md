# Manual setup (before testing)

## 1. Prerequisites

- Node.js 22+ (matches Dockerfile)
- Docker (for Mongo), or a reachable MongoDB URI
- Git / project checked out at `projects/project-salon-mastery_payload_v4`

## 2. Environment

1. Copy `.env.example` → `.env` in the project root.
2. Set at minimum:
   - `DATABASE_URI` — host dev: `mongodb://USER:PASS@127.0.0.1:27017/DBNAME?authSource=admin`
   - `PAYLOAD_SECRET` — any long random string for local
   - `SITE_URL` — e.g. `http://localhost:3000` (must match how you open the site; affects admin links)

## 3. MongoDB

**Option A — Docker (recommended for manual tests)**

```bash
docker compose up mongo -d
```

Use `127.0.0.1` in `DATABASE_URI` when the app runs on your host (not inside the `payloadcms-local` container).

**Option B — full stack in Docker**

```bash
docker compose --profile local up --build
```

Ensure `.env` matches compose variables; the `payloadcms-local` service overrides `DATABASE_URI` to use hostname `mongo`.

## 4. Install and Payload artifacts

```bash
npm install
npm run generate:types
npm run generate:importmap
```

## 5. First admin user

1. `npm run dev` (or production `npm run build` + `npm run start`)
2. Open `/admin`
3. Create the first user (typically gets admin/editor roles per your `users` collection)

## 6. Seed baseline content (optional but useful)

```bash
npm run seed
```

This creates/updates:

- Globals: `settings`, `header`, `footer`
- Pages: `home` (homepage), `booking`, `gallery`, `blog`
- Blogs: `weekly-owner-rhythm`, `premium-quiet-weekdays`
- Media: images used by those pages/posts

Re-run `npm run seed` anytime to reset **seeded** documents to the script defaults (it upserts by slug where applicable).

## 7. URLs to bookmark

| Area | URL |
|------|-----|
| Site | `SITE_URL` root, e.g. `http://localhost:3000/` |
| Admin | `http://localhost:3000/admin` |
| REST pages | `http://localhost:3000/api/pages` |
| REST blogs | `http://localhost:3000/api/blogs` |
| Health | `http://localhost:3000/api/healthcheck` |

## 8. Fresh database checklist

If you start with an **empty** DB and **no** seed:

1. Create admin user at `/admin`
2. Upload at least one image in **Media** (for hero/blog tests)
3. Create globals (Payload may create empty globals on first save — fill **Header**, **Footer**, **Settings**)
4. Create a **Pages** document with `slug` `home`, enable **Homepage**, add one **Salon Hero** block, publish
5. Then follow [homepage.md](./homepage.md) and other per-page files
