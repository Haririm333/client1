# Engineering & Business Assumptions

All statements and design decisions on the MechLab website are grounded strictly in the source documents (`docs/source/`). Where information is missing or conflicting, the safest professional assumptions have been made and logged below. Owner-only gaps that require client decisions or assets are documented in [`docs/CONTENT-GAPS.md`](CONTENT-GAPS.md).

---

### 1. Fabrication Support vs. In-House Fabrication
- **Conflict in source:** The old one-page site mentions in-house "Cutting, bending, welding and assembly of custom parts". The newer Catalog (p. 2 & p. 4) and Brochure (p. 1 & p. 2) explicitly specify "Fabrication Support: drawings, bills of material, and technical guidance for cutting, bending, welding, and machining".
- **Assumption:** We default strictly to the catalog definition: **Fabrication Support**. We position MechLab as engineering and design specialists providing manufacturing-ready documentation, BOMs, and shop-floor guidance, not an in-house heavy fabrication shop. This prevents misleading potential clients regarding shop capabilities. Flagged in `CONTENT-GAPS.md`.

### 2. Process Step Naming
- **Conflict in source:** Step 3 is "Design" on the old site vs. "Modelling" in the Brochure/Catalog. Step 5 is "Build & Support" on the old site vs. "Print & Support" in the Brochure/Catalog.
- **Assumption:** We use the exact Catalog/Brochure terminology:
  1. **Requirement** (Share your idea, sketch or existing part)
  2. **Concept** (Options, materials and manufacturing methods)
  3. **Modelling** (Detailed 3D CAD and interference checks)
  4. **Drawings** (Complete 2D drawings and files ready for fabrication)
  5. **Print & Support** (Revisions, 3D-printed prototypes and production support)

### 3. Deliverable Terminology
- **Assumption:** We use "final deliverable" and "production drawing package" across all service pages, reflecting the exact terminology in the Brochure (p. 2) and Catalog (p. 2).

### 4. Quote Form File Uploads
- **Assumption:** V1 of the `/quote` form does not include client-side binary file uploads. This eliminates attack vectors (unrestricted file upload, server-side payload execution, cloud storage billing abuse) and keeps the initial architecture stateless.
- Instead, the quote form UI and the `/thank-you` confirmation explicitly prompt clients to send CAD files (.STEP, .IGES, .SLDPRT), 2D drawings (.PDF, .DXF), and sketches directly via email (`themechlabengineering@gmail.com`) or WhatsApp (`+91 86102 41235`).

### 5. Representative Component Illustrations
- **Assumption:** The 6 components showcased on `/work` (Spur Gear, Stepped Shaft, Flange Coupling, Bearing Assembly, L-Bracket / Gusset, Gear Plate) are rendered as custom, hand-crafted SVG engineering line drawings. Every drawing carries the exact source disclaimer: *"Representative illustration. Custom designs are made to your specifications."* (Catalog p. 5). No unverified past client work or uncredited renders are shown.

### 6. 3D Printing Materials and Scope
- **Assumption:** We advertise PLA, PETG, ABS "and more" as stated in the source documents. We do not invent proprietary resins, metal sintering, or specific machine build volumes until confirmed by the owner.

### 7. Regional Scope, Currency & Localization
- **Assumption:** Contact number has country code `+91` (India). Locale is set to `en-IN` (Indian English / British English conventions, e.g. "modelling", "sheetmetal", "optimised"). We make no unverified claims about specific city addresses, registered offices, or local operating hours until supplied.

### 8. Confidentiality and NDA
- **Assumption:** Source states: "Your designs are handled confidentially" and "handled with care". We honor this verbatim on the site and quote page. We do not promise formal legal NDAs or ISO certifications until the owner confirms an NDA template is available.

### 9. Newsletter Cadence & Architecture
- **Assumption:** "The MechLab Dispatch" is positioned as "Notes from the design desk" with evergreen technical value (DFM insights, GD&T breakdown, sheetmetal tips). We do not promise a rigid weekly or bi-weekly frequency in marketing copy. A double opt-in flow with cryptographic HMAC-SHA256 tokens is used to prevent abuse and spamming.

### 10. Privacy and Cookieless Analytics
- **Assumption:** The site runs cookieless analytics (event dispatcher for quote starts, submissions, and contact clicks) without advertising trackers, third-party remarketing pixels, or invasive surveillance. No cookie banner is required, keeping the UX clean and compliant.
