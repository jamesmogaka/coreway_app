import { z } from 'zod';

export const shippingSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  county: z.string().min(1, 'County is required'),
  subcounty: z.string().min(1, 'Sub-county is required'),
  ward: z.string().min(1, 'Ward is required'),
  streetAddress: z.string().min(1, 'Street address is required'),
  areaCode: z.string(),
  phoneNumber: z.string().regex(/^\d+$/, 'Phone number must contain only digits').min(1, 'Phone number is required'),
});

export const paymentSchema = z.discriminatedUnion('paymentMethod', [
  z.object({
    paymentMethod: z.literal('visa'),
    cardName: z.string().min(1, 'Name on card is required'),
    cardNumber: z.string().regex(/^\d{16}$/, 'Card number must be 16 digits'),
    expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in MM/YY format'),
    cvv: z.string().regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),
    mpesaPhoneNumber: z.string().optional(),
  }),
  z.object({
    paymentMethod: z.literal('mpesa'),
    mpesaPhoneNumber: z.string().regex(/^\d{9,10}$/, 'M-PESA phone number must be 9 or 10 digits'),
    cardName: z.string().optional(),
    cardNumber: z.string().optional(),
    expiryDate: z.string().optional(),
    cvv: z.string().optional(),
  }),
]);
