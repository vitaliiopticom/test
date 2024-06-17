import { FC } from 'react';

import { cx } from '@/utils/classNames';

import { Icon } from '../Icon/Icon';

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

type Props = {
  size?: keyof typeof sizes | false;
  className?: string;
};

export const Spinner: FC<Props> = ({ size = 'md', className }) => {
  return (
    <Icon
      className={cx('animate-spin', size && sizes[size], className)}
      name="loading"
    />
  );
};
