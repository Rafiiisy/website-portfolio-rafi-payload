# Rafi Syafrinaldi — Payload CMS

Next.js + Payload v3 monolith for the portfolio site. Visual design matches the approved static site in `projects/website-portfolio-rafi`.

## Local development

1. Copy env and start MongoDB locally (or use Docker mongo only).
2. `cp .env.example .env`
3. `npm install`
4. `npm run seed` — seeds homepage, globals, hero portrait media, admin user
5. `npm run dev` — site at http://localhost:3000, admin at http://localhost:3000/admin

Default admin: `admin@rafisyafrinaldi.com` / `admin123`

## CMS structure

| Area | Slug / location |
|------|-----------------|
| Homepage layout | `pages` collection, `isHomepage: true` |
| Nav | `header` global |
| Site meta | `settings` global |
| Copyright | `footer` global + contact block |
| Sections | `block-portfolio-*` blocks on page layout |

### Blocks

- `block-portfolio-hero`
- `block-portfolio-projects`
- `block-portfolio-stack`
- `block-portfolio-testimonials`
- `block-portfolio-contact`

## Docker production

See `.env.example` and `docker-compose.yml`. Copy `.env.example` → `.env`, set Traefik host rules, then:

```bash
docker network create proxy
docker compose --profile production up -d --build
```

Do not commit `.env`.
