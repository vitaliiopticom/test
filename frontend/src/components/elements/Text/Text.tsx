import type { FC, ReactNode } from 'react';

import { cx } from '@/utils/classNames';

const variants = {
  normal: 'font-normal',
  medium: 'font-medium',
  bold: 'font-semibold',
};

const sizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

type Props = {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  isSecondary?: boolean;
  title?: string;
};

export const Text: FC<Props> = ({
  children,
  as: Tag = 'p',
  size = 'md',
  variant = 'normal',
  className,
  isSecondary,
  ...rest
}) => {
  return (
    <Tag
      className={cx(
        sizes[size],
        variants[variant],
        isSecondary && 'text-secondary-tint-40',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};
