# Figma Implementation Plan

## Setup Decisions
- Project path: `projects/project-salon-mastery`
- Stack: Portable static React (CDN + Babel)
- Initial scope: Single-page first
- Naming convention: PascalCase for React components/pages

## Code Style Assumptions
- Functional React components only.
- Keep logic minimal in page components; extract reusable UI into `components/`.
- Keep styles token-driven and centralized in `styles/`.

## Responsive Breakpoint Approach
- Mobile-first CSS with practical breakpoints:
  - `>= 768px` (tablet)
  - `>= 1024px` (desktop)
- Respect Figma auto-layout intent, then optimize for real devices if needed.

## Token Mapping Policy
- Map Figma values into `styles/tokens.css` first.
- Avoid hardcoded values in components unless explicitly one-off.
- Keep naming semantic (`--color-text`, `--space-5`) instead of screen-specific.

## Componentization Policy
- Build one page container in `pages/HomePage.jsx`.
- Extract repeatable blocks (buttons, cards, section shells) into `components/`.
- Favor composition over deep prop nesting.

## Acceptance Criteria for Figma Parity
- Spacing hierarchy and alignment visually match Figma.
- Typography scale and weight match approved styles.
- Color and effect usage reflect token mapping from Figma.
- Responsive behavior is validated for core breakpoints.

## First Implementation Slice
- Parse target Figma node(s) for the first page.
- Fill `figma/design-analysis.md` before coding.
- Implement only agreed first page scope.

## Current Scope Definition (Single Page)
- Implement the complete landing page represented by root node `1:2` as one SPA page in `pages/HomePage.jsx`.
- Include all visible sections in this pass:
  - header, hero, trust/logo strip
  - pain points, qualification, method, outcomes
  - case studies, process, about, FAQ, CTA bands, footer

## File Map (Planned Updates)
- `styles/tokens.css`
  - Replace placeholder tokens with Figma-derived tokens (colors, typography, spacing, borders, shadows).
- `styles/global.css`
  - Add layout utilities and component class styling for sections/cards/typography.
- `pages/HomePage.jsx`
  - Compose the full page from reusable component modules.
- `components/` (new files)
  - `SiteHeader.jsx`
  - `HeroSection.jsx`
  - `SectionHeading.jsx`
  - `PainPointGrid.jsx`
  - `QualificationSection.jsx`
  - `MethodSection.jsx`
  - `OutcomeSection.jsx`
  - `CaseStudiesSection.jsx`
  - `ProcessSection.jsx`
  - `AboutSection.jsx`
  - `FaqSection.jsx`
  - `CtaSection.jsx`
  - `SiteFooter.jsx`
- `uploads/design-tokens.md`
  - Backfill concrete token values extracted from Figma.
- `uploads/ux-decisions.md`
  - Log key UX/behavior choices confirmed during implementation.

## Component Extraction Order
1. Build shared primitives and structure:
   - `SectionHeading`, button style, list row, quote block, section container.
2. Build top-of-page conversion flow:
   - `SiteHeader`, `HeroSection`, trust/logo strip.
3. Build middle proof/education blocks:
   - pain points, qualification, method, outcomes, case studies.
4. Build credibility and close:
   - process, about, FAQ, CTA, footer.

## Token Mapping Decisions
- Keep semantic tokens only (no section-specific hardcoded color variables).
- Initial token groups:
  - `--color-bg`, `--color-bg-alt`, `--color-text`, `--color-text-muted`, `--color-accent`, `--color-border`, `--color-cta-bg`, `--color-cta-text`
  - Fraunces + Inter typography scale variables
  - spacing scale aligned to 8px rhythm
  - border/shadow tokens for cards and image containers
- Use local CSS variables + class-based styles (no Tailwind dependency).

## Responsive Implementation Notes
- Mobile-first CSS, with breakpoints:
  - `@media (min-width: 768px)` for tablet
  - `@media (min-width: 1024px)` for desktop
- Desktop parity target:
  - preserve key section rhythm and split layout ratios.
- Mobile strategy:
  - stack multi-column sections
  - reduce heading scales and paddings
  - keep CTA visibility and reading flow intact.

## Risks and Mitigations
- Risk: very long single-page file becomes hard to maintain.
  - Mitigation: extract each major section to `components/`.
- Risk: exact typography match may vary if fonts are not loaded.
  - Mitigation: load Fraunces + Inter via web font import and define robust fallbacks.
- Risk: image assets from temporary Figma URLs expire.
  - Mitigation: use temporary URLs for build pass, then move approved assets into project-local files.
- Risk: FAQ interaction ambiguity.
  - Mitigation: implement static rows first or basic accordion after user confirmation.

## Proposed Delivery Order
- Pass 1: full static visual build with all sections.
- Pass 2: interaction refinements (FAQ accordion, anchor navigation polish).
- Pass 3: responsive parity tuning and accessibility pass.
