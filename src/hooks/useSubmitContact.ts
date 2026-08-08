'use client';

import { useMutation } from '@tanstack/react-query';
import { submitContactMessage } from '@/services/contact';
import { CONTACT_KEYS } from '@/constants/query-keys';

export function useSubmitContact() {
  return useMutation({
    mutationKey: [...CONTACT_KEYS.submit],
    mutationFn: submitContactMessage,
  });
}
