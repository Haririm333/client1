'use client';

import React, { useState, useEffect, useRef, useTransition, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { QuoteSchema, SERVICE_OPTIONS, ASSET_STAGE_OPTIONS, QUANTITY_OPTIONS } from '@/lib/quoteSchema';
import styles from './Quote.module.css';

function QuoteFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const preselectedService = searchParams.get('service') || '';
  const initialService = SERVICE_OPTIONS.includes(preselectedService as any)
    ? preselectedService
    : 'mechanical-design-cad';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceNeeded: initialService,
    assetStage: 'sketch',
    quantity: 'one-off',
    neededBy: 'Flexible',
    projectDetails: '',
    consent: false,
    hp_website: '',
  });

  const [startTime] = useState<number>(() => Date.now());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string>('');
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (preselectedService && SERVICE_OPTIONS.includes(preselectedService as any)) {
      setFormData((prev) => ({ ...prev, serviceNeeded: preselectedService }));
    }
  }, [preselectedService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    const payload = {
      ...formData,
      submitStartTime: startTime,
      turnstileToken: 'mock-token-client',
    };

    const result = QuoteSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const fieldName = err.path[0] as string;
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = err.message;
        }
      });
      setErrors(fieldErrors);
      if (errorSummaryRef.current) {
        errorSummaryRef.current.focus();
      }
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch('/api/quote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          setServerError(data.error || 'Failed to submit quote request. Please try again.');
          if (errorSummaryRef.current) {
            errorSummaryRef.current.focus();
          }
          return;
        }

        router.push(data.redirect || '/thank-you');
      } catch {
        setServerError('Network error. Please try again or reach us via email directly.');
      }
    });
  };

  return (
    <div className="container" style={{ padding: 'clamp(48px, 6vw, 80px) 20px', maxWidth: '840px' }}>
      <div className="section-label">01 / FORMAL QUOTE REQUEST</div>
      <h1 className={styles.title}>Request an Engineering Project Quote</h1>
      <p className={styles.lead}>
        Tell us about your requirements. From one-off parts to complete production drawing packages, we will evaluate your design parameters and respond with a clear path forward.
      </p>

      {/* Direct File Guidance Callout */}
      <div className={styles.fileNotice}>
        <span className={styles.fileNoticeIcon} aria-hidden="true">💡</span>
        <div className={styles.fileNoticeText}>
          <strong>Have CAD files, 2D drawings, or photos ready?</strong>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--muted)' }}>
            To keep submissions secure and stateless, we don&apos;t require file uploads here. After submitting this form, you can email STEP/PDF files directly to{' '}
            <a href="mailto:themechlabengineering@gmail.com" style={{ color: 'var(--blue-deep)' }}>themechlabengineering@gmail.com</a>{' '}
            or share them via{' '}
            <a href="https://wa.me/918610241235" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue-deep)' }}>WhatsApp (+91 86102 41235)</a>.
          </p>
        </div>
      </div>

      {/* Error Summary */}
      {(Object.keys(errors).length > 0 || serverError) && (
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          className={styles.errorSummary}
          role="alert"
          aria-labelledby="error-summary-heading"
        >
          <h2 id="error-summary-heading" className={styles.errorSummaryTitle}>
            Please review the following items:
          </h2>
          <ul>
            {serverError && <li>{serverError}</li>}
            {Object.entries(errors).map(([field, msg]) => (
              <li key={field}>
                <a href={`#field-${field}`}>{msg}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Quote Form */}
      <form onSubmit={handleSubmit} noValidate className={styles.form}>
        {/* Honeypot field (hidden from assistive tech) */}
        <div style={{ display: 'none' }} aria-hidden="true">
          <label htmlFor="hp_website">Website</label>
          <input
            id="hp_website"
            type="text"
            name="hp_website"
            tabIndex={-1}
            value={formData.hp_website}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>

        {/* 1. Contact Information Row */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>1. Contact Information</legend>
          <div className={styles.fieldGrid}>
            <div className={styles.fieldGroup}>
              <label htmlFor="field-name" className={styles.label}>
                FULL NAME <span className={styles.required}>*</span>
              </label>
              <input
                id="field-name"
                name="name"
                type="text"
                required
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                value={formData.name}
                onChange={handleChange}
                aria-describedby={errors.name ? 'error-name' : undefined}
                aria-invalid={!!errors.name}
              />
              {errors.name && <span id="error-name" className={styles.fieldError}>{errors.name}</span>}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="field-email" className={styles.label}>
                WORK EMAIL <span className={styles.required}>*</span>
              </label>
              <input
                id="field-email"
                name="email"
                type="email"
                required
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                value={formData.email}
                onChange={handleChange}
                aria-describedby={errors.email ? 'error-email' : undefined}
                aria-invalid={!!errors.email}
              />
              {errors.email && <span id="error-email" className={styles.fieldError}>{errors.email}</span>}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="field-phone" className={styles.label}>
                PHONE / WHATSAPP
              </label>
              <input
                id="field-phone"
                name="phone"
                type="tel"
                placeholder="+91..."
                className={styles.input}
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="field-company" className={styles.label}>
                COMPANY / ORGANISATION
              </label>
              <input
                id="field-company"
                name="company"
                type="text"
                className={styles.input}
                value={formData.company}
                onChange={handleChange}
              />
            </div>
          </div>
        </fieldset>

        {/* 2. Service Scope */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>2. Service &amp; Stage</legend>
          <div className={styles.fieldGrid}>
            <div className={styles.fieldGroup}>
              <label htmlFor="field-serviceNeeded" className={styles.label}>
                PRIMARY SERVICE NEEDED <span className={styles.required}>*</span>
              </label>
              <select
                id="field-serviceNeeded"
                name="serviceNeeded"
                className={styles.select}
                value={formData.serviceNeeded}
                onChange={handleChange}
              >
                <option value="mechanical-design-cad">Mechanical Design &amp; 3D CAD</option>
                <option value="sheetmetal-design">Sheetmetal Design</option>
                <option value="drafting-gdt">2D Drafting &amp; GD&amp;T</option>
                <option value="reverse-engineering">Reverse Engineering</option>
                <option value="product-development">Product Development</option>
                <option value="fabrication-support">Fabrication Support</option>
                <option value="3d-printing">3D Printing &amp; Prototyping</option>
                <option value="not-sure-yet">Not sure yet / Needs consultation</option>
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="field-assetStage" className={styles.label}>
                WHAT DO YOU CURRENTLY HAVE? <span className={styles.required}>*</span>
              </label>
              <select
                id="field-assetStage"
                name="assetStage"
                className={styles.select}
                value={formData.assetStage}
                onChange={handleChange}
              >
                <option value="idea-only">Idea or functional requirement only</option>
                <option value="sketch">Hand sketch or dimensional drawing</option>
                <option value="drawing-or-cad">Existing 2D CAD or 3D model</option>
                <option value="physical-part">Existing physical part (needs reverse engineering)</option>
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="field-quantity" className={styles.label}>
                ESTIMATED QUANTITY
              </label>
              <select
                id="field-quantity"
                name="quantity"
                className={styles.select}
                value={formData.quantity}
                onChange={handleChange}
              >
                <option value="one-off">One-off / Single part design</option>
                <option value="prototype-batch">Prototype batch (2 - 10 parts)</option>
                <option value="production-run">Production volume run</option>
                <option value="not-sure">Not sure yet</option>
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="field-neededBy" className={styles.label}>
                TARGET DEADLINE
              </label>
              <input
                id="field-neededBy"
                name="neededBy"
                type="text"
                placeholder="e.g. Flexible or within 2 weeks"
                className={styles.input}
                value={formData.neededBy}
                onChange={handleChange}
              />
            </div>
          </div>
        </fieldset>

        {/* 3. Project Details */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>3. Technical Specifications</legend>
          <div className={styles.fieldGroup}>
            <label htmlFor="field-projectDetails" className={styles.label}>
              PROJECT DETAILS &amp; CONSTRAINTS <span className={styles.required}>*</span>
            </label>
            <p className={styles.fieldHint}>
              Describe your part, assembly, or mechanism. Helpful details include target envelope dimensions, operating loads, preferred materials (e.g., mild steel, aluminum, PLA/PETG), and operating environment.
            </p>
            <textarea
              id="field-projectDetails"
              name="projectDetails"
              rows={6}
              required
              className={`${styles.textarea} ${errors.projectDetails ? styles.inputError : ''}`}
              value={formData.projectDetails}
              onChange={handleChange}
              placeholder="Provide a description of what you need engineered..."
              aria-describedby={errors.projectDetails ? 'error-details' : undefined}
              aria-invalid={!!errors.projectDetails}
            />
            <div className={styles.charCount}>
              {formData.projectDetails.length} / 2000 characters (min. 20)
            </div>
            {errors.projectDetails && (
              <span id="error-details" className={styles.fieldError}>
                {errors.projectDetails}
              </span>
            )}
          </div>
        </fieldset>

        {/* 4. Confidentiality & Consent */}
        <div className={styles.consentGroup}>
          <label className={styles.checkboxLabel}>
            <input
              id="field-consent"
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className={styles.checkbox}
              aria-describedby={errors.consent ? 'error-consent' : undefined}
            />
            <span className={styles.checkboxText}>
              I understand that all drawings and project details are handled confidentially with care, and I agree to the{' '}
              <Link href="/privacy" className={styles.link}>
                Privacy Policy
              </Link>
              . <span className={styles.required}>*</span>
            </span>
          </label>
          {errors.consent && (
            <span id="error-consent" className={styles.fieldError}>
              {errors.consent}
            </span>
          )}
        </div>

        {/* Submit Actions */}
        <div className={styles.submitRow}>
          <button
            type="submit"
            className="btn-primary"
            disabled={isPending}
            style={{ minWidth: '220px', height: '48px' }}
          >
            {isPending ? 'Sending details…' : 'Send project details'}
          </button>
          <span className={styles.submitNote}>
            Direct response · No marketing calls
          </span>
        </div>
      </form>
    </div>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '80px 20px' }}>Loading quote form...</div>}>
      <QuoteFormContent />
    </Suspense>
  );
}

