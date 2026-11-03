import { z } from 'zod';

export const SERVICE_OPTIONS = [
  'mechanical-design-cad',
  'sheetmetal-design',
  'drafting-gdt',
  'reverse-engineering',
  'product-development',
  'fabrication-support',
  '3d-printing',
  'not-sure-yet',
] as const;

export const ASSET_STAGE_OPTIONS = [
  'idea-only',
  'sketch',
  'drawing-or-cad',
  'physical-part',
] as const;

export const QUANTITY_OPTIONS = [
  'one-off',
  'prototype-batch',
  'production-run',
  'not-sure',
] as const;

export const QuoteSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters')
    .regex(/^[a-zA-Z\s.'-]+$/, 'Name contains invalid characters'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid work email address')
    .max(254, 'Email must be under 254 characters'),
  phone: z
    .string()
    .trim()
    .max(30, 'Phone must be under 30 characters')
    .optional()
    .or(z.literal('')),
  company: z
    .string()
    .trim()
    .max(120, 'Company name must be under 120 characters')
    .optional()
    .or(z.literal('')),
  serviceNeeded: z.enum(SERVICE_OPTIONS, {
    message: 'Please select a valid service',
  }),
  assetStage: z.enum(ASSET_STAGE_OPTIONS, {
    message: 'Please indicate what design materials you currently have',
  }),
  quantity: z.enum(QUANTITY_OPTIONS, {
    message: 'Please select an estimated quantity',
  }),
  neededBy: z
    .string()
    .trim()
    .max(50, 'Deadline note must be under 50 characters')
    .default('Flexible'),
  projectDetails: z
    .string()
    .trim()
    .min(20, 'Project details must be at least 20 characters to allow engineering evaluation')
    .max(2000, 'Project details must be under 2000 characters'),
  consent: z
    .boolean()
    .refine((val) => val === true, 'You must agree to the privacy policy to submit'),
  turnstileToken: z.string().optional(),
  hp_website: z.string().optional(), // Honeypot field
  submitStartTime: z.number().optional(), // Minimum fill-time bot deterrence
});

export type QuoteInput = z.infer<typeof QuoteSchema>;

