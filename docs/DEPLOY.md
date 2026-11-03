# Production Deployment Guide: The MechLab Engineering

This guide details the deployment procedure, required environment variables, and essential DNS email authentication records for **The MechLab Engineering** website and **The MechLab Dispatch** newsletter engine.

---

## 1. Environment Variables Configuration

Duplicate `.env.example` in your production environment settings (e.g. Vercel Project Settings > Environment Variables, or Docker `.env` file):

| Variable Name | Required | Default / Example | Purpose |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | **Yes** | `https://mechlabengineering.com` | Base URL used for canonical tags, Open Graph images, sitemaps, and RSS feeds. |
| `NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY` | **Yes** | `0x4AAAAAA...` | Public site key from Cloudflare Dashboard > Turnstile. |
| `CLOUDFLARE_TURNSTILE_SECRET_KEY` | **Yes** | `0x4AAAAAA...` | Private secret key from Cloudflare Dashboard > Turnstile. |
| `DISPATCH_TOKEN_SECRET` | **Yes** | Random 32+ byte string | HMAC-SHA256 signing secret for double opt-in confirmation tokens. |
| `BREVO_API_KEY` | **Yes** | `xkeysib-...` | Brevo (Sendinblue) API v3 key for transactional email delivery. |
| `BREVO_NEWSLETTER_LIST_ID` | **Yes** | `2` | Numerical ID of the Brevo contact list for *The MechLab Dispatch*. |
| `BREVO_SENDER_EMAIL` | **Yes** | `themechlabengineering@gmail.com` | Verified sender address in Brevo. |
| `BREVO_SENDER_NAME` | **Yes** | `The MechLab Engineering` | Display name for outbound emails. |
| `OWNER_NOTIFICATION_EMAIL` | **Yes** | `themechlabengineering@gmail.com` | Inbox where incoming quote requests are delivered. |
| `NEXT_PUBLIC_ANALYTICS_HOST` | No | `https://plausible.io` | Cookieless analytics host allowed by CSP `connect-src`. |

> **Security Note:** Never commit production API keys or `DISPATCH_TOKEN_SECRET` to version control. Generate a cryptographically secure token secret using:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

---

## 2. DNS Email Authentication (SPF, DKIM, DMARC)

To ensure quote acknowledgements and newsletter verification emails achieve high inbox deliverability without being marked as spam or spoofed by malicious third parties, configure the following TXT and CNAME records with your domain registrar:

### 2.1 SPF (Sender Policy Framework)
Add a TXT record for `@`:
- **Record Type:** `TXT`
- **Host / Name:** `@`
- **Value:** `v=spf1 include:sendinblue.com ~all`
*(If using Google Workspace as well, combine records: `v=spf1 include:_spf.google.com include:sendinblue.com ~all`)*

### 2.2 DKIM (DomainKeys Identified Mail)
Brevo provides two domain authentication CNAME/TXT keys in the Brevo Dashboard under **Senders & IP > Domains > Authenticate Domain**.
- **Host:** `mail._domainkey.mechlabengineering.com` (or value provided by Brevo)
- **Type:** `TXT` / `CNAME`
- **Value:** Provided in Brevo dashboard.

### 2.3 DMARC (Domain-based Message Authentication)
Add a TXT record for `_dmarc`:
- **Record Type:** `TXT`
- **Host / Name:** `_dmarc`
- **Value:** `v=DMARC1; p=reject; sp=reject; pct=100; rua=mailto:themechlabengineering@gmail.com; adkim=r; aspf=r`

---

## 3. Deployment on Vercel

The application is built for seamless native deployment on Vercel:

1. **Connect Repository:**
   - Link the GitHub/GitLab repository to Vercel.
   - Framework preset: **Next.js** (automatically detected).
   - Node.js Version: `20.x` or `22.x` (Recommended).
2. **Environment Variables:**
   - Add all production variables listed in Section 1.
3. **Build & Output Settings:**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
4. **Deploy:**
   - Trigger production deployment.
   - Assign custom domain: `mechlabengineering.com` and `www.mechlabengineering.com`.

---

## 4. Post-Deployment Verification Checklist

Once the production deployment is active, run the following verification checks:

- [ ] **HTTP Headers Audit:**
  ```bash
  curl -I https://mechlabengineering.com/
  ```
  Ensure `Content-Security-Policy` with nonces, `X-Frame-Options: DENY`, `Strict-Transport-Security`, and `Cross-Origin-Resource-Policy: same-origin` are present.
- [ ] **Sitemap & Robots:**
  - Visit `https://mechlabengineering.com/sitemap.xml` (verify all 25 URLs indexed).
  - Visit `https://mechlabengineering.com/robots.txt` (verify clean disallows and sitemap link).
- [ ] **Quote Form Submission Test:**
  - Submit a test quote via `https://mechlabengineering.com/quote`.
  - Verify receipt of the owner notification email and client acknowledgement.
- [ ] **Newsletter Double Opt-In Test:**
  - Subscribe via `https://mechlabengineering.com/dispatch`.
  - Verify confirmation email receipt, click the link, and complete one-click confirmation on `/dispatch/confirm`.
  - Verify contact appears in Brevo list.
- [ ] **RSS Feed Validation:**
  - Verify `https://mechlabengineering.com/dispatch/feed.xml` renders valid RSS 2.0 XML in a feed reader.

