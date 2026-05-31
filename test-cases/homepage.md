# Homepage (`/`)

**Admin:** `Pages` → document with **Homepage** checked (seed: slug `home`, title `Home`).

**Public:** Open `/` after publish.

---

## What you should have for manual testing

| # | Area | Plan |
|---|------|------|
| 1 | Page document | One **Pages** row: `title` = `Home`, `slug` = `home`, **Is homepage** = on, **Published**. |
| 2 | Meta | **Meta title** and **Meta description** filled (browser tab / SEO smoke). |
| 3 | Layout | At least blocks: **Salon Hero** → **Pain Points** → **Method Steps** → **Outcomes** → **Case Study** → **About + stats** → **CTA panel** → **FAQ list** (order matches design). |
| 4 | Media | Portrait + case study images exist in **Media** and are selected in hero + case study blocks. |

---

## Block-by-block: fields to add / edit (with example copy)

Use these strings to verify **CMS → site** (change one field, save, publish, hard-refresh `/`).

### 1. Salon Hero (`block-hero-salon`)

| Field | Example *add / change to* |
|-------|---------------------------|
| Eyebrow | `TEST — For salon owners EUR25k–EUR60k/month` |
| Heading | `From a "TEST-PHRASE" salon to a structured business in 3–6 months.` |
| Emphasis (italic segment) | `"TEST-PHRASE"` (must appear inside heading) |
| Subtitle | `TEST: More profit, less chair time, independent team.` |
| Bullets (add one row) | `TEST bullet — verify list updates` |
| Primary CTA — label | `TEST Book audit` |
| Primary CTA — url | `/booking` |
| CTA meta | `TEST: 30–45 min Zoom · limited spots` |
| Trust line | `TEST: 120+ owners (edited)` |
| Featured in label / value | `As seen in` / `TEST Magazine` |
| Stat value / text | `+99%` / `TEST stat line` |
| Logos (add row) | `TEST LOGO ROW` |
| Image | Re-pick another **Media** upload |

**Pass:** hero shows your TEST strings; CTA navigates to `/booking`.

### 2. Pain Points (`block-pain-points`)

| Field | Example |
|-------|---------|
| Section ID | `results` (keep for header anchor `#results`) |
| Eyebrow | `TEST Where salons get stuck` |
| Heading prefix | `This is what is ` |
| Heading emphasis | `TEST holding you back.` |
| Quote | `TEST: "Revenue without you" quote line.` |
| First pain item — title | `TEST — Everything depends on you` |

**Pass:** first card title shows TEST; quote updated; `#results` still scrolls from header.

### 3. Method Steps (`block-method-steps`)

| Field | Example |
|-------|---------|
| Section ID | `process` |
| Eyebrow | `TEST The Method` |
| Heading top / bottom | `TEST You do not need more noise.` / `TEST You need a system.` |
| Step prefix | `Phase` (instead of `Step`) |
| First step — label / title / body | `A` / `TEST Clarity` / `TEST body copy for step one.` |

**Pass:** step line reads `Phase A` (or your prefix + label).

### 4. Outcomes Grid (`block-outcomes-grid`)

| Field | Example |
|-------|---------|
| Section ID | `outcomes` |
| Eyebrow | `TEST The Outcome` |
| Heading | `TEST What changes in your salon.` |
| Item body (shared under each card) | `TEST shared outcome description.` |
| First outcome title | `TEST More profit` |
| Primary CTA label | `TEST Book from outcomes` |

**Pass:** all six cards show the shared **item body** with your TEST text; first card title updated.

### 5. Case Study (`block-case-study`)

| Field | Example |
|-------|---------|
| Section ID | `case-studies` |
| Eyebrow | `TEST Case studies` |
| Heading prefix / emphasis | `Salons rebuilt from the ` / `TEST inside out.` |
| Tag | `TEST +40% MARGIN` |
| Title | `TEST Salon Name, City` |
| Body | `TEST before/after one-liner.` |
| Quote | `TEST client quote here.` |
| Image | Swap to another media |

**Pass:** tag, title, body, quote visible; image swaps.

### 6. About + stats (`block-about-stats`)

| Field | Example |
|-------|---------|
| Section ID | `about` |
| Eyebrow | `TEST About` |
| Heading | `TEST I know your reality.` |
| Body | `TEST long about paragraph.` |
| First stat | `99+` / `TEST label` |

**Pass:** stats row shows `99+` and TEST label.

### 7. CTA panel (`block-cta-panel`)

| Field | Example |
|-------|---------|
| Eyebrow | `TEST Your next move` |
| Heading | `TEST Fix it on purpose.` |
| Body | `TEST CTA supporting sentence.` |
| Primary link | `TEST CTA` → `/booking` |

**Pass:** panel copy updates; mouse-move highlight still works (client component).

### 8. FAQ list (`block-faq-list`)

Each row has **Question** (summary line) and **Answer** (shown after the visitor opens the row; the `+` in the design toggles to `−`).

| Field | Example |
|-------|---------|
| Section ID | `faq` |
| Eyebrow | `TEST FAQ` |
| Heading | `TEST Questions, answered.` |
| Add FAQ row — question | `TEST New question from CMS?` |
| Add FAQ row — answer | `TEST This paragraph appears below the question when the row is expanded (click the +).` |

**Pass:** new row appears; click the **+** (or the question row) → answer is visible; icon shows **−** while open (native `<details>` + styles in `styles/global.css`).

**Pass (edit):** change an existing row’s **Answer** → expand again → copy updates.

### FAQ answers not showing — check this first

1. **Old data in Mongo** — FAQ rows created *before* the `answer` field existed have **no answer**. The site only renders an answer when that field is set. Fix: run `npm run seed` again **or** open **Pages → Home → FAQ list** and fill **Answer** for every row, then **Publish**.
2. **Collapsed by default** — answers live inside `<details>` (accordion). **Click the question row or the +** to expand; the + flips to **−** when open. The `<summary>` spans the full row so clicks on the + still toggle (see `styles/global.css`).
3. **Draft not published** — if the homepage is still a **draft**, the public site keeps the last published version without your new answers. Publish the page in admin.

---

## Negative / edge checks

- [ ] Turn **Hide section** on one block → that section should not render (if implemented on frontend).
- [ ] Unpublish page → `/` should 404 or hide per access rules.
- [ ] Remove **Homepage** from `home` and assign another page as homepage → `/` should show the new homepage layout.

---

## Baseline (after `npm run seed`)

If you only want to **compare** against seed without typing TEST strings, the seed matches `scripts/seed.ts` (hero eyebrow `For Salon Owners . EUR25k-EUR60k/month`, pain quote about revenue depending on you, case study `Maison Lior, Antwerp`, etc.). FAQ rows include **question + answer**; expand each row on `/` to read them.
