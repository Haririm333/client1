---
name: mechlab-secure-build
description: Use whenever writing server code, API routes, forms, headers, config, dependencies or deployment settings for the MechLab site. Secure-by-default standards for Phase 1-5.
---
# Secure build standards

## Baseline
TypeScript strict. Validate every input with Zod at the boundary (body, query, headers, params). Output-encode by default (React escapes; never `dangerouslySetInnerHTML` except sanitised MDX pipeline, none for user input). No `eval`, no dynamic `require`, no string-built HTML.

## Headers (set in `next.config` or middleware, verify in tests)
- `Content-Security-Policy` with per-request nonce: `default-src 'self'; script-src 'self' 'nonce-…' https://challenges.cloudflare.com; style-src 'self' 'nonce-…'; img-src 'self' data:; font-src 'self'; connect-src 'self' <analytics host>; frame-src https://challenges.cloudflare.com; frame-ancestors 'none'; base-uri 'none'; form-action 'self'; object-src 'none'; upgrade-insecure-requests`. No `unsafe-inline`/`unsafe-eval` for scripts.
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` denying camera, mic, geolocation, payment, USB, etc., `Cross-Origin-Opener-Policy: same-origin`, `Cross-Origin-Resource-Policy: same-site`. Remove `X-Powered-By`.

## Forms and APIs
- Methods restricted per route; JSON/`application/x-www-form-urlencoded` only; body size limit (e.g. 20 KB); Origin/Sec-Fetch-Site check for CSRF on state-changing routes.
- Turnstile verified server-side with timeout; fail closed. Rate limiting with a shared store (Upstash/Vercel KV); in-memory only for local dev. Honeypot + minimum fill time.
- Email: strip CR/LF from anything in headers, escape in HTML, fixed From address, Reply-To validated, no user-controlled recipients, no template injection.
- Tokens: HMAC-SHA256, purpose-bound, expiry, constant-time compare, secret from env, rotate-able. No secrets in URLs beyond the signed token; tokens never logged.
- Errors: generic messages to client, structured logs server-side without PII (hash emails). No stack traces in responses.
- Redirects only to allow-listed internal paths. No SSRF surface (no server-side fetches of user URLs).

## Supply chain and secrets
Lockfile committed, `npm ci` in CI, `npm audit --omit=dev`, `osv-scanner`, Dependabot/Renovate, pin GitHub Actions by SHA, minimal dependencies (justify each). `gitleaks` pre-commit + CI. `.env*` in `.gitignore`; only `.env.example` committed. Production source maps disabled or not publicly served. Only `NEXT_PUBLIC_` variables are public; audit the client bundle for secrets.

## Deployment
HTTPS only, HSTS, separate staging and production env vars, least-privilege API keys (send-only), SPF/DKIM/DMARC for the sending domain documented in `docs/DEPLOY.md`, security.txt at `/.well-known/security.txt` (contact = owner email).

## Privacy
Collect the minimum. Do not store form data beyond email delivery. Cookieless analytics. Privacy policy matches reality exactly.
