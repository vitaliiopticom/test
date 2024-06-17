import { ButtonHTMLAttributes, forwardRef } from 'react';

import { cx } from '@/utils/classNames';

import { Icon, IconName } from '../Icon/Icon';
import { Spinner } from '../Spinner/Spinner';

export const buttonBaseStyles =
  'flex items-center justify-center rounded-md font-semibold transition-colors focus:outline-0 disabled:cursor-not-allowed';

export const buttonVariants = {
  primary:
    'bg-primary text-white hover:bg-primary-shade-40 active:bg-primary-shade-40 disabled:bg-secondary-tint-80 disabled:text-secondary-tint-20',
  secondary:
    'bg-white text-secondary border border-gray-50 hover:text-primary hover:border-primary focus:text-primary focus:border-primary active:border-primary active:bg-primary-tint-90 disabled:bg-secondary-tint-80 disabled:text-secondary-tint-20 disabled:border-gray-50',
  ghost:
    'bg-transparent text-primary hover:bg-gray-30 hover:text-primary-shade-20 active:bg-gray-30 focus:text-primary-shade-20 focus:bg-transparent/10 disabled:text-secondary-tint-40 disabled:hover:bg-transparent',
  transparent: 'bg-transparent text-secondary disabled:text-secondary-tint-40',
} as const;

export const buttonSizes = {
  sm: 'py-1.5 text-sm gap-1.5 px-3 h-8',
  md: 'py-2 text-md gap-2.5 px-5 h-10',
  lg: 'py-3.5 gap-3.5 text-lg px-6 h-12 font-medium',
} as const;

export const buttonIconSizes = {
  sm: 'h-4.5 w-4.5',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: keyof typeof buttonSizes;
  startIcon?: IconName;
  endIcon?: IconName;
  isLoading?: boolean;
  iconsClassName?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      type = 'button',
      size = 'md',
      iconsClassName,
      startIcon,
      endIcon,
      isLoading,
      disabled,
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;
    const isGhostOrTransparent =
      variant === 'ghost' || variant === 'transparent';
    const iconsStyles = cx(
      variant === 'secondary' && 'text-primary',
      buttonIconSizes[size],
      isDisabled && 'text-secondary-tint-20',
      isGhostOrTransparent && isDisabled && 'text-secondary-tint-40',
    );

    return (
      <button
        ref={ref}
        className={cx(
          buttonBaseStyles,
          buttonVariants[variant],
          buttonSizes[size],
          className,
        )}
        disabled={isDisabled}
        type={type}
        {...rest}
      >
        {isLoading && (
          <Spinner
            className={cx(buttonIconSizes[size], iconsClassName)}
            size={false}
          />
        )}
        {startIcon && !isLoading && (
          <Icon className={cx(iconsStyles, iconsClassName)} name={startIcon} />
        )}
        {children}
        {endIcon && !isLoading && (
          <Icon className={cx(iconsStyles, iconsClassName)} name={endIcon} />
        )}
      </button>
    );
  },
);
