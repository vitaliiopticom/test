import { FC, useMemo } from 'react';

import { cx } from '@/utils/classNames';

import { Avatar, avatarSizes } from '../Avatar/Avatar';
import { Tooltip } from '../Tooltip/Tooltip';

const textSizes = {
  sm: 'text-xs',
  md: 'text-lg',
  lg: 'text-4xl',
};

const overlapSizes = {
  sm: '-space-x-3.5',
  md: '-space-x-6',
  lg: '-space-x-9',
};

const firstImgMargin = {
  sm: '[&_img:first-of-type]:-ml-3.5',
  md: '[&_img:first-of-type]:-ml-6',
  lg: '[&_img:first-of-type]:-ml-9',
};

const additionalMarginLeftSize = {
  sm: 'ml-1',
  md: 'ml-1.5',
  lg: 'ml-2',
};

export type AvatarType = {
  imgUrl?: string;
  name: string;
};

type Props = {
  avatars: AvatarType[];
  maxCount?: number;
  size?: keyof typeof avatarSizes;
};

const getNames = (avatars: AvatarType[], maxCount: number) => {
  return avatars.slice(0, maxCount).map((avatar) => avatar.name ?? '-');
};

export const AvatarGroup: FC<Props> = ({
  avatars,
  maxCount = 3,
  size = 'md',
}) => {
  const additionalAvatars = avatars.length - maxCount;
  const names = useMemo(
    () => getNames(avatars, maxCount).reverse().join(', '),
    [avatars, maxCount],
  );

  return (
    <Tooltip
      content={
        additionalAvatars > 0 ? `${names} + ${additionalAvatars}` : names
      }
    >
      <div
        className={cx(
          'flex flex-row-reverse justify-end pl-6',
          firstImgMargin[size],
          overlapSizes[size],
        )}
      >
        {additionalAvatars > 0 && (
          <div
            className={cx(
              'flex items-center justify-center rounded-full border-2 border-gray-40 bg-gray-70 font-medium text-white',
              additionalMarginLeftSize[size],
              avatarSizes[size],
              textSizes[size],
            )}
          >
            +{additionalAvatars}
          </div>
        )}
        {avatars.slice(0, maxCount).map((avatar, index) => (
          <Avatar
            key={index}
            alt={avatar.name}
            imgClassName="relative"
            imgUrl={avatar.imgUrl}
            name={avatar.name}
            size={size}
          />
        ))}
      </div>
    </Tooltip>
  );
};
