import { FC } from 'react';

import { Card, Skeleton } from '@/components/elements';

export const QuestionnaireSkeleton: FC = () => {
  const skeleton = (
    <Card>
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-80" />
        <Skeleton className="h-5 w-10" />
      </div>
      <hr className="mb-8 mt-3 bg-secondary-tint-80" />
      <Skeleton className="mb-10 h-20 w-full" />
      <Skeleton className="mb-4 h-4 w-full" />
      <Skeleton className="mb-4 h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <hr className="mb-2 mt-8 bg-secondary-tint-80" />
      <Skeleton className="mb-4 h-8 w-28" />
      <Skeleton className="h-12 w-full" />
    </Card>
  );

  return (
    <div className="mx-auto max-w-[750px]">
      <div className="flex flex-col gap-8">
        {skeleton}
        {skeleton}
        {skeleton}
        {skeleton}
      </div>
    </div>
  );
};
