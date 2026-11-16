import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError = false, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        aria-invalid={hasError || undefined}
        className={cn(
          'block w-full h-11 rounded-lg border bg-white px-3.5 text-sm text-slate-900 transition-colors duration-150',
          'placeholder:text-slate-400',
          'focus:outline-none focus:ring-2',
          'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500',
          hasError
            ? 'border-red-600 focus:border-red-600 focus:ring-red-600/15'
            : 'border-slate-300 hover:border-slate-400 focus:border-blue-700 focus:ring-blue-700/15',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
