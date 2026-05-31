# Manual test cases — Salon Mastery Payload V3

Use these documents for **manual QA** after you set up Mongo, `.env`, and (optionally) run the seed.

| Document | Purpose |
|----------|---------|
| [manual-setup.md](./manual-setup.md) | Environment, first login, seed, URLs |
| [functionalities-checklist.md](./functionalities-checklist.md) | Everything you can test in one list |
| [homepage.md](./homepage.md) | Home `/` — blocks to add/edit and sample copy |
| [booking.md](./booking.md) | `/booking` — form labels, copy, publish |
| [gallery.md](./gallery.md) | `/gallery` — add a third card, lightbox |
| [blog.md](./blog.md) | `/blog` + `/blog/[slug]` — list + new post |
| [globals-settings-media.md](./globals-settings-media.md) | Header, footer, settings, Media collection |

**Suggested order:** setup → globals → media → homepage → booking → gallery → blog → API smoke tests.
