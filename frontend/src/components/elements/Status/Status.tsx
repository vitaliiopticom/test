import { FC } from 'react';

import { cx } from '@/utils/classNames';

import { Chip, ChipColor, ChipProps } from '../Chip/Chip';

const sizes = {
  sm: { rounded: 'rounded-lg' },
  md: { rounded: 'rounded-xl' },
};

const statuses = {
  success: 'green',
  warning: 'amber',
  danger: 'red',
  neutral: 'blue',
  clickable: 'clickable',
  default: 'black',
  critical: 'primary',
  empty: 'disabled',
};

export type StatusType = keyof typeof statuses;

type Props = {
  status: StatusType;
} & Omit<ChipProps, 'color'>;

export const Status: FC<Props> = ({
  children,
  status,
  size = 'md',
  className,
  ...rest
}) => {
  const rounded = sizes[size].rounded;

  return (
    <Chip
      className={cx(rounded, className)}
      size={size}
      isBgDark
      {...rest}
      color={statuses[status] as ChipColor}
    >
      {children}
    </Chip>
  );
};
