# The MechLab Engineering

> **DESIGN • ENGINEER • DELIVER**  
> High-precision mechanical design studio specializing in parametric 3D CAD, sheetmetal design, 2D drafting with GD&T, reverse engineering, fabrication technical support, and rapid 3D printing prototyping.

---

## 1. Studio Information

- **Studio:** The MechLab Engineering
- **Tagline:** DESIGN • ENGINEER • DELIVER
- **Email:** `themechlabengineering@gmail.com`
- **Phone:** `+91 86102 41235`
- **WhatsApp:** `https://wa.me/918610241235`
- **Operating Discipline:** Mechanical Design, Parametric Modeling, Drawing Packages & Physical Prototyping

---

## 2. Technical Stack & Architecture

- **Framework:** Next.js 15.5.28 (App Router, React 19, Node 24)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Vanilla CSS Variables & CSS Modules (Strict "Drawing Sheet" engineering design system, zero Tailwind)
- **Validation:** Zod 4.6.7 (Universal client/server schemas)
- **Bot Mitigation:** Cloudflare Turnstile (fail-closed, minimum fill-time checks, honeypot traps)
- **Rate Limiting:** Sliding-window rate limiter per IP and SHA-256 email hash
- **Newsletter Engine:** Stateless double opt-in system with HMAC-SHA256 URL-safe tokens and timing-safe signature verification (`crypto.timingSafeEqual`)
- **Email Delivery:** Brevo (Sendinblue) transactional adapter with in-memory test harness
- **Testing:** Vitest 5.1.0, Playwright 1.64.1, Axe-core (strict WCAG 2.2 AA audit)
- **Security:** Semgrep SAST, OWASP ASVS 4.0 Level 1 & Level 2 controls, nonce-based Content Security Policy

---

## 3. Design System: "The Drawing Sheet"

The site visual language deliberately mirrors a pristine ISO/ASME engineering drawing sheet:
- **Sheet Background:** `#ffffff` (drawing canvas) and `#f4f5f7` (boundary margin).
- **Ink Linework:** `#1f2326` (primary linework) and `#2b3035` (secondary lines).
- **Technical Blue:** `#1e7bf0` (accents, dimensions, centerlines) and `#1560c8` (interactive buttons and links, 5.9:1 contrast).
- **Typography:**
  - Headings: `Barlow Condensed` (600/700 weight, uppercase tracking)
  - Body: `IBM Plex Sans` (400/500/600 weight, 1.6 line-height)
  - Specs & Callouts: `IBM Plex Mono` (tabular numbers, drawing title blocks)
  - Dispatch Newsletter: `Old Standard TT` (broadsheet masthead) & `Source Serif 4` (editorial body)
- **Anti-Slop Invariants:**
  - Zero gradient backgrounds, zero floating glow blobs, zero glassmorphism.
  - Zero stock photos of models or generic clip-art gears.
  - Hand-drawn mathematical SVGs for all technical components (spur gear, stepped shaft, flange coupling with PCD circle, bearing assembly, L-bracket, gear plate) with accessible `<title>` and `<desc>`.

---

## 4. Routes & Sitemap

| Route | Purpose | Architecture |
| :--- | :--- | :--- |
| `/` | Engineering studio homepage | Hero linework animation, ruled services table, 5-step process strip, Why Us, Dispatch subscription |
| `/services` | Comprehensive services directory | Ruled tabular layout of all 7 studio services |
| `/services/[slug]` | Individual service detail templates | Data-driven template: What you receive, What we need, Typical flow, CTA with preselected slug |
| `/work` | Part Design Portfolio | 6 precision-crafted mechanical drawings with technical annotations and disclaimers |
| `/process` | 5-Step Engineering Workflow | Requirement, Concept, Modelling, Drawings, Print & Support |
| `/about` | Studio Philosophy & Standards | DFM mindset, proprietary confidentiality, profile specifications |
| `/quote` | High-conversion Quote Request | Single-page accessible form, Zod validation, honeypot, Turnstile bot protection |
| `/contact` | Direct communication channels | Direct email, phone, and WhatsApp contact points |
| `/dispatch` | Newsletter archive & broadsheet | The MechLab Dispatch publication hub |
| `/dispatch/[issue]` | Full editorial issues | Broadsheet masthead, drop caps, workbench notes, rule-of-thumb callouts |
| `/dispatch/confirm` | Double opt-in confirmation | Scanner-safe interactive POST form preventing auto-confirmation |
| `/dispatch/unsubscribe` | Unsubscribe portal | One-click header and token-verified unsubscription |
| `/dispatch/feed.xml` | RSS 2.0 Syndication Feed | Valid RSS feed with XML styling |
| `/privacy` | Legal Privacy Policy | DPDP Act 2023 aligned, cookieless |
| `/terms` | Studio Terms of Service | DFM verification boundaries, IP ownership, custom scopes |
| `/thank-you` | Conversion Confirmation | Next steps recap, direct file transfer instructions |
| `/.well-known/security.txt` | Security vulnerability disclosure | RFC 9116 compliant security policy |

---

## 5. Development & Verification Commands

### 5.1 Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### 5.2 Production Build & Server
```bash
# Build optimized static and dynamic routes
npm run build

# Start production server on port 3000
npm start
```

### 5.3 Automated Verification Gates
```bash
# Run Vitest unit, integration, and security abuse test suites (30 tests)
npm test

# Run Playwright route integrity and metadata checks (42 tests)
npx playwright test e2e/routes.spec.ts

# Run Axe-core WCAG 2.2 AA accessibility audit (26 tests)
npx playwright test e2e/a11y.spec.ts

# Run Playwright conversion form flows (6 tests)
npx playwright test e2e/forms.spec.ts

# Run Content Guardrails scanner (assert 0 banned terms, 0 placeholders)
node scripts/audit-content.mjs

# Audit HTTP Security Headers & Per-Request CSP Nonces
node scripts/verify-headers.mjs

# Run Lighthouse CI performance and SEO audit
node scripts/run-lighthouse.mjs

# Capture responsive screenshots across 4 breakpoints (44 images)
node scripts/capture-screenshots.mjs

# Verify dual-viewport email HTML rendering
node scripts/verify-email-render.mjs

# Run Semgrep Static Application Security Testing
semgrep --config auto --config p/typescript --config p/nextjs

# Run production dependency security audit
npm audit --omit=dev
```

---

## 6. Verification & Security Reports

- Complete QA Verification Evidence: `docs/qa/QA-REPORT.md`
- Penetration Testing & ASVS Audit: `docs/security/PENTEST-REPORT.md`
- Editorial & Content Guardrails: `docs/CONTENT-GAPS.md` and `docs/ASSUMPTIONS.md`
- Deployment & DNS Setup Guide: `docs/DEPLOY.md`
- Search Console & Organic SEO Next Steps: `docs/SEO-NEXT-STEPS.md`

