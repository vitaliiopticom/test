import { FC } from 'react';

import { cx } from '@/utils/classNames';

type Props = {
  className?: string;
};

export const Skeleton: FC<Props> = ({ className }) => {
  return <div className={cx('animate-pulse rounded bg-gray-40', className)} />;
};
