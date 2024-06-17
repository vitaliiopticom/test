import { FC } from 'react';

import { Skeleton } from '@/components/elements';

export const StatisticsCardsListSkeleton: FC = () => {
  return (
    <div className="max-xs:grid-cols-1 grid grid-cols-fill-17 gap-4">
      <Skeleton className="h-32 w-full"></Skeleton>
      <Skeleton className="h-32 w-full"></Skeleton>
      <Skeleton className="h-32 w-full"></Skeleton>
      <Skeleton className="h-32 w-full"></Skeleton>
    </div>
  );
};
