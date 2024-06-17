import { FC } from 'react';

import { Skeleton } from '@/components/elements';

export const UserDetailSkeleton: FC = () => {
  return (
    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
      <Skeleton />
      <div>
        <Skeleton className="mb-8 h-80" />
        <Skeleton className="h-80" />
      </div>
    </div>
  );
};
