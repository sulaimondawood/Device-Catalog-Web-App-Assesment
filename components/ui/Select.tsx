import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, hasError = false, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          aria-invalid={hasError || undefined}
          className={cn(
            'block w-full h-11 appearance-none rounded-lg border bg-white pl-3.5 pr-10 text-sm text-slate-900 transition-colors duration-150',
            'focus:outline-none focus:ring-2 cursor-pointer',
            'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500',
            hasError
              ? 'border-red-600 focus:border-red-600 focus:ring-red-600/15'
              : 'border-slate-300 hover:border-slate-400 focus:border-blue-700 focus:ring-blue-700/15',
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
        />
      </div>
    );
  }
);

Select.displayName = 'Select';
