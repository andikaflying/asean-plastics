import { getBaseUrl } from '@/lib/get-base-url';
import type {
  ContactFormValues,
  ContactSubmitFieldErrors,
  ContactSubmitResult,
} from '@/types/contact';

export class ContactValidationError extends Error {
  fieldErrors: ContactSubmitFieldErrors;

  constructor(fieldErrors: ContactSubmitFieldErrors) {
    super('Contact form validation failed');
    this.name = 'ContactValidationError';
    this.fieldErrors = fieldErrors;
  }
}

export async function submitContactMessage(
  values: ContactFormValues,
): Promise<ContactSubmitResult> {
  const response = await fetch(`${getBaseUrl()}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });

  if (response.status === 422) {
    const { fieldErrors } = (await response.json()) as { fieldErrors: ContactSubmitFieldErrors };
    throw new ContactValidationError(fieldErrors);
  }

  if (!response.ok) {
    throw new Error('Failed to submit the contact form');
  }

  return response.json() as Promise<ContactSubmitResult>;
}
