import { forwardRef, HTMLAttributes, useMemo } from 'react';

import { cx } from '@/utils/classNames';

import { avatarSizes } from '../Avatar/Avatar';

export const avatarInitialsFontSize = {
  sm: 'text-xs',
  md: 'text-xl',
  lg: 'text-3xl',
};

const getInitials = (name: string) => {
  if (!name) return '';

  const nameArray = name.split(' ');

  if (nameArray.length === 1) {
    return nameArray[0].charAt(0)?.toUpperCase();
  }

  const firstNameIn = nameArray[0]?.charAt(0)?.toUpperCase();
  const lastNameIn = nameArray[nameArray.length - 1]?.charAt(0)?.toUpperCase();
  return [firstNameIn, lastNameIn].filter(Boolean).join('');
};

type Props = {
  name: string;
  className?: string;
  size?: keyof typeof avatarSizes;
} & HTMLAttributes<HTMLDivElement>;

export const Initials = forwardRef<HTMLDivElement, Props>(
  ({ name, size = 'md', className }, ref) => {
    const initials = useMemo(() => getInitials(name), [name]);

    return (
      <div
        ref={ref}
        className={cx(
          'inline-flex items-center justify-center rounded-full border-2 border-white bg-gray-90',
          avatarSizes[size],
          className,
        )}
      >
        <span
          className={cx(
            'font-semibold text-white',
            avatarInitialsFontSize[size],
          )}
        >
          {initials}
        </span>
      </div>
    );
  },
);
