import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { DISPATCH_ISSUES } from '@/content/dispatch';
import DispatchSignup from '@/components/DispatchSignup';
import styles from './Dispatch.module.css';

export const metadata: Metadata = {
  title: 'The MechLab Dispatch | Engineering Broadsheet',
  description:
    'The MechLab Dispatch: an independent technical newsletter covering DFM principles, GD&T drawing rules, sheetmetal, and rapid prototyping.',
  alternates: {
    canonical: '/dispatch',
    types: {
      'application/rss+xml': '/dispatch/feed.xml',
    },
  },
};

export default function DispatchLandingPage() {
  return (
    <article className="container" style={{ padding: 'clamp(48px, 6vw, 80px) 20px', maxWidth: '960px' }}>
      {/* Newspaper Broadsheet Masthead */}
      <header className={styles.masthead}>
        <div className={styles.doubleRuleTop} />
        <div className={styles.datelineRow}>
          <span>VOL. 1</span>
          <span>EST. 2026</span>
          <span>PUBLISHED FOR ENGINEERS</span>
          <span>FREE DISTRIBUTION</span>
        </div>
        <div className={styles.doubleRuleThin} />

        <h1 className={styles.mastheadTitle}>The MechLab Dispatch</h1>
        <p className={styles.tagline}>NOTES FROM THE DESIGN DESK</p>

        <div className={styles.doubleRuleBottom} />
      </header>

      {/* Intro Editorial Note */}
      <section className={styles.introSection}>
        <p className={styles.introLead}>
          <em>The MechLab Dispatch</em> is a technical broadsheet published by The MechLab Engineering. We write short, concrete bulletins on mechanical design, Design for Manufacture (DFM) rules, Geometric Dimensioning and Tolerancing (GD&amp;T), and workshop lessons. No sales spam, no sponsored posts, unsubscribe in one click.
        </p>
        <div className={styles.feedLinkRow}>
          <a href="/dispatch/feed.xml" className={styles.feedLink}>
            <span aria-hidden="true">📡</span> Technical RSS Feed
          </a>
        </div>
      </section>

      {/* Newsletter Signup Box */}
      <DispatchSignup />

      {/* Archive Index */}
      <section className={styles.archiveSection} aria-labelledby="archive-heading">
        <div className="section-label">ISSUE ARCHIVE</div>
        <h2 id="archive-heading" className={styles.archiveTitle}>
          Published Bulletins
        </h2>

        <div className={styles.issuesList}>
          {DISPATCH_ISSUES.map((issue) => (
            <article key={issue.issueNumber} className={styles.issueItem}>
              <div className={styles.issueMeta}>
                <span className={styles.issueVol}>{issue.volume}</span>
                <span className={styles.issueDate}>{issue.date}</span>
                <span className={styles.issueKicker}>{issue.kicker}</span>
              </div>

              <h3 className={styles.issueHeadline}>
                <Link href={`/dispatch/${issue.issueNumber}`} className={styles.issueLink}>
                  {issue.title}
                </Link>
              </h3>

              <p className={styles.issueSummary}>{issue.summary}</p>

              <div className={styles.issueActions}>
                <Link href={`/dispatch/${issue.issueNumber}`} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                  Read Issue {issue.issueNumber} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}
