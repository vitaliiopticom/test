import { forwardRef, InputHTMLAttributes } from 'react';

import { cx } from '@/utils/classNames';

import { Icon, IconName } from '../Icon/Icon';

import './Input.css';

export const sizes = {
  sm: 'py-1 text-sm h-8 px-3',
  md: 'py-2.5 h-10 px-4',
  lg: 'py-3 h-12 px-4',
};

const iconSizes = {
  sm: 'h-5 w-5',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

export const getInputClassNames = ({
  size = 'md',
  isEmpty,
  isInvalid,
  startIcon,
  endIcon,
  className,
}: Pick<
  InputProps,
  'size' | 'startIcon' | 'endIcon' | 'className' | 'isInvalid' | 'isEmpty'
>) => {
  return cx(
    'input-base',
    sizes[size],
    isInvalid && 'input-error',
    !!startIcon && 'pl-10',
    !!endIcon && 'pr-10',
    isEmpty && 'input-notFilled',
    className,
  );
};

export type InputProps = {
  size?: keyof typeof sizes;
  isInvalid?: boolean;
  startIcon?: IconName;
  endIcon?: IconName;
  iconClassName?: string;
  isEmpty?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size = 'md',
      type = 'text',
      isInvalid,
      startIcon,
      endIcon,
      disabled,
      iconClassName,
      onClick,
      isEmpty,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        className={cx(
          'relative',
          (startIcon || endIcon) && 'flex items-center',
        )}
        onClick={onClick}
      >
        {startIcon && (
          <Icon
            className={cx(
              'absolute left-0 ml-3',
              iconSizes[size],
              disabled && 'text-secondary-tint-70',
              iconClassName,
            )}
            name={startIcon}
          />
        )}
        <input
          ref={ref}
          className={getInputClassNames({
            size,
            isEmpty,
            isInvalid,
            startIcon,
            endIcon,
            className,
          })}
          disabled={disabled}
          type={type}
          {...rest}
        />
        {endIcon && (
          <Icon
            className={cx(
              'absolute right-0 mr-3',
              iconSizes[size],
              disabled && 'text-secondary-tint-70',
              iconClassName,
            )}
            name={endIcon}
          />
        )}
      </div>
    );
  },
);
