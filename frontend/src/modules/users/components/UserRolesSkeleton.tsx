import { FC } from 'react';

import { Skeleton } from '@/components/elements';

export const UserRolesSkeleton: FC = () => {
  return (
    <div className="grid-cols1 mt-8 grid gap-2 2xl:grid-cols-2">
      <div>
        <Skeleton className="mb-2 h-4 w-56" />
        <Skeleton className="h-4 w-56" />
      </div>
      <div>
        <Skeleton className="mb-2 h-4 w-56" />
        <Skeleton className="h-4 w-56" />
      </div>
    </div>
  );
};
