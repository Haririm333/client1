import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SERVICES } from '@/content/services';
import DrawingRenderer from '@/components/drawings/DrawingRenderer';
import CtaBand from '@/components/CtaBand';
import styles from './ServiceDetail.module.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return { title: 'Service Not Found' };
  }

  return {
    title: `${service.shortTitle} | The MechLab Engineering`,
    description: service.summary.slice(0, 150) + '...',
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.shortTitle} | The MechLab Engineering`,
      description: service.tagline,
      url: `/services/${service.slug}`,
      type: 'website',
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const related = SERVICES.filter((s) => service.relatedServices.includes(s.slug));
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.summary,
    provider: {
      '@type': 'ProfessionalService',
      name: 'The MechLab Engineering',
      url: siteUrl,
      telephone: '+918610241235',
      email: 'themechlabengineering@gmail.com',
    },
    url: `${siteUrl}/services/${service.slug}`,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${siteUrl}/services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.shortTitle,
        item: `${siteUrl}/services/${service.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Service Header */}
      <section className={styles.headerSection} aria-labelledby="service-title">
        <div className="container">
          <div className={styles.breadcrumb}>
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <Link href="/services" className={styles.breadcrumbLink}>Services</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>{service.code}</span>
          </div>

          <div className="section-label">{service.code} {'//'} DETAILED SPECIFICATION</div>
          <h1 id="service-title" className={styles.serviceTitle}>
            {service.title}
          </h1>
          <p className={styles.serviceTagline}>{service.tagline}</p>
          <p className={styles.serviceSummary}>{service.summary}</p>

          <div className={styles.headerCtas}>
            <Link href={`/quote?service=${service.slug}`} className="btn-primary">
              Get a quote for {service.shortTitle}
            </Link>
            <a
              href={`https://wa.me/918610241235?text=${encodeURIComponent(service.prefilledWhatsApp)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Main Technical Breakdown: What You Receive & What We Need */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.specGrid}>
            {/* Column 1: What You Receive */}
            <div className={styles.specCard}>
              <div className={styles.specCardHeader}>
                <span className={styles.cardTag}>OUTPUT DELIVERABLES</span>
                <h2 className={styles.cardHeading}>What You Receive</h2>
              </div>
              <ul className={styles.specList}>
                {service.deliverables.map((item, idx) => (
                  <li key={idx} className={styles.specListItem}>
                    <span className={styles.bulletCheck} aria-hidden="true">✔</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: What We Need From You */}
            <div className={styles.specCard}>
              <div className={styles.specCardHeader}>
                <span className={styles.cardTag}>CLIENT INPUT REQUIREMENTS</span>
                <h2 className={styles.cardHeading}>What We Need From You</h2>
              </div>
              <ul className={styles.specList}>
                {service.clientRequirements.map((item, idx) => (
                  <li key={idx} className={styles.specListItem}>
                    <span className={styles.bulletInput} aria-hidden="true">➔</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Typical Engineering Execution Flow */}
      <section className={styles.flowSection} aria-labelledby="flow-heading">
        <div className="container">
          <div className="section-header">
            <div className="section-label">02 / EXECUTION TIMELINE</div>
            <h2 id="flow-heading" className={styles.sectionHeading}>
              Typical Engineering Workflow
            </h2>
          </div>

          <div className={styles.flowGrid}>
            {service.typicalFlow.map((step) => (
              <div key={step.step} className={styles.flowCard}>
                <div className={styles.flowStepNum}>{step.step}</div>
                <h3 className={styles.flowStepTitle}>{step.title}</h3>
                <p className={styles.flowStepDesc}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Associated Representative Component Illustration (if applicable) */}
      {service.relatedWorkSlug && (
        <section className={styles.drawingSection} aria-labelledby="drawing-heading">
          <div className="container">
            <div className={styles.drawingGrid}>
              <div className={styles.drawingInfo}>
                <div className="section-label">03 / REPRESENTATIVE WORK</div>
                <h2 id="drawing-heading" className={styles.sectionHeading}>
                  Representative Component Sample
                </h2>
                <p className={styles.drawingLead}>
                  Custom designs are engineered to your exact specifications. Below is an engineering drawing detailing fits, dimensions, and manufacturing standards typical for this service category.
                </p>
                <div className={styles.drawingLinks}>
                  <Link href="/work" className="btn-secondary">
                    View Complete Part Portfolio
                  </Link>
                </div>
              </div>
              <div className={styles.drawingContainer}>
                <DrawingRenderer type={service.relatedWorkSlug} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      {related.length > 0 && (
        <section className={styles.relatedSection} aria-labelledby="related-heading">
          <div className="container">
            <div className="section-header">
              <div className="section-label">04 / RELATED CAPABILITIES</div>
              <h2 id="related-heading" className={styles.sectionHeading}>
                Related Engineering Services
              </h2>
            </div>

            <div className={styles.relatedGrid}>
              {related.map((rel) => (
                <div key={rel.slug} className={styles.relatedCard}>
                  <span className={styles.relatedCode}>{rel.code}</span>
                  <h3 className={styles.relatedTitle}>
                    <Link href={`/services/${rel.slug}`}>{rel.title}</Link>
                  </h3>
                  <p className={styles.relatedSummary}>{rel.tagline}</p>
                  <Link href={`/services/${rel.slug}`} className={styles.relatedLink}>
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Page Ending CTA Band with Preselected Service */}
      <CtaBand
        heading={`Send us your requirement for ${service.shortTitle}`}
        lead={`Whether you have a concept sketch, a physical sample, or an existing CAD assembly, we work closely with you from first sketch to final deliverable.`}
        preselectedService={service.slug}
      />
    </>
  );
}
