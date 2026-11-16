'use client';

import * as React from 'react';
import { Badge, type BadgeTone } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { DeviceImage } from '@/components/devices/DeviceImage';
import {
  calculateMonthlyInstallment,
  convertUsdToNgn,
  formatCategoryLabel,
  formatNaira,
  getStockStatus,
} from '@/lib/utils';
import type { Device, StockStatus } from '@/types/device';

export interface DeviceCardProps {
  device: Device;
  onSelect: (device: Device) => void;
}

const STOCK_TONE_MAP: Record<StockStatus, BadgeTone> = {
  'In Stock': 'success',
  'Low Stock': 'warning',
  'Out of Stock': 'danger',
};

export function DeviceCard({ device, onSelect }: DeviceCardProps) {
  const priceNgn = convertUsdToNgn(device.price);
  const monthlyFromNgn = calculateMonthlyInstallment(priceNgn, 12);
  const stockStatus = getStockStatus(device.stock, device.availabilityStatus);
  const brandLabel = device.brand?.trim() || 'Sapphire Partner';
  const categoryLabel = formatCategoryLabel(device.category);

  return (
    <Card interactive className="flex h-full flex-col overflow-hidden">
      <button
        type="button"
        onClick={() => onSelect(device)}
        aria-label={`View financing details for ${device.title}`}
        className="group flex h-full w-full flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-700 cursor-pointer"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-slate-100 bg-slate-50">
          <DeviceImage
            src={device.thumbnail || device.images?.[0] || ''}
            alt={device.title}
            category={device.category}
            className="transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="truncate font-medium text-slate-600">
                {brandLabel}
              </span>
              <span aria-hidden="true">·</span>
              <span className="truncate">{categoryLabel}</span>
            </div>

            <h3 className="mt-1.5 line-clamp-2 text-base font-semibold leading-snug text-slate-900 group-hover:text-blue-700 transition-colors">
              {device.title}
            </h3>
          </div>

          <div className="mt-5 border-t border-slate-100 pt-3.5">
            <div className="flex items-baseline justify-between gap-2">
              <div>
                <p className="font-mono text-base font-semibold tabular-nums text-slate-900">
                  {formatNaira(priceNgn)}
                </p>
                <p className="mt-0.5 font-mono text-[11px] tabular-nums text-slate-500">
                  From {formatNaira(monthlyFromNgn)}/mo
                </p>
              </div>

              <Badge tone={STOCK_TONE_MAP[stockStatus]}>{stockStatus}</Badge>
            </div>
          </div>
        </div>
      </button>
    </Card>
  );
}
