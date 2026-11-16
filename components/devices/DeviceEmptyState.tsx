import { SearchX } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface DeviceEmptyStateProps {
  searchQuery: string;
  onReset: () => void;
}

export function DeviceEmptyState({
  searchQuery,
  onReset,
}: DeviceEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-16 text-center">
      <h3 className="mt-4 text-base font-semibold text-slate-900">
        No matching devices found
      </h3>
      <p className="mt-1.5 max-w-md text-sm text-slate-600">
        {searchQuery
          ? `No devices matched "${searchQuery}" under the selected category filter.`
          : 'No devices matched your current filter selection.'}
      </p>
      <Button variant="outline" size="md" onClick={onReset} className="mt-6">
        Clear search &amp; filters
      </Button>
    </div>
  );
}
