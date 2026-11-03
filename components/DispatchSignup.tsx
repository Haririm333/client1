'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './DispatchSignup.module.css';

interface DispatchSignupProps {
  compact?: boolean;
}

export default function DispatchSignup({ compact = false }: DispatchSignupProps) {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/dispatch/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          hp_name: honeypot, // Honeypot trap field
        }),
      });

      if (response.status === 202 || response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMessage(data.error || 'Unable to process subscription. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Network connection error. Please try again.');
      setStatus('error');
    }
  };

  if (compact) {
    return (
      <div className={styles.compactNotice}>
        <div className={styles.doubleRuleTop} />
        <h3 className={styles.compactHeading}>The MechLab Dispatch</h3>
        <p className={styles.compactText}>Notes from the design desk. Free technical newsletter.</p>
        {status === 'success' ? (
          <p className={styles.successMessage}>
            Check your inbox to confirm your subscription.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.compactForm} noValidate>
            <div style={{ display: 'none' }} aria-hidden="true">
              <input
                type="text"
                name="hp_name"
                tabIndex={-1}
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="footer-dispatch-email" className="sr-only">
                Email Address
              </label>
              <input
                id="footer-dispatch-email"
                type="email"
                placeholder="engineer@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.emailInput}
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                className="btn-primary"
                disabled={status === 'loading'}
                style={{ padding: '8px 16px', minHeight: '38px', fontSize: '13px' }}
              >
                {status === 'loading' ? 'Sending…' : 'Subscribe'}
              </button>
            </div>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          </form>
        )}
        <div className={styles.doubleRuleBottom} />
      </div>
    );
  }

  return (
    <div className={styles.noticeBox} role="region" aria-labelledby="dispatch-notice-title">
      <div className={styles.doubleRuleTop} />
      <div className={styles.noticeInner}>
        <div className={styles.mastheadLabel}>THE MECHLAB DISPATCH // SUBSCRIPTION NOTICE</div>
        <h2 id="dispatch-notice-title" className={styles.noticeHeading}>
          Subscribe to the Dispatch. It&apos;s free.
        </h2>
        <p className={styles.noticeCopy}>
          Practical notes from our engineering desk: Design for Manufacture (DFM), GD&T drawing fundamentals, sheetmetal forming rules, and prototype considerations. No marketing fluff, no spam, unsubscribe in one click.
        </p>

        {status === 'success' ? (
          <div className={styles.successBox} role="status">
            <h3 className={styles.successHeading}>Confirmation Email Dispatched</h3>
            <p className={styles.successCopy}>
              We have sent a verification link to your email. Click the link within 24 hours to confirm your free subscription.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            {/* Honeypot field for bot deterrence */}
            <div style={{ display: 'none' }} aria-hidden="true">
              <input
                type="text"
                name="hp_name"
                tabIndex={-1}
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.fieldWrap}>
                <label htmlFor="dispatch-email" className={styles.fieldLabel}>
                  WORK EMAIL ADDRESS *
                </label>
                <input
                  id="dispatch-email"
                  type="email"
                  placeholder="engineer@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.input}
                  disabled={status === 'loading'}
                  aria-describedby={errorMessage ? 'dispatch-error' : 'dispatch-consent'}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={status === 'loading'}
                style={{ alignSelf: 'flex-end', height: '48px' }}
              >
                {status === 'loading' ? 'Processing…' : 'Subscribe to Dispatch'}
              </button>
            </div>

            {errorMessage && (
              <p id="dispatch-error" className={styles.errorMessage} role="alert">
                {errorMessage}
              </p>
            )}

            <p id="dispatch-consent" className={styles.consentText}>
              By subscribing, you agree to receive technical bulletins from The MechLab Engineering. We respect your privacy and will never share your address. See our{' '}
              <Link href="/privacy" className={styles.privacyLink}>
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        )}
      </div>
      <div className={styles.doubleRuleBottom} />
    </div>
  );
}
