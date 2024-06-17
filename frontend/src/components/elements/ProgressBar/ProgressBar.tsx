import { FC } from 'react';

import { cx } from '@/utils/classNames';

type Props = {
  progress: number;
  className?: string;
};

const setProgressBg = (progress?: number) => {
  if (!progress) return;
  if (progress === 100) return 'bg-primary';
  if (progress < 34) return 'bg-jade';
  if (progress < 67) return 'bg-buttercup';
  if (progress < 100) return 'bg-cerise';
};

export const ProgressBar: FC<Props> = ({ progress, className }) => {
  return (
    <div className="relative h-2 min-w-[40px] overflow-hidden rounded bg-gray-40">
      <span
        className={cx(
          className,
          'absolute left-0 top-0 z-10 h-full rounded',
          setProgressBg(progress),
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
