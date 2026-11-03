# Organic SEO & Discovery Roadmap: The MechLab Engineering

This document outlines the strategic next steps for search engine visibility, technical indexing, and local engineering discovery.

---

## 1. Search Engine Console Setup

### 1.1 Google Search Console (GSC)
1. **Property Verification:**
   - Add property via Domain DNS verification (TXT record: `google-site-verification=...`).
2. **Sitemap Submission:**
   - Submit sitemap URL: `https://mechlabengineering.com/sitemap.xml`
   - Monitor indexation coverage across all 25 core URLs.
3. **Core Web Vitals & URL Inspection:**
   - Inspect `/`, `/services`, `/work`, and `/quote`.
   - Request indexing for all primary canonical URLs.

### 1.2 Bing Webmaster Tools
1. Import verified Google Search Console property into Bing Webmaster Tools.
2. Submit `https://mechlabengineering.com/sitemap.xml` and `https://mechlabengineering.com/dispatch/feed.xml`.

---

## 2. Target Keyword Strategy & Landing Architecture

The website is engineered around high-intent engineering queries with zero fluff:

| Primary Keyword Cluster | Target Landing Route | Semantic Deliverables Highlighted |
| :--- | :--- | :--- |
| **Mechanical Design Studio** | `/` and `/services` | Concept CAD, mechanisms, fixtures, machine parts |
| **3D CAD Modelling Services** | `/services/mechanical-design-cad` | Parametric parts, SolidWorks-style assemblies, STEP files |
| **Sheetmetal Design & DXF Patterns** | `/services/sheetmetal-design` | K-factor allowances, bend relief, 1:1 DXF flat patterns |
| **2D Drafting & GD&T Packages** | `/services/drafting-gdt` | ASME Y14.5 / ISO 1101, fit tolerances, surface finish, BOM |
| **Reverse Engineering Services** | `/services/reverse-engineering` | CMM / calipers to CAD, physical parts to drawings |
| **Product Development Prototyping** | `/services/product-development` | DFM validation, assembly interference checks |
| **Fabrication Support Drawings** | `/services/fabrication-support` | Weld symbols, cutting layouts, machine shop packages |
| **3D Printing Prototyping** | `/services/3d-printing` | PLA, PETG, ABS functional prototypes, form/fit testing |
| **Mechanical Engineering Newsletter** | `/dispatch` | Engineering rules of thumb, GD&T standards, DFM tips |

---

## 3. Google Business Profile & Local Search

Once the studio owner approves the registered business physical address (currently flagged in `docs/CONTENT-GAPS.md`):

1. **Register Google Business Profile:**
   - Business Name: **The MechLab Engineering**
   - Category: **Mechanical Engineer** / **Drafting Service** / **Engineering Consultant**
   - Phone: `+91 86102 41235`
   - Website: `https://mechlabengineering.com`
   - Services Listed: Map 1-to-1 to the 7 core studio services.
2. **Local Engineering Directories:**
   - IndiaMART profile linking to `https://mechlabengineering.com`
   - TradeIndia studio listing
   - LinkedIn Company Page for *The MechLab Engineering*

---

## 4. Ongoing Editorial Syndication (The MechLab Dispatch)

1. **Bi-Weekly Technical Publishing:**
   - Author evergreen, textbook-accurate engineering case studies in `content/dispatch.ts`.
   - Maintain the editorial rule: only cite standard ASME/ISO guidelines; zero invented metrics.
2. **RSS Feed Aggregation:**
   - Submit `https://mechlabengineering.com/dispatch/feed.xml` to mechanical design engineering aggregators.
3. **LinkedIn & Industry Cross-Posting:**
   - Share technical snippets from "From the Workbench" and "Rule of Thumb" with canonical backlink to the full Dispatch issue on the website.

