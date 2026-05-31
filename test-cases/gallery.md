# Gallery page (`/gallery`)

**Admin:** `Pages` → slug `gallery`, layout contains **Gallery grid** block.

**Public:** `/gallery`

---

## What you should have for manual testing

| # | Item | Plan |
|---|------|------|
| 1 | Page | Published, slug `gallery`. |
| 2 | Block | One **Gallery grid** with hero (eyebrow, heading, intro) + **items** array. |
| 3 | Media | Each item has an **image** relation; upload alt text in Media. |

---

## Add one gallery item (third card)

In **Pages** → `gallery` → **Gallery grid** block → **Items** → **Add row**:

| Field | Suggested test content |
|-------|-------------------------|
| Label | `TEST Retail lift` |
| Title | `TEST Higher attachment without discounting` |
| Copy | `TEST We rebuilt the retail conversation at the chair so add-ons feel helpful, not pushy. Clients spend more and still leave happy.` |
| Metric | `TEST +18% retail` |
| Image | Upload new image in **Media** first, alt e.g. `TEST gallery retail shelf` |

**Pass:**

- [ ] Third card appears in the grid with your TEST copy and metric.
- [ ] Clicking the card image opens lightbox; image and title match.
- [ ] **Close** button shows text from **Close label** field — change to `TEST Close` and verify.
- [ ] Press **Escape** closes lightbox.

---

## Edit existing hero copy

| Field | Example change |
|-------|----------------|
| Eyebrow | `TEST Gallery` |
| Heading | `TEST Salon systems in real projects.` |
| Intro | `TEST Intro: three stories from advisory work (you added a third card).` |

**Pass:** hero section updates above the grid.

---

## Baseline (after seed)

Two items: **Color Atelier** (+31% rebookings), **Owner Reset** (18 hours saved). Heading starts with `Salon systems, shown through real transformation stories.`

---

## Optional negative test

- [ ] Remove image from one item (if admin allows) → page should not white-screen; image area empty or fallback per implementation.
