import { FC } from 'react';

import { Icon, IconName } from '@/components/elements';
import { cx } from '@/utils/classNames';

type Props = {
  iconName: IconName;
  value: number;
};

export const PhotoInfoChip: FC<Props> = ({ iconName, value }) => {
  const isInactiveColor = value === 0 ? 'text-secondary-tint-60' : '';

  return (
    <span
      className={cx('flex items-center gap-2', isInactiveColor || 'text-black')}
    >
      <Icon className="h-5 w-5" name={iconName} />
      <span
        className={cx(isInactiveColor || 'text-primary', 'text-sm font-medium')}
      >
        {value}
      </span>
    </span>
  );
};
