import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PORTFOLIO_ITEMS } from '@/content/portfolio';
import DrawingRenderer from '@/components/drawings/DrawingRenderer';
import CtaBand from '@/components/CtaBand';
import styles from './Work.module.css';

export const metadata: Metadata = {
  title: 'Part Design Portfolio | The MechLab Engineering',
  description:
    'Typical components designed and detailed by The MechLab Engineering: gears, stepped shafts, flange couplings, bearing housings, brackets, and gear plates.',
  alternates: {
    canonical: '/work',
  },
};

export default function WorkPage() {
  return (
    <>
      {/* Portfolio Header */}
      <section className={styles.headerSection} aria-labelledby="work-title">
        <div className="container">
          <div className="section-label">01 / PART DESIGN PORTFOLIO</div>
          <h1 id="work-title" className={styles.pageTitle}>
            Part Design Portfolio
          </h1>
          <p className={styles.pageLead}>
            Typical mechanical components we design, model, and detail. All illustrations are representative samples of component types. Custom designs are made to your exact working specifications.
          </p>

          <div className={styles.disclaimerBanner} role="note">
            <span className={styles.disclaimerIcon} aria-hidden="true">ℹ</span>
            <span className={styles.disclaimerText}>
              <strong>Notice:</strong> Drawings shown below represent standard component geometries and tolerancing principles. In accordance with our confidentiality practice, client-proprietary production models are never published without written consent.
            </span>
          </div>
        </div>
      </section>

      {/* 6 Representative Components Showcase */}
      <section className={styles.portfolioSection} aria-label="Component Drawings">
        <div className="container">
          <div className={styles.portfolioGrid}>
            {PORTFOLIO_ITEMS.map((item) => (
              <article key={item.id} className={styles.portfolioCard}>
                <div className={styles.drawingFrame}>
                  <DrawingRenderer type={item.drawingType} />
                  <div className={styles.captionBar}>
                    <span className={styles.captionText}>{item.caption}</span>
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardCategory}>{item.category}</span>
                    <span className={styles.cardId}>{item.id}</span>
                  </div>

                  <h2 className={styles.cardTitle}>{item.name}</h2>
                  <p className={styles.cardDescription}>{item.description}</p>

                  <div className={styles.specsTable}>
                    <div className={styles.specsHeader}>TECHNICAL HIGHLIGHTS</div>
                    <dl className={styles.specDl}>
                      {item.specifications.map((spec, sIdx) => (
                        <div key={sIdx} className={styles.specRow}>
                          <dt className={styles.specLabel}>{spec.label}:</dt>
                          <dd className={styles.specValue}>{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className={styles.cardActions}>
                    <Link
                      href={`/quote?service=mechanical-design-cad`}
                      className="btn-primary"
                      style={{ padding: '10px 18px', fontSize: '13px', width: '100%' }}
                    >
                      Request quote for {item.name}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <CtaBand
        heading="Need custom parts designed to specification?"
        lead="Send us your dimensional envelope, operating loads, or sample part for a fast engineering review."
      />
    </>
  );
}
