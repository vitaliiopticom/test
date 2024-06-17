import { forwardRef, InputHTMLAttributes } from 'react';

import { cx } from '@/utils/classNames';

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={cx(
          'rounded border border-gray-60 bg-white text-white checked:bg-primary indeterminate:bg-primary hover:border-secondary checked:hover:bg-primary indeterminate:hover:bg-primary focus:border-secondary focus:outline-0 focus:ring-0 checked:focus:bg-primary indeterminate:focus:bg-primary disabled:border-transparent disabled:bg-gray-40 disabled:hover:bg-gray-40',
          className,
        )}
        type="checkbox"
        {...rest}
      />
    );
  },
);
