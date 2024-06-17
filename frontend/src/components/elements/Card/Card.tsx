import { forwardRef, ReactNode } from 'react';

import { cx } from '@/utils/classNames';

type Props = {
  children: ReactNode;
  isInactive?: boolean;
  isSelected?: boolean;
  className?: string;
};

export const Card = forwardRef<HTMLDivElement, Props>(
  ({ children, isInactive, isSelected, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cx(
          'rounded-lg border p-6',
          isInactive ? 'bg-gray-30' : 'bg-white',
          isSelected ? 'border-primary' : 'border-gray-40',
          className,
        )}
      >
        {children}
      </div>
    );
  },
);
