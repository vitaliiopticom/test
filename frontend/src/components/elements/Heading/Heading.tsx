import type { FC, HTMLAttributes } from 'react';

import { cx } from '@/utils/classNames';

const variants = {
  h1: 'text-4xl md:text-5xl',
  h2: 'text-3xl md:text-4xl',
  h3: 'text-xl md:text-2xl',
  h4: 'text-lg',
};

type Props = {
  as?: keyof typeof variants;
  variant?: keyof typeof variants;
} & HTMLAttributes<HTMLHeadingElement>;

export const Heading: FC<Props> = ({
  children,
  className,
  as,
  variant = 'h1',
  ...rest
}) => {
  const Tag = as || variant;

  return (
    <Tag
      className={cx('font-semibold', variants[variant], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};
