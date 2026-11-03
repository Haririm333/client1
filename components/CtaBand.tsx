import React from 'react';
import Link from 'next/link';
import styles from './CtaBand.module.css';

interface CtaBandProps {
  heading?: string;
  lead?: string;
  preselectedService?: string;
}

export default function CtaBand({
  heading = 'Send us your requirement',
  lead = 'From one-off parts to complete assemblies, we work closely with you from first sketch to final deliverable.',
  preselectedService,
}: CtaBandProps) {
  const quoteUrl = preselectedService ? `/quote?service=${preselectedService}` : '/quote';
  const whatsappUrl = preselectedService
    ? `https://wa.me/918610241235?text=${encodeURIComponent(
        `Hi, I'd like a quote for ${preselectedService.replace(/-/g, ' ')}.`
      )}`
    : 'https://wa.me/918610241235';

  return (
    <section className={`section-dark ${styles.ctaSection}`} aria-labelledby="cta-heading">
      <div className="container">
        <div className={styles.ctaGrid}>
          <div className={styles.ctaContent}>
            <div className="section-label">06 / LET&apos;S BUILD TOGETHER</div>
            <h2 id="cta-heading" className={styles.ctaHeading}>{heading}</h2>
            <p className={styles.ctaLead}>{lead}</p>

            <div className={styles.ctaButtons}>
              <Link href={quoteUrl} className="btn-primary">
                Get a quote
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className={styles.ctaDetails}>
            <div className={styles.contactCard}>
              <span className={styles.contactLabel}>DIRECT EMAIL</span>
              <a href="mailto:themechlabengineering@gmail.com" className={styles.contactValue}>
                themechlabengineering@gmail.com
              </a>
            </div>

            <div className={styles.contactCard}>
              <span className={styles.contactLabel}>DIRECT PHONE</span>
              <a href="tel:+918610241235" className={styles.contactValue}>
                +91 86102 41235
              </a>
            </div>

            <div className={styles.contactCard}>
              <span className={styles.contactLabel}>HOURS & CONFIDENTIALITY</span>
              <span className={styles.contactNote}>
                Your designs and CAD files are handled confidentially with care.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
