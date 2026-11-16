import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

export function DeviceGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      aria-label="Loading devices"
      aria-busy="true"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <Skeleton className="aspect-[4/3] w-full rounded-none" />
          <div className="space-y-4 p-4 sm:p-5">
            <div>
              <Skeleton className="h-3 w-24" />
              <Skeleton className="mt-2.5 h-5 w-4/5" />
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 pt-3.5">
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-6 w-20 rounded-md" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
