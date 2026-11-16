import { Button } from '@/components/ui/Button';
import { RefreshCw } from 'lucide-react';

export interface DeviceErrorStateProps {
  message?: string;
  onRetry: () => void;
  isRetrying?: boolean;
}

export function DeviceErrorState({
  message,
  onRetry,
  isRetrying = false,
}: DeviceErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-16 text-center"
    >

      <h3 className="mt-4 text-base font-semibold text-slate-900">
        Unable to load the device catalog
      </h3>
      <p className="mt-1.5 max-w-md text-sm text-slate-600">
        {message ||
          'We could not reach the inventory service right now. Check your connection and try again.'}
      </p>
      <Button
        variant="primary"
        size="md"
        onClick={onRetry}
        disabled={isRetrying}
        className="mt-6"
      >
        <RefreshCw
          className={`h-4 w-4 ${isRetrying ? 'animate-spin' : ''}`}
          aria-hidden="true"
        />
        <span>{isRetrying ? 'Retrying...' : 'Retry'}</span>
      </Button>
    </div>
  );
}
