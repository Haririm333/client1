import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import CtaBand from '@/components/CtaBand';
import styles from './Contact.module.css';

export const metadata: Metadata = {
  title: 'Contact Studio | The MechLab Engineering',
  description:
    'Contact The MechLab Engineering via email, phone, or WhatsApp. Send your requirement for mechanical design, 3D CAD, or 3D printing support.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <section className={styles.headerSection} aria-labelledby="contact-title">
        <div className="container">
          <div className="section-label">01 / GET IN TOUCH</div>
          <h1 id="contact-title" className={styles.pageTitle}>
            Let&apos;s Build Something Great
          </h1>
          <p className={styles.pageLead}>
            Send us your requirement and get a quick response. Whether you have a preliminary hand sketch, a physical sample needing reverse engineering, or complete CAD files requiring 2D drawings or 3D printing, we are ready to assist.
          </p>
        </div>
      </section>

      {/* 3 Direct Contact Cards */}
      <section className={styles.cardsSection} aria-label="Direct Communication Channels">
        <div className="container">
          <div className={styles.cardsGrid}>
            {/* Email Card */}
            <div className={styles.contactCard}>
              <div className={styles.cardTag}>ELECTRONIC MAIL</div>
              <h2 className={styles.cardTitle}>Direct Email</h2>
              <p className={styles.cardDescription}>
                Send project briefs, requirements, 2D PDF sketches, or STEP files directly to our engineering desk.
              </p>
              <a href="mailto:themechlabengineering@gmail.com" className={styles.directValue}>
                themechlabengineering@gmail.com
              </a>
              <div className={styles.cardAction}>
                <a href="mailto:themechlabengineering@gmail.com" className="btn-secondary" style={{ width: '100%' }}>
                  Send Email
                </a>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className={styles.contactCard}>
              <div className={styles.cardTag}>INSTANT MESSAGING</div>
              <h2 className={styles.cardTitle}>WhatsApp Chat</h2>
              <p className={styles.cardDescription}>
                Share photos of physical parts, quick dimensioned sketches, or chat directly with an engineer.
              </p>
              <a
                href="https://wa.me/918610241235"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.directValue}
              >
                +91 86102 41235
              </a>
              <div className={styles.cardAction}>
                <a
                  href="https://wa.me/918610241235"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ width: '100%' }}
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className={styles.contactCard}>
              <div className={styles.cardTag}>VOICE CONSULTATION</div>
              <h2 className={styles.cardTitle}>Direct Call</h2>
              <p className={styles.cardDescription}>
                Call our engineering desk directly for urgent inquiries, scope clarification, or design advice.
              </p>
              <a href="tel:+918610241235" className={styles.directValue}>
                +91 86102 41235
              </a>
              <div className={styles.cardAction}>
                <a href="tel:+918610241235" className="btn-secondary" style={{ width: '100%' }}>
                  Call Studio
                </a>
              </div>
            </div>
          </div>

          {/* Structured Quote Notice */}
          <div className={styles.quoteNoticeBox}>
            <div className={styles.quoteNoticeContent}>
              <div className="section-label">NEED A FORMAL SPECIFICATION QUOTE?</div>
              <h3 className={styles.quoteNoticeHeading}>Submit Full Project Parameters</h3>
              <p className={styles.quoteNoticeText}>
                Use our structured single-page quote form to specify service type, project stage, quantity, target deadline, and mechanical constraints.
              </p>
            </div>
            <Link href="/quote" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
              Open Quote Form →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <CtaBand />
    </>
  );
}
