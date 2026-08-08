import type { z } from 'zod';
import type { CONTACT_FORM_SCHEMA } from '@/lib/contact-schema';

export type ContactFormValues = z.infer<typeof CONTACT_FORM_SCHEMA>;

export type ContactSubmitResult = {
  message: string;
};

export type ContactSubmitFieldErrors = Partial<Record<keyof ContactFormValues, string[]>>;
