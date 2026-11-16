export type RepaymentPeriod = '3' | '6' | '9' | '12';

export interface FinancingInterestFormValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  repaymentPeriod: RepaymentPeriod;
}

export interface FinancingSubmissionReceipt {
  referenceId: string;
  submittedAt: string;
  deviceId: number;
  deviceTitle: string;
  totalPriceNgn: number;
  applicant: FinancingInterestFormValues;
}
