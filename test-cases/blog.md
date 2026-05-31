# Blog index (`/blog`) and posts (`/blog/[slug]`)

**Admin:**

- **Pages** → slug `blog` — contains **Blog list** block (hero + query limit).
- **Blogs** collection — each post: title, slug, category, excerpt, read time, images, nested content.

**Public:**

- `/blog` — list from **Blogs** (published only for anonymous users, per access rules).
- `/blog/your-slug` — article template.

---

## Part A — Blog index page (`/blog`)

### What you should have

| # | Item | Plan |
|---|------|------|
| 1 | Page `blog` | Published; not homepage. |
| 2 | Block **Blog list** | Eyebrow, heading, intro, **limit** (e.g. `12`). |

### Add / edit index copy

| Field | Example TEST value |
|-------|---------------------|
| Eyebrow | `TEST Journal` |
| Heading | `TEST Field notes for owners.` |
| Intro | `TEST Short intro: practical reads on operations and growth.` |
| Limit | `1` (temporarily) |

**Pass:** heading/intro update; with `limit: 1` only **one** post card shows (then set limit back to `12`).

---

## Part B — Add one new blog post (full content plan)

**Blogs** → **Create new** → fill then **Publish**.

### Required top-level fields

| Field | Example content |
|-------|------------------|
| Title | `TEST How we cut no-show rate in 30 days` |
| Slug | `test-cut-no-shows-30-days` (URL will be `/blog/test-cut-no-shows-30-days`) |
| Category | `TEST Operations` |
| Excerpt | `TEST A short excerpt shown on the blog index card and under the H1 on the post page.` |
| Read time | `TEST 6 min read` |
| Read link label | `TEST Read` |
| Back link label | `TEST Back to journal` |
| Published at | Set to a recent date/time |
| Status | **Published** |

### Media

| Field | Plan |
|-------|------|
| Hero image | Upload wide image, alt `TEST hero no-shows` |
| Mid image | Upload second image, alt `TEST mid section salon` |

### Content (array of sections)

Add **2 sections** (so you can see mid-image placement after first section on the article page).

**Section 1**

| Subfield | Example |
|----------|---------|
| Heading | `TEST Start with reminders clients actually read` |
| Intro | `TEST Intro: no-shows drop when confirmations feel human and specific.` |
| Points | Add **2 points** |

Point 1:

- Heading: `TEST Send the right window`
- Body: `TEST Body: mention day, stylist, and what to do if plans change.`

Point 2:

- Heading: `TEST Make rebooking one tap`
- Body: `TEST Body: link the next slot before they leave the chair.`

**Section 2**

| Subfield | Example |
|----------|---------|
| Heading | `TEST Measure the habit, not the slogan` |
| Intro | `TEST Intro: track confirmation rate and late cancels weekly.` |
| Points | 1 point minimum |

Point 1:

- Heading: `TEST One number per week`
- Body: `TEST Body: owner reviews the metric every Monday.`

**Pass checks:**

- [ ] `/blog` shows new card: category, title, excerpt, link `TEST Read — TEST 6 min read` (or your labels), links to `/blog/test-cut-no-shows-30-days`.
- [ ] Post page: H1, excerpt, hero image, section headings and bodies.
- [ ] **Mid image** appears after **first** section content (per design).
- [ ] Top link uses **Back link label** → navigates to `/blog`.

---

## Part C — Edit existing seeded post

Pick `weekly-owner-rhythm` or `premium-quiet-weekdays`:

| Edit | Example |
|------|---------|
| Title prefix | `TEST ` + existing title |
| Excerpt | Replace first sentence with `TEST updated excerpt.` |
| First content section heading | `TEST Updated section heading` |

**Pass:** index card and article reflect edits after publish.

---

## Part D — Draft visibility

1. Create another post with slug `test-draft-only`, leave **Draft** (not published).
2. Visit `/blog`.

**Pass:** draft post **does not** appear in the public list (expected with `editorsOrPublished`-style read access).

---

## Baseline (after seed)

Two posts: **weekly-owner-rhythm**, **premium-quiet-weekdays** — titles and excerpts match `scripts/seed.ts`.
