import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DISPATCH_ISSUES } from '@/content/dispatch';
import DispatchSignup from '@/components/DispatchSignup';
import styles from './Issue.module.css';

interface IssuePageProps {
  params: Promise<{ issue: string }>;
}

export async function generateStaticParams() {
  return DISPATCH_ISSUES.map((item) => ({
    issue: item.issueNumber,
  }));
}

export async function generateMetadata({ params }: IssuePageProps): Promise<Metadata> {
  const { issue: issueParam } = await params;
  const issue = DISPATCH_ISSUES.find((i) => i.issueNumber === issueParam);

  if (!issue) {
    return { title: 'Issue Not Found' };
  }

  return {
    title: `Issue ${issue.issueNumber} | The MechLab Dispatch`,
    description: issue.summary,
    alternates: {
      canonical: `/dispatch/${issue.issueNumber}`,
    },
  };
}

export default async function DispatchIssuePage({ params }: IssuePageProps) {
  const { issue: issueParam } = await params;
  const issue = DISPATCH_ISSUES.find((i) => i.issueNumber === issueParam);

  if (!issue) {
    notFound();
  }

  const { leadStory, workbench, ruleOfThumb, classifieds, colophon } = issue;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: leadStory.title,
    description: issue.summary,
    datePublished: '2026-03-01T08:00:00+05:30',
    dateModified: '2026-03-01T08:00:00+05:30',
    publisher: {
      '@type': 'Organization',
      name: 'The MechLab Engineering',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/dispatch/${issue.issueNumber}`,
    },
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
        name: 'The MechLab Dispatch',
        item: `${siteUrl}/dispatch`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Issue ${issue.issueNumber}`,
        item: `${siteUrl}/dispatch/${issue.issueNumber}`,
      },
    ],
  };

  return (
    <article className="container" style={{ padding: 'clamp(48px, 6vw, 80px) 20px', maxWidth: '880px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Broadsheet Masthead */}
      <header className={styles.masthead}>
        <div className={styles.doubleRuleTop} />
        <div className={styles.datelineRow}>
          <span>{issue.volume}</span>
          <span>ISSUE NO. {issue.issueNumber}</span>
          <span>{issue.date}</span>
          <span>FREE BULLETIN</span>
        </div>
        <div className={styles.doubleRuleThin} />

        <div className={styles.mastheadLinkWrap}>
          <Link href="/dispatch" className={styles.mastheadTitle}>
            The MechLab Dispatch
          </Link>
        </div>
        <p className={styles.tagline}>NOTES FROM THE DESIGN DESK</p>
        <div className={styles.doubleRuleBottom} />
      </header>

      {/* Main Newspaper Content */}
      <div className={styles.broadsheet}>
        {/* Section 1: Lead Story */}
        <section className={styles.leadStorySection} aria-labelledby="lead-story-title">
          <div className={styles.kicker}>{leadStory.kicker}</div>
          <h1 id="lead-story-title" className={styles.leadStoryTitle}>
            {leadStory.title}
          </h1>

          <div className={styles.leadParagraph}>
            <span className={styles.dropCap} aria-hidden="true">
              {leadStory.leadDropCap}
            </span>
            <span>{leadStory.paragraphs[0]}</span>
          </div>

          {leadStory.paragraphs.slice(1).map((para, idx) => (
            <p key={idx} className={styles.bodyPara}>
              {para}
            </p>
          ))}
        </section>

        <div className={styles.sectionSeparator} />

        {/* Section 2: From the Workbench */}
        <section className={styles.workbenchSection} aria-labelledby="workbench-title">
          <div className={styles.kicker}>{workbench.kicker}</div>
          <h2 id="workbench-title" className={styles.sectionHeading}>
            {workbench.title}
          </h2>

          {workbench.paragraphs.map((p, idx) => (
            <p key={idx} className={styles.bodyPara}>
              {p}
            </p>
          ))}

          <div className={styles.checklistFrame}>
            <div className={styles.checklistTitle}>PRODUCTION DRAWING VERIFICATION CHECKLIST</div>
            <ul className={styles.checklistUl}>
              {workbench.checklist.map((item, idx) => (
                <li key={idx} className={styles.checklistItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className={styles.sectionSeparator} />

        {/* Section 3: Rule of Thumb (Boxed Single Rule) */}
        <aside className={styles.ruleOfThumbBox} aria-label="Rule of Thumb">
          <div className={styles.ruleTag}>RULE OF THUMB // DESIGN FOR MANUFACTURE</div>
          <h3 className={styles.ruleTitle}>{ruleOfThumb.title}</h3>
          <blockquote className={styles.ruleQuote}>
            &ldquo;{ruleOfThumb.rule}&rdquo;
          </blockquote>
          <p className={styles.standardRef}>
            <strong>Reference:</strong> {ruleOfThumb.standardReference}
          </p>
          <p className={styles.ruleExplanation}>{ruleOfThumb.explanation}</p>
        </aside>

        <div className={styles.sectionSeparator} />

        {/* Section 4: Classifieds */}
        <section className={styles.classifiedsBox} aria-labelledby="classifieds-title">
          <div className={styles.classifiedsLabel}>STUDIO CLASSIFIEDS</div>
          <h3 id="classifieds-title" className={styles.classifiedsTitle}>
            {classifieds.title}
          </h3>
          <p className={styles.classifiedsNotice}>{classifieds.notice}</p>
          <div className={styles.classifiedsAction}>
            <Link href={classifieds.actionUrl} className="btn-primary" style={{ padding: '10px 20px', fontSize: '13px' }}>
              {classifieds.actionLabel} →
            </Link>
          </div>
        </section>

        {/* Section 5: Colophon */}
        <footer className={styles.colophon}>
          <div className={styles.colophonHeader}>COLOPHON</div>
          <p className={styles.colophonText}>
            Published by <strong>{colophon.publishedBy}</strong>.<br />
            Direct engineering inquiries: <a href={`mailto:${colophon.contactEmail}`}>{colophon.contactEmail}</a> · <a href={`tel:${colophon.contactPhone.replace(/\s+/g, '')}`}>{colophon.contactPhone}</a>.<br />
            {colophon.notes}
          </p>
          <div className={styles.colophonLinks}>
            <Link href="/dispatch">Archive Index</Link>
            <span>·</span>
            <Link href="/dispatch/unsubscribe">Unsubscribe from Dispatch</Link>
            <span>·</span>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </footer>
      </div>

      {/* Subscription Callout at bottom */}
      <div style={{ marginTop: 'var(--space-64)' }}>
        <DispatchSignup />
      </div>
    </article>
  );
}
