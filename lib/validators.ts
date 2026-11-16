import { z } from 'zod';

const NIGERIAN_OR_INTL_PHONE_REGEX = /^(\+?234|0)?[789][01]\d{8}$|^\+?[1-9]\d{9,14}$/;

export const financingInterestSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Enter your full name (at least 2 characters).')
    .max(80, 'Full name must be 80 characters or fewer.')
    .refine((value) => /[a-zA-Z]{2,}/.test(value), {
      message: 'Please enter a valid full name.',
    }),
  email: z
    .string()
    .trim()
    .min(1, 'Email address is required.')
    .email('Enter a valid email address (e.g. name@domain.com).'),
  phoneNumber: z
    .string()
    .trim()
    .min(1, 'Phone number is required.')
    .transform((value) => value.replace(/[\s()-]/g, ''))
    .refine((normalized) => NIGERIAN_OR_INTL_PHONE_REGEX.test(normalized), {
      message: 'Enter a valid Nigerian or international phone number (e.g. 0803 123 4567).',
    }),
  repaymentPeriod: z.enum(['3', '6', '9', '12'], {
    message: 'Select a preferred repayment period.',
  }),
});
