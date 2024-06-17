import { FC } from 'react';

import { Skeleton } from '@/components/elements';

export const CompanyDetailSkeleton: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-40" />
      <Skeleton className="h-96" />
      <Skeleton className="h-60" />
    </div>
  );
};
