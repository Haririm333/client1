# Owner Content Gaps & Action Items

The website has been strictly constructed without inventing any claims, metrics, or client records. To further elevate the site and enable additional features, the business owner should review and address the following items:

---

### 1. Vector Logo (SVG)
- **Current status:** The site currently uses the original raster logo (`public/brand/logo-original.png`, a white-background raster) and an inline SVG wordmark.
- **Action for Owner:** Provide an SVG or high-resolution transparent vector file (`logo.svg`) of the official logo mark for crisp scaling across all DPIs and dark themes.

### 2. City, Service Area, and Operating Hours
- **Current status:** Phone number has `+91` country code. No physical city, regional boundary, or hours are mentioned on the site or in `docs/source/`.
- **Action for Owner:** Specify the primary base city (e.g., Chennai, Coimbatore, Bengaluru, Pune, etc.), whether clients across India or internationally are serviced, and standard office/response hours. This will also allow adding precise local schema markup (`addressLocality`, `openingHoursSpecification`).

### 3. Fabrication: In-House Shop vs. Fabrication Support
- **Current status:** The old one-page site claimed in-house "cutting, bending, welding and assembly", whereas the Catalog (p. 2 & p. 4) and Brochure (p. 1 & p. 2) explicitly designate "Fabrication Support: drawings, BOM, technical guidance for cutting, bending, welding and machining".
- **Action for Owner:** Confirm whether The MechLab operates in-house fabrication machinery or provides engineering fabrication support through partner vendor networks. The site currently defaults to the Catalog's safer "Fabrication Support" positioning.

### 4. Real Project Case Studies & CAD Screenshots
- **Current status:** The site features 6 hand-crafted SVG engineering line drawings on `/work` representing standard mechanical components (Spur Gear, Stepped Shaft, Flange Coupling, Bearing Assembly, L-Bracket/Gusset, Gear Plate), captioned as "Representative illustration".
- **Action for Owner:** As projects are completed and clients grant written permission, supply non-confidential CAD renders, 2D drawing extracts, or prototype photos to build out an active portfolio.

### 5. Client Names, Logos & Testimonials
- **Current status:** Zero testimonials, reviews, star ratings, or client logos are shown, adhering strictly to anti-slop guidelines.
- **Action for Owner:** Provide authentic quotes, client names, and verified company endorsements once written approval is obtained.

### 6. Non-Disclosure Agreement (NDA) Availability
- **Current status:** The site states: *"Your designs are handled confidentially"* in accordance with the source brochure.
- **Action for Owner:** Confirm whether a standard mutual NDA can be signed before receiving proprietary CAD models or sketches. If yes, we can add a prominent "Mutual NDA available upon request" note to `/quote`.

### 7. CAD Software Stack & Supported File Formats
- **Current status:** Source mentions "SolidWorks-style workflow" and standard deliverables (STEP, 2D PDF).
- **Action for Owner:** Provide an approved list of supported CAD formats (e.g., STEP, IGES, Parasolid `.x_t`, DXF, DWG, native SolidWorks, Inventor, Fusion 360) and CAM/drawing standards to display in the technical specifications.

### 8. Publishable Response & Turnaround Metrics
- **Current status:** Copy promises "fast turnaround and open communication" without publishing unverified numbers like "24-hour turnaround" or "same-day quote".
- **Action for Owner:** If you have guaranteed SLAs (e.g., "Initial review within 1 business day"), supply these to be integrated into the quote process.

### 9. 3D Printing Build Specifications
- **Current status:** Stated materials are PLA, PETG, ABS "and more".
- **Action for Owner:** Provide exact machine bed dimensions (max build volume in mm, e.g. 250×250×250mm) and any additional materials offered (e.g. TPU, Nylon, Carbon Fiber, Resin SLA).

### 10. Newsletter Infrastructure & Publishing Schedule
- **Current status:** "The MechLab Dispatch" is fully implemented with double opt-in, HMAC tokens, newspaper styling, and mock/Brevo mailer adapters. Issue 001 is drafted with textbook-accurate DFM topics marked `OWNER REVIEW`.
- **Action for Owner:** Supply Brevo API credentials, verify the sending domain's SPF/DKIM/DMARC records, and set the desired publishing cadence (e.g., monthly).

### 11. Legal Review of Privacy Policy & Terms of Service
- **Current status:** `/privacy` and `/terms` pages are provided with transparent disclosures covering minimal data collection, zero marketing resale, cookieless analytics, and quote processing.
- **Action for Owner:** Have a qualified legal professional review the text against the Digital Personal Data Protection (DPDP) Act 2023 (India) and international standards.

### 12. Social Profiles & Google Business Profile
- **Current status:** Only Email, Phone, and WhatsApp direct links are configured.
- **Action for Owner:** Supply URLs for company LinkedIn, YouTube, Instagram, and Google Business Profile for integration into header/footer and JSON-LD `sameAs` schema.
