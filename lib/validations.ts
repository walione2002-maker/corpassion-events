import { z } from 'zod';

export const passTypeEnum = z.enum(['early-bird', 'standard']);
export const paymentMethodEnum = z.enum(['paypal', 'bank_transfer', 'whatsapp']);

export const checkoutSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(1, 'Company name is required'),
  role: z.string().min(1, 'Role/Job Title is required'),
  passType: passTypeEnum,
  paymentMethod: paymentMethodEnum,
});

export type CheckoutPayload = z.infer<typeof checkoutSchema>;
