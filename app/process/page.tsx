import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PROCESS_STEPS } from '@/content/process';
import CtaBand from '@/components/CtaBand';
import styles from './Process.module.css';

export const metadata: Metadata = {
  title: '5-Step Process | The MechLab Engineering',
  description:
    'Our structured 5-step mechanical workflow: Requirement, Concept, Modelling, Drawings, and Print & Support. From first sketch to final deliverable.',
  alternates: {
    canonical: '/process',
  },
};

export default function ProcessPage() {
  return (
    <>
      <section className={styles.headerSection} aria-labelledby="process-title">
        <div className="container">
          <div className="section-label">01 / HOW WE WORK</div>
          <h1 id="process-title" className={styles.pageTitle}>
            A Simple, Clear Engineering Process
          </h1>
          <p className={styles.pageLead}>
            Close communication from first sketch to final deliverable. Every engineering milestone is gated by digital verification, ensuring parts are functional, interference-free, and economical to manufacture before production.
          </p>
        </div>
      </section>

      {/* 5-Step Process Breakdown */}
      <section className={styles.processSection} aria-label="Process Step Details">
        <div className="container">
          <div className={styles.stepsStack}>
            {PROCESS_STEPS.map((step, idx) => (
              <div key={step.number} className={styles.stepBlock}>
                {/* Visual Dimension Connector Line */}
                <div className={styles.dimensionStrip}>
                  <div className={styles.dimEndTick} />
                  <div className={styles.dimLine}>
                    <span className={styles.dimText}>STAGE {step.number} {'//'} {step.dimensionLabel}</span>
                  </div>
                  <div className={styles.dimEndTick} />
                </div>

                <div className={styles.stepMain}>
                  <div className={styles.stepNumCol}>
                    <span className={styles.largeNumber}>{step.number}</span>
                    <span className={styles.stepLabel}>PHASE</span>
                  </div>

                  <div className={styles.stepContentCol}>
                    <h2 className={styles.stepTitle}>{step.title}</h2>
                    <p className={styles.stepHeadline}>{step.headline}</p>
                    <p className={styles.stepDescription}>{step.description}</p>

                    <div className={styles.ioGrid}>
                      <div className={styles.ioBox}>
                        <span className={styles.ioTitle}>INPUTS REQUIRED:</span>
                        <ul>
                          {step.inputs.map((inItem, i) => (
                            <li key={i}>{inItem}</li>
                          ))}
                        </ul>
                      </div>

                      <div className={styles.ioBox}>
                        <span className={styles.ioTitle}>PHASE DELIVERABLES:</span>
                        <ul>
                          {step.outputs.map((outItem, o) => (
                            <li key={o}>{outItem}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {idx < PROCESS_STEPS.length - 1 && (
                  <div className={styles.verticalTransitionLine} aria-hidden="true">
                    <span className={styles.transitionArrow}>▼</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.summaryBox}>
            <h3 className={styles.summaryTitle}>Engineering Verification at Every Stage</h3>
            <p className={styles.summaryText}>
              By conducting interference checks during 3D CAD modelling and establishing strict datums during 2D drafting, we eliminate ambiguity before parts reach the shop floor.
            </p>
            <div className={styles.summaryCtas}>
              <Link href="/quote" className="btn-primary">
                Start with Step 01: Share your requirement
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <CtaBand />
    </>
  );
}
