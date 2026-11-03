---
name: mechlab-dispatch-newsletter
description: Use when building the "The MechLab Dispatch" newsletter - signup UI, double opt-in, email HTML and plain text templates, archive pages, unsubscribe, and issue content.
---
# The MechLab Dispatch — newspaper-style newsletter

## Concept
A small broadsheet for engineers and product owners. Looks like a newspaper front page, reads like a workshop bulletin. Free, no spam, unsubscribe in one click. Cadence is the owner's choice (default: monthly); never promise a fixed schedule in copy.

## Visual language (web + email)
- Masthead: double rule top and bottom, centred "The MechLab Dispatch" in **Old Standard TT** (bold, ~48–64px web, 36px email), with a dateline row in small caps: `VOL. 1 · NO. 1 · <issue date> · FREE`. Tagline: "Notes from the design desk." (owner can change).
- Body in **Source Serif 4** 17–18px / 1.6, hairline column rules, drop cap on the lead paragraph, small-caps kickers, justified text only if hyphenation is on (otherwise left-aligned).
- Sections: **Lead Story** (one design idea explained properly), **From the Workbench** (one component or service in depth, using the SVG drawings), **Rule of Thumb** (one DFM tip in a boxed single-rule panel), **Classifieds** (honest availability/services note and the Get-a-quote link), **Colophon** (who sends this, contact, unsubscribe).
- Email: 600px table layout, inline CSS, Georgia/"Times New Roman" fallbacks (web fonts are a progressive enhancement only), ink on white, blue only for links and rules, dark-mode safe (no pure-white PNG logos on transparent backgrounds), preheader text, alt text everywhere, plain-text part generated from the same content.

## Signup component (`<DispatchSignup/>`)
Styled as a newspaper "subscription notice": boxed with a double rule, serif headline "Subscribe to the Dispatch. It's free.", one line of copy, email field + button "Subscribe", consent line with privacy link, Turnstile (invisible/managed). Used on Home, Dispatch landing, thank-you, footer (compact). States: idle, submitting, "Check your inbox to confirm your subscription", already-subscribed (generic response — do not reveal whether an address exists), error.

## Flow (stateless double opt-in)
1. `POST /api/dispatch/subscribe`: Zod-validate email, Turnstile, rate-limit (per IP and per email hash, e.g. 1 confirmation email per address per hour), always return the same 202 response.
2. Send confirmation email containing a link with an HMAC-SHA256-signed token (`email`, `iat`, `exp` 24h, purpose=`confirm`) using `DISPATCH_TOKEN_SECRET` (≥32 random bytes), constant-time compare.
3. `GET /dispatch/confirm?token=…` shows a page with a POST button ("Confirm subscription") so link scanners can't auto-confirm; the POST verifies the token and adds the contact to the Brevo list (adapter `lib/mail`), recording timestamp and source for consent evidence.
4. Every issue contains `List-Unsubscribe` (mailto + https) and `List-Unsubscribe-Post: List-Unsubscribe=One-Click` headers plus a visible unsubscribe link; `/dispatch/unsubscribe` handles manual removal with the same token pattern.
5. Sender identity and contact in every footer. Privacy page explains purpose, processor (Brevo), retention, and how to delete data (aligned with India's DPDP Act 2023 and GDPR basics; flag in CONTENT-GAPS for the owner to confirm legal text).
6. Never import purchased/scraped lists. Never add quote-form senders to the list without separate consent.

## Archive
`/dispatch` lists issues (title, date, kicker, 2-line summary). `/dispatch/[issue]` renders the same content as the email in the web layout. Content stored as MDX/JSON in `content/dispatch/`. Include RSS (`/dispatch/feed.xml`).

## Issue 001 (draft for the owner)
Only evergreen, textbook-correct content, each block marked `OWNER REVIEW`: lead story on designing for manufacture (consider the process before the geometry); workbench on what a GD&T-ready drawing includes (dimensions, tolerances, fits, surface finish, BOM — as in the catalog); rule of thumb on adding bend reliefs and keeping hole-to-edge distances sensible in sheetmetal (no numeric values unless the agent cites a standard); classifieds invites quote requests. No invented customer stories or figures.

## Tests
Subscribe → confirm → unsubscribe e2e with the mock mailer; expired/tampered/replayed token; scanner GET does not confirm; enumeration (identical responses and similar timing); rate limits; email HTML passes a linter and renders in Chromium at 375/600px; plain text part exists; unsubscribe headers present.
