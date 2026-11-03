---
name: mechlab-seo-performance
description: Use for metadata, structured data, sitemap, Open Graph images, URL structure and performance tuning on the MechLab site so it ranks for mechanical design, sheetmetal, drafting and 3D printing searches.
---
# SEO and performance

- One topic per page; service pages target their own phrase (e.g. "sheetmetal design services", "GD&T drawing services", "3D printing prototypes", "reverse engineering from physical parts"). Titles ≤ 60 chars, descriptions ≤ 155, unique per page, brand suffix "| The MechLab Engineering".
- `metadata` API per route, canonical, `lang="en-IN"`, Open Graph and Twitter cards with generated OG images (ink background, drawing motif, page title in Barlow Condensed) via `next/og`.
- JSON-LD: `ProfessionalService` (name, url, logo, email, telephone, `sameAs` only if the owner supplies profiles), `Service` per service page, `BreadcrumbList`, `Article` for Dispatch issues. **No** `aggregateRating`, no address unless supplied (log in CONTENT-GAPS: city/service area, business hours, social links, Google Business Profile).
- `sitemap.xml`, `robots.txt`, `security.txt`, `404` and trailing-slash policy, clean lowercase slugs, internal linking: each service page links to Quote, related services, and relevant Work items.
- Performance: static generation for all marketing pages; images via `next/image` (AVIF/WebP), explicit width/height; SVG illustrations inlined and optimised; fonts self-hosted with `size-adjust`; no third-party scripts except Turnstile on form pages (load on interaction/visibility); avoid client JS on static pages; route-level code splitting; cache headers for static assets.
- Provide a short `docs/SEO-NEXT-STEPS.md`: Search Console + Bing Webmaster setup, Google Business Profile, how to request indexing, how to collect real testimonials and case studies to add later.
