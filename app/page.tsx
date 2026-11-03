import React from 'react';
import Link from 'next/link';
import FlangeCouplingDrawing from '@/components/drawings/FlangeCouplingDrawing';
import DispatchSignup from '@/components/DispatchSignup';
import CtaBand from '@/components/CtaBand';
import { SERVICES } from '@/content/services';
import { PROCESS_STEPS } from '@/content/process';
import styles from './Home.module.css';

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'The MechLab Engineering',
    alternateName: 'MechLab',
    slogan: 'DESIGN • ENGINEER • DELIVER',
    description:
      'Mechanical design studio specializing in 3D CAD modelling, sheetmetal design, 2D drafting and GD&T, reverse engineering, and 3D printing prototypes.',
    email: 'themechlabengineering@gmail.com',
    telephone: '+918610241235',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    sameAs: ['https://wa.me/918610241235'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 1. Hero Section */}
      <section className={styles.heroSection} aria-labelledby="hero-heading">
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className={styles.tagline}>DESIGN • ENGINEER • DELIVER</div>
              <h1 id="hero-heading" className={styles.heroTitle}>
                Engineering ideas, built to perform.
              </h1>
              <p className={styles.heroLead}>
                Product development, mechanical design, sheet metal, fabrication support and 3D printing — from first sketch to production-ready drawings.
              </p>
              <div className={styles.heroCtas}>
                <Link href="/quote" className="btn-primary">
                  Get a quote
                </Link>
                <Link href="#services" className="btn-secondary">
                  Our services
                </Link>
              </div>

              {/* Technical Specifications Quick Strip */}
              <div className={styles.quickSpecs}>
                <div className={styles.quickSpecItem}>
                  <span className={styles.specCode}>3D CAD</span>
                  <span className={styles.specDesc}>Parametric parts & assemblies</span>
                </div>
                <div className={styles.quickSpecItem}>
                  <span className={styles.specCode}>2D GD&T</span>
                  <span className={styles.specDesc}>Tolerances, fits & BOMs</span>
                </div>
                <div className={styles.quickSpecItem}>
                  <span className={styles.specCode}>3D PRINT</span>
                  <span className={styles.specDesc}>PLA, PETG & ABS prototypes</span>
                </div>
              </div>
            </div>

            {/* Drawing Linework Visual */}
            <div className={styles.heroDrawingCol}>
              <FlangeCouplingDrawing animate={true} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Services Ruled Directory Table */}
      <section id="services" className={styles.section} aria-labelledby="services-heading">
        <div className="container">
          <div className="section-header">
            <div className="section-label">02 / SERVICES</div>
            <h2 id="services-heading" className={styles.sectionTitle}>
              Engineering & Prototyping Capabilities
            </h2>
            <p className={styles.sectionLead}>
              The MechLab Engineering is a mechanical design studio that turns ideas into manufacturable products using modern CAD and 3D printing.
            </p>
          </div>

          <div className={styles.tableWrap} role="region" aria-label="Services Directory">
            <table className={styles.servicesTable}>
              <thead>
                <tr>
                  <th scope="col" style={{ width: '12%' }}>CODE</th>
                  <th scope="col" style={{ width: '28%' }}>SERVICE</th>
                  <th scope="col" style={{ width: '42%' }}>DELIVERABLES & SCOPE</th>
                  <th scope="col" style={{ width: '18%', textAlign: 'right' }}>SPECIFICATIONS</th>
                </tr>
              </thead>
              <tbody>
                {SERVICES.map((service) => (
                  <tr key={service.slug} className={styles.serviceRow}>
                    <td className={styles.codeCell}>{service.code}</td>
                    <td className={styles.titleCell}>
                      <Link href={`/services/${service.slug}`} className={styles.serviceLink}>
                        {service.title}
                      </Link>
                      <span className={styles.serviceTagline}>{service.tagline}</span>
                    </td>
                    <td className={styles.descCell}>{service.summary}</td>
                    <td className={styles.actionCell}>
                      <Link href={`/services/${service.slug}`} className={styles.tableLink}>
                        View Details →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. 5-Step Process Strip */}
      <section className={styles.processSection} aria-labelledby="process-heading">
        <div className="container">
          <div className="section-header">
            <div className="section-label">03 / HOW WE WORK</div>
            <h2 id="process-heading" className={styles.sectionTitle}>
              A Simple, Clear Process
            </h2>
            <p className={styles.sectionLead}>
              Close communication from the first sketch to the final deliverable.
            </p>
          </div>

          <div className={styles.processStrip}>
            {PROCESS_STEPS.map((step, idx) => (
              <div key={step.number} className={styles.processCard}>
                <div className={styles.stepNum}>{step.number}</div>
                <div className={styles.stepDimensionLine}>
                  <span className={styles.dimensionLabel}>{step.dimensionLabel}</span>
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepHeadline}>{step.headline}</p>
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className={styles.stepConnector} aria-hidden="true" />
                )}
              </div>
            ))}
          </div>

          <div className={styles.processFooterCta}>
            <Link href="/process" className="btn-secondary">
              View Detailed Process Breakdown
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Why Us Section */}
      <section className={styles.section} aria-labelledby="why-heading">
        <div className="container">
          <div className="section-header">
            <div className="section-label">04 / WHY US</div>
            <h2 id="why-heading" className={styles.sectionTitle}>
              Why Choose The MechLab Engineering
            </h2>
          </div>

          <div className={styles.whyGrid}>
            <div className={styles.whyList}>
              <div className={styles.whyItem}>
                <div className={styles.whyTick} aria-hidden="true">+</div>
                <div>
                  <h3 className={styles.whyTitle}>Design-for-manufacture mindset</h3>
                  <p className={styles.whyDesc}>Parts that are practical, rigid, and economical to machine, cut, or bend.</p>
                </div>
              </div>

              <div className={styles.whyItem}>
                <div className={styles.whyTick} aria-hidden="true">+</div>
                <div>
                  <h3 className={styles.whyTitle}>Clear, well-documented models and drawings</h3>
                  <p className={styles.whyDesc}>Well-organised 3D feature trees, standard GD&T datums, fits, and structured BOMs.</p>
                </div>
              </div>

              <div className={styles.whyItem}>
                <div className={styles.whyTick} aria-hidden="true">+</div>
                <div>
                  <h3 className={styles.whyTitle}>Fast turnaround and open communication</h3>
                  <p className={styles.whyDesc}>Direct engineer-to-engineer collaboration at every milestone without middlemen.</p>
                </div>
              </div>

              <div className={styles.whyItem}>
                <div className={styles.whyTick} aria-hidden="true">+</div>
                <div>
                  <h3 className={styles.whyTitle}>From one-off parts to complete assemblies</h3>
                  <p className={styles.whyDesc}>Flexible engineering support scaled to your exact project scope.</p>
                </div>
              </div>

              <div className={styles.whyItem}>
                <div className={styles.whyTick} aria-hidden="true">+</div>
                <div>
                  <h3 className={styles.whyTitle}>Confidential handling of your designs</h3>
                  <p className={styles.whyDesc}>Your proprietary sketches, models, and CAD files are handled with care.</p>
                </div>
              </div>
            </div>

            {/* Technical Verification Block */}
            <div className={styles.drawingSheetBox}>
              <div className={styles.drawingSheetHeader}>
                <span className={styles.boxTag}>STUDIO VERIFICATION STANDARDS</span>
                <span className={styles.boxRev}>ASME Y14.5 / ISO 1101</span>
              </div>
              <p className={styles.boxText}>
                We do not invent unverified claims or ratings. Every drawing produced is checked for fit, clearance, and tool access before drawing release.
              </p>
              <div className={styles.boxStandards}>
                <div className={styles.standardTag}>SOLIDWORKS-STYLE CAD</div>
                <div className={styles.standardTag}>GD&T PRODUCTION PRINTS</div>
                <div className={styles.standardTag}>DXF FLAT PATTERNS</div>
                <div className={styles.standardTag}>PLA / PETG / ABS PROTOTYPES</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The MechLab Dispatch Newsletter Notice */}
      <section className={styles.section} aria-labelledby="dispatch-section-heading">
        <div className="container">
          <div className="section-header">
            <div className="section-label">05 / THE MECHLAB DISPATCH</div>
            <h2 id="dispatch-section-heading" className={styles.sectionTitle}>
              Technical Notes From the Design Desk
            </h2>
          </div>
          <DispatchSignup />
        </div>
      </section>

      {/* 6. Page-Ending CTA Band */}
      <CtaBand />
    </>
  );
}
