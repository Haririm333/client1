import { describe, it, expect } from 'vitest';
import { QuoteSchema } from '@/lib/quoteSchema';

describe('Quote Schema Validation', () => {
  const validData = {
    name: 'Rajesh Kumar',
    email: 'rajesh@manufacturing.in',
    phone: '+91 98765 43210',
    company: 'Precision Components Pvt Ltd',
    serviceNeeded: 'sheetmetal-design',
    assetStage: 'sketch',
    quantity: 'prototype-batch',
    neededBy: '2 weeks',
    projectDetails: 'We need a mild steel enclosure with 3 flanges, 2mm thickness, and bend relief details.',
    consent: true,
  };

  it('validates a complete, well-formed quote request', () => {
    const res = QuoteSchema.safeParse(validData);
    expect(res.success).toBe(true);
  });

  it('rejects short project details (< 20 chars)', () => {
    const invalid = { ...validData, projectDetails: 'Need gear' };
    const res = QuoteSchema.safeParse(invalid);
    expect(res.success).toBe(false);
    if (!res.success) {
      expect(res.error.issues[0].message).toContain('at least 20 characters');
    }
  });

  it('rejects invalid email formats', () => {
    const invalid = { ...validData, email: 'not-an-email' };
    const res = QuoteSchema.safeParse(invalid);
    expect(res.success).toBe(false);
  });

  it('rejects unselected consent', () => {
    const invalid = { ...validData, consent: false };
    const res = QuoteSchema.safeParse(invalid);
    expect(res.success).toBe(false);
  });

  it('allows optional phone and company fields to be empty', () => {
    const withoutOptional = {
      ...validData,
      phone: '',
      company: '',
    };
    const res = QuoteSchema.safeParse(withoutOptional);
    expect(res.success).toBe(true);
  });
});

