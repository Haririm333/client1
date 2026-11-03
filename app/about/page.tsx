import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import CtaBand from '@/components/CtaBand';
import styles from './About.module.css';

export const metadata: Metadata = {
  title: 'About Us | The MechLab Engineering',
  description:
    'The MechLab Engineering turns ideas into manufacturable products using modern CAD, DFM validation, drawing packages, and 3D printing.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'The MechLab Engineering',
    alternateName: 'MechLab',
    slogan: 'DESIGN • ENGINEER • DELIVER',
    description:
      'The MechLab Engineering is a mechanical engineering design studio that turns ideas into manufacturable products using modern CAD, DFM validation, drawing packages, and 3D printing.',
    email: 'themechlabengineering@gmail.com',
    telephone: '+918610241235',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/about`,
    sameAs: ['https://wa.me/918610241235'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className={styles.headerSection} aria-labelledby="about-title">
        <div className="container">
          <div className="section-label">01 / WHO WE ARE</div>
          <h1 id="about-title" className={styles.pageTitle}>
            Engineering Ideas, Built to Perform.
          </h1>
          <p className={styles.pageLead}>
            The MechLab Engineering is a mechanical engineering design studio that turns ideas into manufacturable products. We combine practical design experience with modern CAD and 3D printing tools to deliver parts and assemblies that are strong, efficient, and cost-effective to produce.
          </p>
        </div>
      </section>

      {/* Philosophy & Scope */}
      <section className={styles.contentSection} aria-label="Studio Overview">
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.mainColumn}>
              <div className="section-label">02 / CORE PHILOSOPHY</div>
              <h2 className={styles.sectionHeading}>
                The Design-for-Manufacture Mindset
              </h2>
              <p className={styles.bodyParagraph}>
                From product development and sheetmetal design to fabrication support, we cover the path from idea to finished part. Every mechanical component created at our desk is planned around real machining, forming, and tooling parameters.
              </p>
              <p className={styles.bodyParagraph}>
                Whether you need a single bracket, a complete mechanism, or a full set of production drawings, our team works closely with you from the first sketch to the final deliverable. We believe in direct communication, well-organized 3D feature trees, and clear, unambiguous 2D drafting packages that eliminate confusion on the factory floor.
              </p>

              <div className={styles.calloutBlock}>
                <h3 className={styles.calloutTitle}>Strict Confidentiality</h3>
                <p className={styles.calloutText}>
                  Your proprietary design concepts, product sketches, and CAD models are handled with care and strict confidentiality. We do not publish client files or proprietary details without explicit written consent.
                </p>
              </div>
            </div>

            {/* Sidebar Specifications */}
            <aside className={styles.sideColumn} aria-label="Studio Capabilities">
              <div className={styles.specBox}>
                <div className={styles.specBoxHeader}>STUDIO PROFILE</div>

                <div className={styles.specItem}>
                  <span className={styles.specLabel}>DISCIPLINE</span>
                  <span className={styles.specVal}>Mechanical Engineering &amp; Design</span>
                </div>

                <div className={styles.specItem}>
                  <span className={styles.specLabel}>PRIMARY DELIVERABLES</span>
                  <span className={styles.specVal}>Parametric CAD, 2D GD&amp;T Prints, 3D Prints</span>
                </div>

                <div className={styles.specItem}>
                  <span className={styles.specLabel}>PROTOTYPING MATERIALS</span>
                  <span className={styles.specVal}>PLA, PETG, ABS and more</span>
                </div>

                <div className={styles.specItem}>
                  <span className={styles.specLabel}>WORKFLOW</span>
                  <span className={styles.specVal}>SolidWorks-style parametric design</span>
                </div>

                <div className={styles.specItem}>
                  <span className={styles.specLabel}>DIRECT CONTACT</span>
                  <span className={styles.specVal} style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '4px' }}>
                    <a href="mailto:themechlabengineering@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', minHeight: '26px' }}>
                      themechlabengineering@gmail.com
                    </a>
                    <a href="tel:+918610241235" style={{ display: 'inline-flex', alignItems: 'center', minHeight: '26px' }}>
                      +91 86102 41235
                    </a>
                  </span>
                </div>

                <div className={styles.specItem}>
                  <Link href="/quote" className="btn-primary" style={{ width: '100%', marginTop: '12px' }}>
                    Request a project quote
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Why Choose MechLab */}
      <section className={styles.whySection} aria-labelledby="why-heading">
        <div className="container">
          <div className="section-header">
            <div className="section-label">03 / WHY CHOOSE US</div>
            <h2 id="why-heading" className={styles.sectionHeading}>
              Five Pillars of Our Studio Practice
            </h2>
          </div>

          <div className={styles.pillarsGrid}>
            <div className={styles.pillarCard}>
              <div className={styles.pillarNum}>01</div>
              <h3 className={styles.pillarTitle}>Design for manufacture</h3>
              <p className={styles.pillarDesc}>
                Parts and assemblies engineered to be practical and economical to produce using standard cutting, machining, and bending tools.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarNum}>02</div>
              <h3 className={styles.pillarTitle}>Clear documentation</h3>
              <p className={styles.pillarDesc}>
                Well-organized 3D CAD assemblies, clean feature trees, standard datums, and comprehensive Bills of Materials.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarNum}>03</div>
              <h3 className={styles.pillarTitle}>Fast turnaround</h3>
              <p className={styles.pillarDesc}>
                Direct engineer-to-engineer communication at each milestone without sales intermediaries or bureaucratic delay.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarNum}>04</div>
              <h3 className={styles.pillarTitle}>Flexible support</h3>
              <p className={styles.pillarDesc}>
                Engineering assistance scaled to your exact requirements, from single custom brackets to complete mechanical assemblies.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarNum}>05</div>
              <h3 className={styles.pillarTitle}>Confidential handling</h3>
              <p className={styles.pillarDesc}>
                All proprietary sketches, conceptual geometries, and CAD files are treated with the utmost professional discretion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <CtaBand />
    </>
  );
}
