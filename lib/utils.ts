import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  LOW_STOCK_THRESHOLD,
  MONTHLY_FINANCING_RATE,
  USD_TO_NGN_RATE,
} from '@/constants';
import type { StockStatus } from '@/types/device';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertUsdToNgn(usdPrice: number): number {
  return Math.round((usdPrice * USD_TO_NGN_RATE) / 100) * 100;
}

export function formatNaira(amountNgn: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amountNgn);
}

export function getStockStatus(
  stock: number,
  availabilityStatus?: string
): StockStatus {
  if (stock <= 0 || availabilityStatus === 'Out of Stock') {
    return 'Out of Stock';
  }
  if (stock <= LOW_STOCK_THRESHOLD || availabilityStatus === 'Low Stock') {
    return 'Low Stock';
  }
  return 'In Stock';
}

export function calculateMonthlyInstallment(
  totalNgn: number,
  months: number
): number {
  if (months <= 0) return totalNgn;
  const totalWithServiceFee = totalNgn * (1 + MONTHLY_FINANCING_RATE * months);
  return Math.round(totalWithServiceFee / months);
}

export function formatCategoryLabel(slug: string): string {
  return slug
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

export function generateReferenceCode(): string {
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `SPH-${randomDigits}`;
}
