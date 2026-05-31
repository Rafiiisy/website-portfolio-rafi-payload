# Booking page (`/booking`)

**Admin:** `Pages` → slug `booking`, **not** homepage, **Published**.

**Public:** `/booking`

---

## What you should have for manual testing

| # | Item | Plan |
|---|------|------|
| 1 | Page row | `slug` = `booking`, `url` should resolve to `/booking`. |
| 2 | Layout | Exactly one **Booking lead form** block (or add a second copy only if you intentionally test duplication). |
| 3 | Meta | Meta title `Book Free Salon Audit` (or your variant). |

---

## Add / edit this content (form + intro)

All fields live inside the **Booking lead form** block.

### Intro + actions

| Field | Example *change to* |
|-------|---------------------|
| Eyebrow | `TEST — Book audit` |
| Heading | `TEST Let us map what blocks growth.` |
| Description | `TEST Short paragraph: we reply with next steps after your form.` |
| Points — add row | `TEST Fourth bullet: verify checklist renders` |
| Button label | `TEST Send request` |
| Response meta | `TEST We reply within 3 business days.` |

**Pass:** intro and button show TEST strings.

### Form labels (visible `<span>` text)

| Group field | Example change |
|-------------|----------------|
| `name` | `TEST Full name` |
| `email` | `TEST Work email` |
| `phone` | `TEST Phone or WhatsApp` |
| `location` | `TEST City / country` |
| `revenue` | `TEST Monthly revenue` |
| `teamSize` | `TEST Team headcount` |
| `challenge` | `TEST Biggest challenge` |

**Pass:** each label on the form updates.

### Placeholders (inputs / first `<option>`)

| Field | Example |
|-------|---------|
| `name` | `TEST Your name` |
| `email` | `TEST you@example.com` |
| `phone` | `TEST +00 ...` |
| `location` | `TEST City` |
| `revenue` | `TEST Pick a band` |
| `teamSize` | `TEST Pick size` |
| `challenge` | `TEST Tell us what feels urgent…` |

**Pass:** placeholders reflect CMS (note: disabled first options use revenue/teamSize placeholder text per implementation).

### Dropdown options (arrays)

**Revenue options** — add one row:

| value | label |
|-------|-------|
| `test-band` | `TEST EUR80k+` |

**Team size options** — add one row:

| value | label |
|-------|-------|
| `test-size` | `TEST 10+ employees` |

**Pass:** new options appear in `<select>`; browser validation still requires a choice before submit.

### Submit behaviour

- [ ] Click submit with empty fields → HTML5 **required** prevents submit.
- [ ] Fill all fields → submit runs client-side **preventDefault** (no server endpoint unless you add one). **Pass:** no full page reload / no unhandled error in console.

---

## Regression with header/footer

- [ ] Header CTA still points to `/booking` after you change **Header** global CTA label to `TEST Book` (see [globals-settings-media.md](./globals-settings-media.md)).

---

## Baseline (after seed)

See `scripts/seed.ts` booking block: eyebrow `Book Free Salon Audit`, heading `Let us map what is blocking your salon growth.`, three bullet points, `Request Audit`, revenue/team options as seeded.
