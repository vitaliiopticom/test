import { FC } from 'react';

import { cx } from '@/utils/classNames';

import { Chip, ChipProps, config } from '../Chip/Chip';

type Props = {
  percentLeft?: number;
} & ChipProps;

const setChipColor = (percentLeft?: number) => {
  if (percentLeft === 0) return 'primary';

  if (percentLeft) {
    if (percentLeft < 34) return 'red';
    if (percentLeft < 67) return 'amber';
    if (percentLeft <= 100) return 'green';
  }

  return 'disabled';
};

const setPercentLeftColor = (percentLeft: number) => {
  if (percentLeft < 34) return config['red'].bgDark;
  if (percentLeft < 67) return config['amber'].bgDark;
  if (percentLeft <= 100) return config['green'].bgDark;
};

export const Timer: FC<Props> = ({
  children,
  percentLeft,
  className,
  ...rest
}) => {
  return (
    <Chip
      className={cx('relative overflow-hidden', className)}
      {...rest}
      color={setChipColor(percentLeft)}
    >
      <span className="relative z-20 capitalize">{children}</span>
      {!!percentLeft && (
        <span
          className={cx(
            'absolute left-0 top-0 z-10 h-full',
            setPercentLeftColor(percentLeft),
          )}
          style={{ width: `${percentLeft}%` }}
        />
      )}
    </Chip>
  );
};
