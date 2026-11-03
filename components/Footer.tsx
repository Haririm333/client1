import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        {/* Upper Navigation & Studio Links */}
        <div className={styles.footerNavGrid}>
          {/* Column 1: Studio Identity */}
          <div className={styles.colIdentity}>
            <div className={styles.brandTitle}>THE MECHLAB ENGINEERING</div>
            <p className={styles.tagline}>DESIGN • ENGINEER • DELIVER</p>
            <p className={styles.studioDesc}>
              A mechanical engineering design studio turning concepts into manufacturable products with modern CAD, DFM validation, and 3D printing.
            </p>
            <div className={styles.directLinks}>
              <a href="mailto:themechlabengineering@gmail.com" className={styles.monoContact}>
                themechlabengineering@gmail.com
              </a>
              <a href="tel:+918610241235" className={styles.monoContact}>
                +91 86102 41235
              </a>
            </div>
          </div>

          {/* Column 2: Engineering Services */}
          <div>
            <div className={styles.colHeader}>SERVICES</div>
            <ul className={styles.footerList}>
              <li><Link href="/services/mechanical-design-cad">Mechanical Design & CAD</Link></li>
              <li><Link href="/services/sheetmetal-design">Sheetmetal Design</Link></li>
              <li><Link href="/services/drafting-gdt">2D Drafting & GD&T</Link></li>
              <li><Link href="/services/reverse-engineering">Reverse Engineering</Link></li>
              <li><Link href="/services/product-development">Product Development</Link></li>
              <li><Link href="/services/fabrication-support">Fabrication Support</Link></li>
              <li><Link href="/services/3d-printing">3D Printing & Prototypes</Link></li>
            </ul>
          </div>

          {/* Column 3: Studio & Navigation */}
          <div>
            <div className={styles.colHeader}>STUDIO</div>
            <ul className={styles.footerList}>
              <li><Link href="/work">Part Design Portfolio</Link></li>
              <li><Link href="/process">5-Step Engineering Flow</Link></li>
              <li><Link href="/about">About MechLab</Link></li>
              <li><Link href="/contact">Direct Contact</Link></li>
              <li><Link href="/quote">Request a Quote</Link></li>
              <li><Link href="/dispatch">The MechLab Dispatch</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Confidentiality */}
          <div>
            <div className={styles.colHeader}>DISPATCH NEWSLETTER</div>
            <p className={styles.dispatchNote}>
              Engineering notes from the design desk: DFM principles, GD&T breakdowns, and sheetmetal guidelines.
            </p>
            <Link href="/dispatch" className={`btn-secondary ${styles.dispatchBtn}`}>
              Read & Subscribe
            </Link>
            <div className={styles.confidentialityBadge}>
              <span className={styles.confidentialityIcon}>🔒</span>
              <span>All client CAD models and sketches handled confidentially.</span>
            </div>
          </div>
        </div>

        {/* Title Block Section (Classic Engineering Drawing Block) */}
        <div className={styles.titleBlock} aria-label="Drawing Title Block">
          <div className={styles.tbCellCompany}>
            <span className={styles.tbLabel}>ORGANISATION / STUDIO</span>
            <span className={styles.tbValue}>THE MECHLAB ENGINEERING</span>
          </div>

          <div className={styles.tbCellDoc}>
            <span className={styles.tbLabel}>TITLE / DISCIPLINE</span>
            <span className={styles.tbValue}>MECHANICAL DESIGN & FABRICATION SUPPORT</span>
          </div>

          <div className={styles.tbCellRev}>
            <span className={styles.tbLabel}>REV</span>
            <span className={styles.tbValue}>1.0.0</span>
          </div>

          <div className={styles.tbCellSheet}>
            <span className={styles.tbLabel}>SPEC STANDARD</span>
            <span className={styles.tbValue}>ASME Y14.5 / ISO</span>
          </div>

          <div className={styles.tbCellDate}>
            <span className={styles.tbLabel}>DATE</span>
            <span className={styles.tbValue}>2026-03-01</span>
          </div>

          <div className={styles.tbCellApproval}>
            <span className={styles.tbLabel}>DELIVERABLE STATUS</span>
            <span className={styles.tbValue}>PRODUCTION RELEASE</span>
          </div>
        </div>

        {/* Legal & Standards Sub-bar */}
        <div className={styles.subBar}>
          <p className={styles.copyright}>
            © 2026 The MechLab Engineering. All rights reserved.
          </p>

          <ul className={styles.legalList}>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><span className={styles.sep}>|</span></li>
            <li><Link href="/terms">Terms of Service</Link></li>
            <li><span className={styles.sep}>|</span></li>
            <li><Link href="/.well-known/security.txt">Security Policy</Link></li>
            <li><span className={styles.sep}>|</span></li>
            <li><Link href="/sitemap.xml">Sitemap</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
