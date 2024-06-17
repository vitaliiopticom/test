import { ButtonHTMLAttributes, forwardRef } from 'react';

import { cx } from '@/utils/classNames';

import { Button, buttonIconSizes, ButtonVariant } from '../Button/Button';
import { IconName } from '../Icon/Icon';

const variants = {
  primary: 'border border-transparent',
  secondary: 'active:border-primary-shade-40',
  ghost:
    'border border-transparent text-secondary disabled:bg-secondary-tint-80 disabled:hover:bg-secondary-tint-80',
  transparent: 'border border-transparent',
} as const;

const sizes = {
  xs: 'p-1.5 h-6 w-6',
  sm: 'p-1.5 h-8 w-8',
  md: 'p-2.5 h-10 w-10',
  lg: 'p-3 h-12 w-12',
  auto: '',
} as const;

const iconStylesVariants = {
  primary: '',
  secondary:
    'text-secondary group-hover:text-primary group-disabled:text-secondary-tint-20 group-focus:text-primary group-active:text-primary-shade-40',
  ghost: 'group-disabled:text-secondary-tint-20',
  transparent: '',
};

const iconSizes = {
  ...buttonIconSizes,
  xs: 'h-3 w-3',
  sm: 'h-5 w-5',
  auto: '',
} as const;

export type IconButtonProps = {
  name: IconName;
  variant?: ButtonVariant;
  size?: keyof typeof sizes;
  isLoading?: boolean;
  iconClassName?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      name,
      className,
      iconClassName,
      type = 'button',
      variant = 'primary',
      size = 'md',
      ...rest
    },
    ref,
  ) => {
    return (
      <Button
        ref={ref}
        className={cx('group', variants[variant], sizes[size], className)}
        iconsClassName={cx(
          'group-hover:disabled:text-secondary-tint-20',
          iconSizes[size],
          iconStylesVariants[variant],
          iconClassName,
        )}
        startIcon={name}
        type={type}
        variant={variant}
        {...rest}
      />
    );
  },
);
