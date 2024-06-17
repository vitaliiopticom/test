import { forwardRef } from 'react';

import { IconButton, IconButtonProps } from '@/components/elements';
import { cx } from '@/utils/classNames';

type Props = Omit<IconButtonProps, 'size' | 'variant'>;

export const HeaderIcon = forwardRef<HTMLButtonElement, Props>(
  ({ className, name, ...rest }, ref) => {
    return (
      <IconButton
        ref={ref}
        className={cx('rounded-none p-6', className)}
        iconClassName="text-secondary-tint-70 h-5 w-5"
        name={name}
        size="auto"
        variant="transparent"
        {...rest}
      />
    );
  },
);
