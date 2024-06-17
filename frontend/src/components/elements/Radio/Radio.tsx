import { forwardRef, InputHTMLAttributes } from 'react';

import { cx } from '@/utils/classNames';

export type RadioProps = InputHTMLAttributes<HTMLInputElement>;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={cx(
          'rounded-full border border-gray-60 bg-white text-white checked:bg-primary hover:border-secondary checked:hover:bg-primary focus:border-secondary focus:outline-0 focus:ring-0 checked:focus:bg-primary disabled:border-transparent disabled:bg-gray-40 disabled:hover:bg-gray-40',
          className,
        )}
        type="radio"
        {...rest}
      />
    );
  },
);
