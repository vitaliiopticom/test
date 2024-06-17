import { FC } from 'react';

import { Card, Heading } from '@/components/elements';

type Props = {
  title: string;
  value?: number;
};

export const StatisticsCard: FC<Props> = ({ title, value }) => {
  return (
    <Card className="flex flex-col items-center p-4 pb-0">
      <Heading variant="h4">{title}</Heading>
      <p className="p-3 pb-9 text-[2rem] font-semibold">{value || '--'}</p>
    </Card>
  );
};
