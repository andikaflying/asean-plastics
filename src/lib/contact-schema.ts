import { z } from 'zod';
import { MESSAGE_MAX_LENGTH } from '@/constants/contact';

export const CONTACT_FORM_SCHEMA = z.object({
  fullName: z.string().trim().min(1, 'Full name is required'),
  email: z.email('Enter a valid e-mail address'),
  affiliation: z.string().trim().min(1, 'Affiliation is required'),
  country: z.string().trim().min(1, 'Country is required'),
  subject: z.string().min(1, 'Select a subject'),
  message: z
    .string()
    .trim()
    .min(1, 'Message is required')
    .max(MESSAGE_MAX_LENGTH, `Message must be ${MESSAGE_MAX_LENGTH} characters or fewer`),
});
