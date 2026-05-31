# Figma Design Analysis

## Source
- Figma URL: https://www.figma.com/design/9ENt7rOPJL0pX4FxhB2bsj/SalonMastery?node-id=1-2&t=LfQhSj50JlJ4Y3Z3-11
- File key: `9ENt7rOPJL0pX4FxhB2bsj`
- Root node: `1:2` (`1440w light`)
- Key nodes analyzed:
  - `1:4` (hero section + trust strip)
  - `1:111` (pain points section)
  - `1:365` (case studies section)
  - Structural map from root metadata includes header, all core sections, CTA blocks, FAQ, and footer

## Layout System
- Page frame strategy:
  - Desktop-first canvas (`1440px`) with vertically stacked long-form landing page sections.
  - Consistent outer content width pattern: section container at `1152px` with inner horizontal padding.
- Auto layout directions:
  - Most sections are vertical stacks with nested horizontal rows or 2-column grids.
  - Repeated use of split layouts:
    - text + image for hero/case studies
    - 2-column card grids for pain points and qualification cards
  - CTA and badge groups use horizontal row alignment with fixed gaps.
- Constraints and resizing behavior:
  - Design is authored for fixed desktop width; several node widths are explicit/fixed.
  - Clear signs of intended proportional resizing in major columns (text/media pairs), but mobile behavior is not fully expressed in source nodes.
- Grid assumptions:
  - 12-column-like composition appears in hero and case studies (text/media span proportions).
  - Repeated content blocks suggest reusable section shell:
    - section padding around `144px`
    - internal max-width around `1152px`
    - local gutters around `40px`

## Tokens and Styles
- Color mappings (observed):
  - Background base: warm off-white (`#F7F5F2` / close neutral variants)
  - Alternate section background: tinted neutral (`rgba(234,230,225,0.4)`)
  - Primary text: `#221F1C`
  - Secondary text: `#696159`
  - Accent/brand brown: `#A9774C`
  - Hairline border: `#DBD6D1` (+ alpha variants)
  - CTA dark fill: `#221F1C` with light text `#FAF8F5`
- Typography mappings:
  - Display/headings: Fraunces (regular + italic), high-contrast editorial feel.
  - Body/UI: Inter (regular/medium), readable business tone.
  - Scale snapshots:
    - Hero H1 approx `68/68`
    - Section H2 approx `48/48` and `60/60`
    - Card/feature headings around `28/38.5` and `36/40`
    - Body copy around `16/24-26`
    - Meta labels `12/16` with wide uppercase tracking.
- Spacing rhythm:
  - Strong 8px-based rhythm with larger jumps: 12, 16, 24, 32, 40, 48, 64, 80, 96, 128, 144.
  - Repeated section paddings and predictable internal gaps indicate consistent scale suitable for tokenization.
- Radius/border/effect mappings:
  - Primary CTA appears square/low radius in analyzed nodes.
  - Avatar chips are circular.
  - Borders are mostly 1px subtle lines; occasional 2px accent borders for emphasis.
  - Shadows are soft and low-contrast on media and CTA cards.
  - Image overlays/gradients are used to improve legibility and tone.

## Component Inventory
- Reusable components identified:
  - `SiteHeader` (logo, nav links, primary CTA)
  - `HeroSection` (eyebrow, emphasized headline, bullet list, CTA row, social proof)
  - `LogoTickerStrip` (publication names)
  - `SectionHeading` (eyebrow + heading with optional emphasized span)
  - `PainPointGrid` + `PainPointCard`
  - `CalloutQuoteCard` ("In short")
  - `QualificationSplitCards` ("This is for / not for")
  - `MethodTimeline` (alternating steps)
  - `OutcomeGrid` cards
  - `CaseStudyArticle` (media + meta + before/after + quote)
  - `ThreeStepProcess`
  - `AboutSection` with metrics row
  - `FaqAccordionList`
  - `CtaBand` / `FinalCta`
  - `SiteFooter` (4-column + legal row)
- Variant/state matrix:
  - CTA button variant appears consistent (dark filled + icon) and repeats across sections.
  - List item variant with icon/check repeats in multiple sections.
  - Card variants: neutral border cards, accent-tag cards, quote cards.
  - FAQ rows imply collapsed/expand interaction states (not fully represented in current static node extract).
- Shared primitives:
  - Eyebrow label pattern (uppercase + tracked Inter)
  - Divider lines
  - Icon-text list row
  - Accent chip/tag
  - Quote with left accent border

## Responsive Behavior
- Mobile (proposed from desktop intent):
  - Collapse all 2-column layouts to single column.
  - Keep media full-width with constrained aspect ratio.
  - Reduce heading scales and section paddings.
  - Preserve content order and CTA visibility near each major section.
- Tablet:
  - Maintain two-column where legible (e.g., compact cards) but stack complex split articles.
  - Use intermediate typography steps between mobile and desktop.
- Desktop:
  - Preserve 1440 composition and spacing hierarchy.
  - Keep hero/case-study split columns and section alternation.
  - Maintain trust/logo strip and repeated CTA cadence.

## Open Questions
- Should implementation prioritize strict pixel-faithful parity at desktop first, then adaptive mobile/tablet behavior, or optimize breakpoints immediately while preserving intent?
- Do you want interactive FAQ accordion behavior implemented now, or static rows first?
- Should repeated CTA actions all point to one anchor/modal target for now (single-page behavior)?
- Should case study imagery and profile images be temporarily sourced from Figma export URLs first, then replaced with local assets later?
- Are there explicit accessibility requirements to enforce now (minimum contrast target, focus ring style, keyboard accordion behavior)?
