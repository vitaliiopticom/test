import React, { forwardRef, ReactNode } from 'react';

import { cx } from '@/utils/classNames';

import { Image } from '../Image/Image';
import { Initials } from '../Initials/Initials';
import { Tooltip } from '../Tooltip/Tooltip';

export const avatarSizes = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
};

type Props = {
  name: string;
  alt: string;
  size?: keyof typeof avatarSizes;
  imgClassName?: string;
  initialsClassName?: string;
  imgUrl?: string;
  tooltip?: ReactNode;
};

const placeholderPath = '/images/avatar-placeholder.svg';

export const Avatar = forwardRef<HTMLImageElement, Props>(
  (
    {
      name,
      imgClassName,
      initialsClassName,
      imgUrl,
      alt = '',
      size = 'md',
      tooltip,
    },
    ref,
  ) => {
    const avatarImage =
      !imgUrl && name ? (
        <Initials className={initialsClassName} name={name} size={size} />
      ) : (
        <Image
          ref={ref}
          alt={alt}
          className={cx(
            'rounded-full border-2 border-white object-cover',
            avatarSizes[size],
            imgClassName,
          )}
          fallbackPath={placeholderPath}
          src={imgUrl || placeholderPath}
        />
      );

    return tooltip ? (
      <Tooltip content={tooltip}>{avatarImage}</Tooltip>
    ) : (
      avatarImage
    );
  },
);
