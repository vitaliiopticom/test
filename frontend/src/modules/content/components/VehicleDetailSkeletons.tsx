import React, { FC } from 'react';

import { Skeleton } from '@/components/elements';

import { VehicleCardSkeleton } from './VehicleCardSkeleton';

export const VEHICLE_DETAILS_SKELETON_TYPE = {
  HEADER: 'HEADER',
} as const;

type Props = {
  type?: keyof typeof VEHICLE_DETAILS_SKELETON_TYPE | undefined;
};

export const VehicleDetailSkeletons: FC<Props> = ({ type }) => {
  if (type === VEHICLE_DETAILS_SKELETON_TYPE.HEADER) {
    return (
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-48" />
      </div>
    );
  }

  return (
    <div className="mb-4 flex flex-col">
      <div className="flex flex-wrap">
        <Skeleton className="mb-2 h-8 w-24" />
        <div className="flex flex-grow flex-wrap justify-end gap-x-4">
          <Skeleton className="mb-4 h-10 w-52" />
          <Skeleton className="mb-4 h-10 w-40" />
        </div>
      </div>

      <div className="grid grid-cols-fill-18 gap-5 2xl:grid-cols-fill-18-r4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <VehicleCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
};
