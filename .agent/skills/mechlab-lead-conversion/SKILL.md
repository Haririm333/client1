---
name: mechlab-lead-conversion
description: Use when building the quote form, CTAs, contact options, trust content, analytics events or page-ending calls to action on the MechLab site. Goal is more qualified quote requests.
---
# Lead conversion

## Principles
One primary action per page: **Get a quote**. Reduce friction, qualify the lead, and keep trust claims honest (see `mechlab-content-guardrails`).

## Page-level
- Header: logo, nav (Services, Work, Process, About, Dispatch), persistent "Get a quote" button. Sticky, 64px high.
- Mobile: fixed bottom bar with three equal targets: Call (`tel:+918610241235`), WhatsApp, Quote. Hide on `/quote`. Respect safe-area insets.
- Service pages: "What you receive" list (deliverables), "What we need from you", "Typical flow", then CTA with the service pre-selected: `/quote?service=sheetmetal-design` and WhatsApp text `Hi, I'd like a quote for sheetmetal design.` (URL-encoded).
- Every page ends with a CTA band: heading "Send us your requirement" (from source), one sentence, Quote button + WhatsApp + phone + email.
- Trust without invention: show the 5 "why us" points as plain statements; show the process; state "Your designs are handled confidentially"; show the representative-work disclaimer. Do not add logos, numbers or reviews.

## /quote form (one page, no wizard)
Fields: Name* · Email* · Phone/WhatsApp · Company (optional) · Service needed* (8 services + "Not sure yet") · What do you have?* (radio: Idea only / Sketch / Drawing or CAD file / Physical part) · Quantity (One-off / Prototype batch / Production run / Not sure) · Needed by (date or "Flexible") · Project details* (min 20 chars, max 2000; helper text lists what helps: dimensions, material, load, environment) · Consent checkbox* (privacy link) · Turnstile.
- Validate with the same Zod schema on client and server. Normalise phone. Trim and length-limit everything.
- Server action/route: verify Turnstile, rate-limit (per IP and per email), honeypot field, reject on mismatch, then send (1) owner email with a clean table of answers, Reply-To = visitor, (2) acknowledgement to visitor restating their request and the 5-step process. Escape all user input in HTML mail; strip CR/LF from header-bound fields.
- No uploads in v1. Success state tells visitors they can email or WhatsApp drawings/photos/STEP files; give both.
- Errors: inline, plain language, focus moves to summary. Preserve entered data on failure. Double-submit disabled.
- `/thank-you`: restates next steps (steps 1–5), WhatsApp button, newsletter invite (non-pushy).

## Analytics (cookieless: Plausible or Vercel Analytics)
Custom events: `quote_start`, `quote_submit`, `whatsapp_click` (prop: page), `call_click`, `email_click`, `newsletter_subscribe`. No third-party ad pixels. No cookie banner needed if nothing non-essential is set; document this in `/privacy`.

## Tests
Quote happy path, each validation, honeypot, Turnstile fail, rate-limit, header-injection attempt, pre-selected service via query string, WhatsApp link content per service page.
