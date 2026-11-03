import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES } from '@/content/services';
import CtaBand from '@/components/CtaBand';
import styles from './Services.module.css';

export const metadata: Metadata = {
  title: 'Services | The MechLab Engineering',
  description:
    'Parametric 3D CAD, sheetmetal design, 2D drafting with GD&T, reverse engineering, fabrication support, and 3D printing services.',
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesPage() {
  return (
    <>
      <section className={styles.headerSection} aria-labelledby="services-page-title">
        <div className="container">
          <div className="section-label">01 / CAPABILITIES DIRECTORY</div>
          <h1 id="services-page-title" className={styles.pageTitle}>
            Mechanical Design &amp; Prototyping Services
          </h1>
          <p className={styles.pageLead}>
            The MechLab Engineering covers the complete path from first sketch to finished part. We combine practical design-for-manufacture experience with modern CAD and rapid 3D printing tools to deliver parts and assemblies that are rigid, efficient, and economical to produce.
          </p>
        </div>
      </section>

      {/* Ruled Services Directory */}
      <section className={styles.servicesGridSection} aria-label="Services List">
        <div className="container">
          <div className={styles.servicesStack}>
            {SERVICES.map((service, index) => (
              <article key={service.slug} className={styles.serviceItem}>
                <div className={styles.serviceMeta}>
                  <span className={styles.serviceIndex}>0{index + 1} {'//'} {service.code}</span>
                  <h2 className={styles.serviceHeading}>
                    <Link href={`/services/${service.slug}`} className={styles.serviceTitleLink}>
                      {service.title}
                    </Link>
                  </h2>
                  <p className={styles.serviceTagline}>{service.tagline}</p>
                </div>

                <div className={styles.serviceBody}>
                  <p className={styles.serviceSummary}>{service.summary}</p>

                  <div className={styles.deliverablesList}>
                    <div className={styles.deliverablesTitle}>CORE DELIVERABLES:</div>
                    <ul>
                      {service.deliverables.map((item, dIdx) => (
                        <li key={dIdx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.serviceActions}>
                    <Link href={`/services/${service.slug}`} className="btn-secondary" style={{ padding: '10px 18px', fontSize: '13px' }}>
                      Detailed Specification &amp; Flow →
                    </Link>
                    <Link href={`/quote?service=${service.slug}`} className="btn-primary" style={{ padding: '10px 18px', fontSize: '13px' }}>
                      Quote for {service.shortTitle}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <CtaBand />
    </>
  );
}
