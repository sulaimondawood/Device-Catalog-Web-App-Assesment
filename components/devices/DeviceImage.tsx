'use client';

import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { Laptop, Smartphone, Tablet } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DeviceImageProps {
  src: string;
  alt: string;
  category?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

function FallbackDeviceIcon({ category }: { category?: string }) {
  if (category === 'laptops') {
    return <Laptop className="h-8 w-8 stroke-[1.5]" aria-hidden="true" />;
  }
  if (category === 'tablets') {
    return <Tablet className="h-8 w-8 stroke-[1.5]" aria-hidden="true" />;
  }
  return <Smartphone className="h-8 w-8 stroke-[1.5]" aria-hidden="true" />;
}

export function DeviceImage({
  src,
  alt,
  category,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
  priority = false,
  className,
}: DeviceImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={cn(
          'flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-100 p-4 text-center text-slate-400',
          className
        )}
      >
        <FallbackDeviceIcon category={category} />
        <span className="max-w-[16ch] truncate text-xs font-medium text-slate-500">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={cn('object-contain p-4', className)}
    />
  );
}
