'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { REPAYMENT_PERIOD_OPTIONS } from '@/constants';
import {
  formatNaira,
  generateReferenceCode,
} from '@/lib/utils';
import { financingInterestSchema } from '@/lib/validators';
import type { Device } from '@/types/device';
import type {
  FinancingInterestFormValues,
  FinancingSubmissionReceipt,
} from '@/types/financing';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

export interface FinancingInterestFormProps {
  device: Device;
  totalPriceNgn: number;
  isOutOfStock: boolean;
  onCloseModal: () => void;
}

export function FinancingInterestForm({
  device,
  totalPriceNgn,
  isOutOfStock,
  onCloseModal,
}: FinancingInterestFormProps) {
  const [receipt, setReceipt] = useState<FinancingSubmissionReceipt | null>(
    null
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FinancingInterestFormValues>({
    resolver: zodResolver(financingInterestSchema),
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      repaymentPeriod: '6',
    },
  });

  const selectedPeriod = useWatch({
    control,
    name: 'repaymentPeriod',
  });
  const months = Number(selectedPeriod || 6);


  const onSubmit = async (values: FinancingInterestFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 350));

    setReceipt({
      referenceId: generateReferenceCode(),
      submittedAt: new Date().toLocaleDateString('en-NG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      deviceId: device.id,
      deviceTitle: device.title,
      totalPriceNgn,
      applicant: values,
    });
  };

  if (receipt) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5 sm:p-6"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2
            className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
            aria-hidden="true"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-base font-semibold text-slate-900">
              Financing interest recorded
            </h4>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Thank you, <span className="font-medium text-slate-900">{receipt.applicant.fullName}</span>. Our credit team will reach out to{' '}
              <span className="font-medium text-slate-900">{receipt.applicant.email}</span> within 24 hours with next steps.
            </p>
          </div>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-emerald-200/80 pt-4 text-xs">
          <div>
            <dt className="text-slate-500">Reference ID</dt>
            <dd className="mt-0.5 font-mono font-semibold text-slate-900">
              {receipt.referenceId}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Selected Tenure</dt>
            <dd className="mt-0.5 font-medium text-slate-900">
              {receipt.applicant.repaymentPeriod} months
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Device</dt>
            <dd className="mt-0.5 truncate font-medium text-slate-900">
              {receipt.deviceTitle}
            </dd>
          </div>

        </dl>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button variant="primary" size="md" onClick={onCloseModal}>
            Done
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={() => {
              reset();
              setReceipt(null);
            }}
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4 border-t border-slate-200 pt-5"
    >
      <div>
        <h4 className="text-base font-semibold text-slate-900">
          Express Financing Interest
        </h4>
        <p className="mt-0.5 text-xs text-slate-500">
          {isOutOfStock
            ? 'This device is currently out of stock. Submit your details to be notified when restocked.'
            : 'Complete the form below to receive a pre-qualification check for this device.'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="financing-fullName"
            className="block text-xs font-medium text-slate-700"
          >
            Full Name
          </label>
          <Input
            id="financing-fullName"
            type="text"
            autoComplete="name"
            placeholder="e.g. Chinedu Okafor"
            className="mt-1.5"
            hasError={Boolean(errors.fullName)}
            aria-describedby={
              errors.fullName ? 'financing-fullName-error' : undefined
            }
            {...register('fullName')}
          />
          {errors.fullName && (
            <p
              id="financing-fullName-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="financing-email"
            className="block text-xs font-medium text-slate-700"
          >
            Email Address
          </label>
          <Input
            id="financing-email"
            type="email"
            autoComplete="email"
            placeholder="e.g. chinedu@company.ng"
            className="mt-1.5"
            hasError={Boolean(errors.email)}
            aria-describedby={
              errors.email ? 'financing-email-error' : undefined
            }
            {...register('email')}
          />
          {errors.email && (
            <p
              id="financing-email-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="financing-phoneNumber"
            className="block text-xs font-medium text-slate-700"
          >
            Phone Number
          </label>
          <Input
            id="financing-phoneNumber"
            type="tel"
            autoComplete="tel"
            placeholder="e.g. 0803 123 4567"
            className="mt-1.5"
            hasError={Boolean(errors.phoneNumber)}
            aria-describedby={
              errors.phoneNumber ? 'financing-phoneNumber-error' : undefined
            }
            {...register('phoneNumber')}
          />
          {errors.phoneNumber && (
            <p
              id="financing-phoneNumber-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="financing-repaymentPeriod"
            className="block text-xs font-medium text-slate-700"
          >
            Preferred Repayment Period
          </label>
          <div className="mt-1.5">
            <Select
              id="financing-repaymentPeriod"
              hasError={Boolean(errors.repaymentPeriod)}
              aria-describedby={
                errors.repaymentPeriod
                  ? 'financing-repaymentPeriod-error'
                  : 'financing-estimate-hint'
              }
              {...register('repaymentPeriod')}
            >
              {REPAYMENT_PERIOD_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          {errors.repaymentPeriod ? (
            <p
              id="financing-repaymentPeriod-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.repaymentPeriod.message}
            </p>
          ) : (
            <p
              id="financing-estimate-hint"
              className="mt-1.5 flex items-center justify-between text-xs text-slate-500"
            >
              <span>Estimated monthly installment (3.5% monthly fee)</span>
            </p>
          )}
        </div>
      </div>

      <div className="pt-1">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span>Submitting Request...</span>
            </>
          ) : isOutOfStock ? (
            'Join Restock Waitlist'
          ) : (
            'Submit Financing Interest'
          )}
        </Button>
      </div>
    </form>
  );
}
