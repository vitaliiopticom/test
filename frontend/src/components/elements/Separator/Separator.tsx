import { FC } from 'react';

import { cx } from '@/utils/classNames';

type Props = {
  className?: string;
  text?: string;
  isSecondary?: boolean;
};

export const Separator: FC<Props> = ({ className, text, isSecondary }) => {
  return (
    <div
      className={cx(
        'border-b border-secondary-tint-80 pb-1.5 text-lg font-semibold ',
        isSecondary && 'border-dashed text-base text-secondary-tint-50',
        className,
      )}
    >
      {text}
    </div>
  );
};
