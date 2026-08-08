'use client';

import { useRef } from 'react';
import { useForm, useWatch, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@/components/common/design-system/TextField';
import { Textarea } from '@/components/common/design-system/Textarea';
import { Select } from '@/components/common/design-system/Select';
import { Button } from '@/components/common/design-system/Button';
import { Typography } from '@/components/common/design-system/Typography';
import { CONTACT_FORM_SCHEMA } from '@/lib/contact-schema';
import { SUBJECT_OPTIONS, MESSAGE_MAX_LENGTH } from '@/constants/contact';
import { useSubmitContact } from '@/hooks/useSubmitContact';
import { ContactValidationError } from '@/services/contact';
import type { ContactFormValues } from '@/types/contact';
import { RecaptchaMock } from './RecaptchaMock';

const DEFAULT_VALUES: ContactFormValues = {
  fullName: '',
  email: '',
  affiliation: '',
  country: '',
  subject: '',
  message: '',
};

export function ContactForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(CONTACT_FORM_SCHEMA),
    defaultValues: DEFAULT_VALUES,
  });
  const submitContact = useSubmitContact();
  const resultRef = useRef<HTMLDivElement>(null);
  const messageValue = useWatch({ control, name: 'message' });

  async function onSubmit(values: ContactFormValues) {
    submitContact.reset();

    try {
      await submitContact.mutateAsync(values);
      reset(DEFAULT_VALUES);
    } catch (error) {
      if (error instanceof ContactValidationError) {
        for (const [field, messages] of Object.entries(error.fieldErrors)) {
          if (messages?.[0]) {
            setError(field as keyof ContactFormValues, { message: messages[0] });
          }
        }
      }
    } finally {
      resultRef.current?.focus();
    }
  }

  return (
    <form
      noValidate
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      className="border-grey-200 flex flex-col gap-6 rounded-xl border bg-white px-8 py-6"
    >
      <Typography as="h2" size="xl" weight="semibold">
        Send Us a Message
      </Typography>

      <div className="flex flex-col gap-4">
        <TextField
          label="Full name"
          isRequired
          error={errors.fullName?.message}
          {...register('fullName')}
        />
        <TextField
          label="E-mail address"
          type="email"
          isRequired
          error={errors.email?.message}
          {...register('email')}
        />
        <TextField
          label="Affiliation"
          isRequired
          error={errors.affiliation?.message}
          {...register('affiliation')}
        />
        <TextField
          label="Country"
          isRequired
          error={errors.country?.message}
          {...register('country')}
        />
        <Controller
          control={control}
          name="subject"
          render={({ field }) => (
            <Select
              label="Subject"
              isRequired
              options={SUBJECT_OPTIONS}
              value={field.value}
              onValueChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              error={errors.subject?.message}
            />
          )}
        />
        <Textarea
          label="Message"
          isRequired
          maxLength={MESSAGE_MAX_LENGTH}
          error={errors.message?.message}
          {...register('message')}
          value={messageValue}
        />
      </div>

      <RecaptchaMock />

      <div ref={resultRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {submitContact.isSuccess && (
          <Typography as="p" size="base" weight="semibold" className="text-blue-500">
            Thanks — your message has been received. We&apos;ll be in touch soon.
          </Typography>
        )}
        {submitContact.isError && (
          <Typography as="p" size="base" weight="semibold" color="danger">
            Something went wrong sending your message. Please try again.
          </Typography>
        )}
      </div>

      <Button type="submit" variant="primary" isLoading={isSubmitting} className="self-start">
        Submit
      </Button>
    </form>
  );
}
