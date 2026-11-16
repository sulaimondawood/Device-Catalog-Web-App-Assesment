import * as React from 'react';
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type BadgeTone = 'success' | 'warning' | 'danger' | 'neutral';

export interface BadgeProps {
  tone?: BadgeTone;
  children: React.ReactNode;
  className?: string;
  showIcon?: boolean;
}

const toneClasses: Record<BadgeTone, string> = {
  success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  warning: 'bg-amber-50 text-amber-800 border-amber-200',
  danger: 'bg-rose-50 text-rose-800 border-rose-200',
  neutral: 'bg-slate-100 text-slate-700 border-slate-200',
};

const toneIcons: Record<BadgeTone, React.ComponentType<{ className?: string }>> = {
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: XCircle,
  neutral: Info,
};

export function Badge({
  tone = 'neutral',
  children,
  className,
  showIcon = true,
}: BadgeProps) {
  const Icon = toneIcons[tone];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap shrink-0',
        toneClasses[tone],
        className
      )}
    >
      {showIcon && <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  );
}
