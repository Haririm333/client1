---
name: mechlab-design-system
description: Use when creating or changing any UI, CSS, layout, typography, spacing, illustration or motion on the MechLab site. Defines the "technical drawing sheet" design language, tokens, fonts and the anti-generic rules.
---
# Design system — "The drawing sheet"

## Idea
The site reads like a clean set of engineering drawings: white sheet, ink linework, one blue accent, mono annotations, a title block. Editorial, not techy-cosplay. Restraint is the feature.

## Tokens (CSS variables in `styles/tokens.css`)
- Colour: `--ink #1f2326`, `--ink-2 #2b3035`, `--paper #ffffff`, `--sheet #f4f5f7`, `--rule #dfe4ea`, `--muted #5b6570` (5.9:1 on white), `--blue #1e7bf0` (accents, lines, large graphics only; 4.1:1 on white so never for small text), `--blue-deep #1560c8` (buttons, links, small text; white on it = 5.9:1), `--blue-wash #eaf2fe`. Dark sections use `--ink` with `--paper` text and `--blue` accents.
- Spacing (4px base): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Section padding `clamp(64px, 8vw, 120px)`. Container 1200px, side margin 20px mobile / 32px tablet / auto desktop, 12 columns, 24px gutter.
- Radius: 2px on inputs and buttons, 0 elsewhere (drawings have square corners). Borders 1px `--rule`. No shadows except a 1px focus ring offset 2px in `--blue-deep`.
- Type scale (fluid): h1 `clamp(44px, 6.2vw, 84px)` / 0.98; h2 `clamp(32px, 4vw, 52px)` / 1.05; h3 24px / 1.2; body 17px (18px ≥1024) / 1.6; small 14px / 1.5; label 12px mono, uppercase, tracking 0.08em. Max line length 64ch.

## Fonts (self-host with `next/font/google`, `display: swap`, preload only headings + body)
- Headings: **Barlow Condensed** 600/700, sentence case, letter-spacing -0.01em.
- Body/UI: **IBM Plex Sans** 400/500/600.
- Labels, specs, numbers, form hints: **IBM Plex Mono** 400/500.
- Dispatch only: **Old Standard TT** (masthead, section heads) + **Source Serif 4** (body). Never load these on non-Dispatch pages.
Fallback stacks with `size-adjust` to avoid layout shift.

## Signature elements (use sparingly, consistently)
- Section label above every h2: `02 / SERVICES` in mono with a 1px rule running to the right edge.
- Dimension lines: thin ruled line with end ticks and a mono value between process steps or beside the hero drawing. Pure CSS/SVG.
- Title-block footer: a bordered grid with fields COMPANY / CONTACT / SHEET (page name) / REV (site version) / DATE (build date). Real data only.
- Hero: left-aligned headline "Engineering ideas, built to perform.", 2 CTAs, right side a precisely drawn SVG flange coupling with PCD circle, centreline (dash-dot) and 2-3 dimension callouts. Stroke-draw on load (≤900ms), disabled under `prefers-reduced-motion`.
- Illustrations: hand-built SVG line drawings of the 6 catalog components in `components/drawings/`, 1.5px strokes, centrelines, consistent viewBox, `<title>`/`<desc>` for a11y. Always captioned "Representative illustration."
- Dark band sections at most 2 per page (hero or CTA), never alternate light/dark on every section.

## Layout rules
Asymmetric 12-col layouts; text left, drawing right or offset. Service lists are a ruled table (name / what you get / link), not icon cards. Process is a horizontal numbered strip with dimension lines (stacks vertically on mobile). Max one repeated card pattern per page.

## Motion
Only: link underline slide (150ms), button press, hero stroke-draw, section label rule grow on reveal (IntersectionObserver, once). All off under reduced motion. No parallax, no scroll-jacking, no carousels.

## Interaction & accessibility
Touch targets ≥48px. Visible focus. Skip link. Landmarks. One h1 per page. Forms: visible labels, inline errors tied with `aria-describedby`, error summary focus. Contrast checked in CI by axe. Images/SVG have text alternatives or `aria-hidden`.

## Anti-slop checklist (fail the PR if any is true)
Gradient backgrounds · glow/blur blobs · glassmorphism · emoji or circled-icon feature grids · stock photos of people/handshakes · centred hero with two floating cards · "trusted by" logo strip · counters/stats · testimonial carousel · Inter + purple · lorem ipsum · identical card repeated 3+ sections in a row · generic gear clip-art.
