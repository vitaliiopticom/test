import { FC } from 'react';

import { cx } from '@/utils/classNames';
import { isDef } from '@/utils/common';

import { Icon } from '../Icon/Icon';
import { Tooltip } from '../Tooltip/Tooltip';

type Size = 'sm' | 'md' | 'lg';

type Props = {
  rating?: number;
  scaleSize?: number;
  iconSize?: Size;
  withTooltip?: boolean;
};

type IconName = 'star' | 'starHalf' | 'starOutline';

const iconSizes = {
  sm: 20,
  md: 30,
  lg: 40,
};

const renderIcon = (
  index: number,
  name: IconName,
  color: string,
  iconSize?: Size,
) => {
  return (
    <Icon
      key={index}
      className={cx(name === 'starHalf' && 'absolute', color)}
      name={name}
      size={iconSize && iconSizes[iconSize]}
    />
  );
};

const renderStars = (
  length: number,
  icon: IconName,
  color: 'text-primary' | 'text-gray-40',
  iconSize?: Size,
) =>
  Array.from({ length }, (_, index) =>
    renderIcon(index, icon, color, iconSize),
  );

export const StarRating: FC<Props> = ({
  rating,
  scaleSize = 5,
  iconSize = 'lg',
  withTooltip,
}) => {
  const emptyStars = renderStars(
    scaleSize,
    'starOutline',
    'text-gray-40',
    iconSize,
  );

  if (!isDef(rating)) {
    return <span className="flex">{emptyStars}</span>;
  }

  const ratingRoundedToHalf = Math.round(rating * 2) / 2;
  const colorStarsNumber = Math.floor(ratingRoundedToHalf);
  const isHalf = ratingRoundedToHalf > colorStarsNumber;
  const greyStarsNumber = Math.ceil(scaleSize - colorStarsNumber);

  const colorStars = renderStars(
    colorStarsNumber,
    'star',
    'text-primary',
    iconSize,
  );
  const greyStars = renderStars(
    greyStarsNumber,
    'star',
    'text-gray-40',
    iconSize,
  );

  const colorStarHalf = renderIcon(999, 'starHalf', 'text-primary', iconSize);

  const stars = (
    <span className="flex">
      {colorStars}
      <span className="relative flex">
        {isHalf && colorStarHalf}
        {greyStars}
      </span>
    </span>
  );

  return withTooltip ? (
    <Tooltip content={`${rating} / ${scaleSize}`}>{stars}</Tooltip>
  ) : (
    stars
  );
};
