import { z } from 'zod';

export const paymentMethodEnum = z.enum(['paypal', 'bank_transfer', 'whatsapp']);

// 1. Ticket (Delegate) Schema
export const ticketSchema = z.object({
  type: z.literal('ticket'),
  packageId: z.string(), // e.g., 'early-bird', 'standard'
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(1, 'Company name is required'),
  role: z.string().min(1, 'Role/Job Title is required'),
  paymentMethod: paymentMethodEnum,
});

// 2. Booth Schema
export const boothSchema = z.object({
  type: z.literal('booth'),
  packageId: z.string(), // e.g., 'tabletop', 'standard-booth', 'premium-booth'
  company: z.string().min(1, 'Company name is required'),
  contactName: z.string().min(2, 'Contact name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(5, 'Phone number is required'),
  industry: z.string().optional(),
  paymentMethod: paymentMethodEnum,
});

// 3. Sponsorship Schema
export const sponsorshipSchema = z.object({
  type: z.literal('sponsorship'),
  packageId: z.string(), // e.g., 'title-sponsor', 'event-partner'
  company: z.string().min(1, 'Company name is required'),
  contactName: z.string().min(2, 'Contact name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(5, 'Phone number is required'),
  website: z.string().url('Please enter a valid URL (e.g. https://company.com)').optional().or(z.literal('')),
  objective: z.string().optional(),
  paymentMethod: paymentMethodEnum,
});

export const checkoutSchema = z.discriminatedUnion('type', [
  ticketSchema,
  boothSchema,
  sponsorshipSchema,
]);

export type TicketPayload = z.infer<typeof ticketSchema>;
export type BoothPayload = z.infer<typeof boothSchema>;
export type SponsorshipPayload = z.infer<typeof sponsorshipSchema>;
export type CheckoutPayload = z.infer<typeof checkoutSchema>;
