'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { DeviceImage } from '@/components/devices/DeviceImage';
import { FinancingInterestForm } from '@/components/forms/FinancingInterestForm';
import { Badge, type BadgeTone } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import {
  cn,
  convertUsdToNgn,
  formatCategoryLabel,
  formatNaira,
  getStockStatus,
} from '@/lib/utils';
import type { Device, StockStatus } from '@/types/device';

export interface DeviceDetailModalProps {
  device: Device | null;
  onClose: () => void;
}

const STOCK_TONE_MAP: Record<StockStatus, BadgeTone> = {
  'In Stock': 'success',
  'Low Stock': 'warning',
  'Out of Stock': 'danger',
};

function DeviceDetailContent({
  device,
  onClose,
}: {
  device: Device;
  onClose: () => void;
}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const galleryImages =
    device.images && device.images.length > 0
      ? device.images
      : [device.thumbnail].filter(Boolean);
  const activeImage =
    galleryImages[selectedImageIndex] || galleryImages[0] || '';
  const priceNgn = convertUsdToNgn(device.price);
  const stockStatus = getStockStatus(device.stock, device.availabilityStatus);
  const brandLabel = device.brand?.trim() || 'Sapphire Partner';
  const categoryLabel = formatCategoryLabel(device.category);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12">
      <div className="border-b border-slate-200 bg-slate-50 p-6 sm:p-7 lg:col-span-5 lg:border-b-0 lg:border-r">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-200 bg-white">
          <DeviceImage
            src={activeImage}
            alt={device.title}
            category={device.category}
            sizes="(max-width: 1024px) 100vw, 380px"
            priority
          />
        </div>

        {galleryImages.length > 1 && (
          <div
            className="mt-3 flex items-center gap-2 overflow-x-auto pb-1"
            role="group"
            aria-label="Device image gallery"
          >
            {galleryImages.map((imageUrl, index) => (
              <button
                key={`${imageUrl}-${index}`}
                type="button"
                onClick={() => setSelectedImageIndex(index)}
                aria-label={`View image ${index + 1} of ${device.title}`}
                aria-pressed={selectedImageIndex === index}
                className={cn(
                  'relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 cursor-pointer',
                  selectedImageIndex === index
                    ? 'border-gray-700 ring-1 ring-gray-700'
                    : 'border-slate-200 hover:border-slate-300'
                )}
              >
                <DeviceImage
                  src={imageUrl}
                  alt={`${device.title} preview ${index + 1}`}
                  category={device.category}
                  sizes="56px"
                  className="p-1.5"
                />
              </button>
            ))}
          </div>
        )}

        <dl className="mt-6 divide-y divide-slate-200 border-t border-b border-slate-200 text-xs">
          <div className="flex items-center justify-between py-2.5">
            <dt className="text-slate-500">Brand</dt>
            <dd className="font-medium text-slate-900">{brandLabel}</dd>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <dt className="text-slate-500">Category</dt>
            <dd className="font-medium text-slate-900">{categoryLabel}</dd>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <dt className="text-slate-500">Customer Rating</dt>
            <dd className="inline-flex items-center gap-1 font-mono font-medium tabular-nums text-slate-900">
              <Star
                className="h-3.5 w-3.5 fill-amber-400 text-amber-500"
                aria-hidden="true"
              />
              <span>{device.rating.toFixed(1)} / 5.0</span>
            </dd>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <dt className="text-slate-500">Stock Availability</dt>
            <dd className="font-mono font-medium tabular-nums text-slate-900">
              {device.stock > 0
                ? `${device.stock} units (${stockStatus})`
                : 'Out of Stock'}
            </dd>
          </div>
          {device.warrantyInformation && (
            <div className="flex items-center justify-between py-2.5">
              <dt className="text-slate-500">Warranty</dt>
              <dd className="font-medium text-slate-900">
                {device.warrantyInformation}
              </dd>
            </div>
          )}
        </dl>
      </div>

      <div className="p-6 sm:p-7 lg:col-span-7">
        <div className="pr-10">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-medium text-slate-700">{brandLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{categoryLabel}</span>
          </div>

          <h3
            id="device-modal-title"
            className="mt-1.5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl"
          >
            {device.title}
          </h3>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-2xl font-bold tabular-nums text-slate-900">
              {formatNaira(priceNgn)}
            </p>
            <Badge tone={STOCK_TONE_MAP[stockStatus]}>{stockStatus}</Badge>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            {device.description}
          </p>
        </div>

        <div className="mt-6">
          <FinancingInterestForm
            device={device}
            totalPriceNgn={priceNgn}
            isOutOfStock={stockStatus === 'Out of Stock'}
            onCloseModal={onClose}
          />
        </div>
      </div>
    </div>
  );
}

export function DeviceDetailModal({ device, onClose }: DeviceDetailModalProps) {
  return (
    <Modal
      open={Boolean(device)}
      onClose={onClose}
      titleId="device-modal-title"
      className="max-w-4xl"
    >
      {device && (
        <DeviceDetailContent
          key={device.id}
          device={device}
          onClose={onClose}
        />
      )}
    </Modal>
  );
}
