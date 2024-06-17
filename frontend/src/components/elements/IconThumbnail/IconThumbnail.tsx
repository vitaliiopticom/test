import React, { forwardRef } from 'react';

import { cx } from '@/utils/classNames';

import { Icon, IconName } from '../Icon/Icon';
import { Image, ImageProps } from '../Image/Image';

const iconBgVariants = {
  roundedFull: 'before:rounded-full',
  squareRounded: 'before:rounded-md',
} as const;

const iconBgSizes = {
  sm: 'before:w-8 before:h-8',
  md: 'before:w-10 before:h-10',
  lg: 'before:w-12 before:h-12',
} as const;

type Props = {
  iconName: IconName;
  iconClassName?: string;
  iconBgClassname?: string;
  iconBgVariant?: keyof typeof iconBgVariants;
  iconBgSize?: keyof typeof iconBgSizes;
} & ImageProps;

const beforeStyles =
  'before:absolute before:z-[-1] before:left-1/2 before:top-1/2 before:h-10 before:w-10 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[""] before:bg-white';

export const IconThumbnail = forwardRef<HTMLImageElement, Props>(
  (
    {
      iconName,
      className,
      iconClassName,
      iconBgClassname,
      iconBgVariant = 'roundedFull',
      iconBgSize = 'sm',
      ...rest
    },
    ref,
  ) => {
    return (
      <div className={cx('relative w-full', className)}>
        <Image {...rest} ref={ref} className="w-full" />

        <div
          className={cx(
            'absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform overflow-hidden',
            beforeStyles,
            iconBgVariant && iconBgVariants[iconBgVariant],
            iconBgSize && iconBgSizes[iconBgSize],
            iconBgClassname,
          )}
        >
          <Icon
            className={cx('h-12 w-12 text-primary', iconClassName)}
            name={iconName}
          />
        </div>
      </div>
    );
  },
);
