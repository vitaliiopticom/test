import { FC, ReactNode } from 'react';

import { cx } from '@/utils/classNames';

type Props = {
  children: ReactNode;
  isInvalid?: boolean;
  isEmpty?: boolean;
};

export const HelperMessage: FC<Props> = ({ children, isInvalid, isEmpty }) => {
  return (
    <div
      className={cx(
        'ml-2 mt-0.5 text-xs',
        isInvalid && 'text-cerise',
        isEmpty && 'text-blaze',
      )}
      role="alert"
    >
      {children}
    </div>
  );
};
