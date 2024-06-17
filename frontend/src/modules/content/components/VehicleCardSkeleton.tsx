import { Skeleton } from '@/components/elements';

export const VehicleCardSkeleton = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-secondary-tint-90">
      <Skeleton className="aspect-thumbnail w-full" />
      <div className="px-2 py-3">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
        </div>
        <div className="mt-2 flex w-full justify-between pt-4">
          <Skeleton className="h-6 w-full" />
        </div>
      </div>
    </div>
  );
};
