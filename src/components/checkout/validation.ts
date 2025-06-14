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
