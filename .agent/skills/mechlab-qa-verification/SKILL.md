---
name: mechlab-qa-verification
description: Use in Phase 4 and after every change to test and verify the MechLab site - unit, e2e, accessibility, performance, visual, link and email checks - and to write the QA report with evidence.
---
# QA and verification

## Tooling
Vitest (unit), Playwright (e2e; Chromium, Firefox, WebKit, plus Pixel 7 and iPhone 14 emulation), `@axe-core/playwright` (a11y), Lighthouse CI (budgets), `linkinator` or equivalent (links), HTML validator, plus Antigravity's browser agent for visual review. npm scripts: `typecheck`, `lint`, `test`, `test:e2e`, `test:a11y`, `lhci`, `test:links`.

## What must be covered
1. **Routes:** every route in the sitemap returns 200 (404 page for unknown), has one h1, unique title and meta description, canonical URL, no console errors/warnings.
2. **Responsive visual pass:** browser agent screenshots of every route at 360, 768, 1280, 1920 px. Check: no horizontal scroll, no overlap/clipping, type scale and spacing per tokens, drawings crisp, CTA visible above the fold on mobile and desktop. Attach screenshots as artifacts; list defects and fix.
3. **Forms:** quote and subscribe flows (happy, validation, spam, rate limit, network failure, double submit), keyboard-only completion, screen-reader labels/errors.
4. **Newsletter:** double opt-in, token expiry/tamper/replay, unsubscribe, headers, email HTML at 375 and 600 px, plain text part, no broken images/links.
5. **Accessibility:** axe zero violations on every route and every form state; manual keyboard tab order; focus visible; reduced-motion and 200% zoom/400% reflow checks; contrast of tokens.
6. **Performance (mobile, throttled):** Performance ≥ 90, A11y = 100, Best Practices ≥ 95, SEO ≥ 95; LCP < 2.5s, CLS < 0.05, INP < 200ms; JS per route budget < 150 KB gzip; fonts subset and preloaded correctly.
7. **Content audit:** grep for banned words and banned claims (see `mechlab-content-guardrails`), lorem ipsum, TODO, placeholder emails. Every phone/email/WhatsApp link matches source values exactly.
8. **Security headers present** (hand over to pentest skill for depth).
9. **Build hygiene:** clean `npm ci && npm run build`, no warnings, no unused dependencies.

## Process
Write tests first for forms/tokens. Run the full suite. When something fails: reproduce, fix root cause, add a regression test, re-run everything. Do not weaken a test to pass.

## Report
`docs/qa/QA-REPORT.md`: table of checks (pass/fail), Lighthouse scores per key route, screenshots index, defects found and fixed, remaining known issues. Flaky tests are failures until stabilised.
