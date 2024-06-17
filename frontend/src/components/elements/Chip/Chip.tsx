import { FC, ReactNode } from 'react';

import { cx } from '@/utils/classNames';

import { Icon, IconName } from '../Icon/Icon';

export const config = {
  primary: {
    bgLight: 'bg-primary',
    bgDark: 'bg-primary',
    textColor: 'text-white',
    hover: '',
    borderStyles: `group bg-primary-tint-90 text-secondary box-border border border-solid border-primary-tint-70 py-[1px]
      hover:bg-primary-tint-80 hover:border-primary hover:text-primary`,
    endIconColor: 'text-primary-tint-70',
  },
  green: {
    bgLight: 'bg-jade-tint-20',
    bgDark: 'bg-jade-tint-10',
    textColor: 'text-secondary',
    hover: 'hover:bg-jade-tint-10',
    borderStyles: '',
    endIconColor: '',
  },
  amber: {
    bgLight: 'bg-buttercup-tint-20',
    bgDark: 'bg-buttercup-tint-10',
    hover: 'hover:bg-buttercup-tint-10',
    textColor: 'text-secondary',
    borderStyles: '',
    endIconColor: '',
  },
  orange: {
    bgLight: 'bg-vivid-tint-20',
    bgDark: 'bg-vivid-tint-10',
    hover: 'hover:bg-vivid-tint-10',
    textColor: 'text-secondary',
    borderStyles: '',
    endIconColor: '',
  },
  red: {
    bgLight: 'bg-cerise-tint-20',
    bgDark: 'bg-cerise-tint-10',
    hover: 'hover:bg-cerise-tint-10',
    textColor: 'text-secondary',
    borderStyles: '',
    endIconColor: '',
  },
  turquoise: {
    bgLight: 'bg-pacific-tint-20',
    bgDark: 'bg-pacific-tint-10',
    hover: 'hover:bg-pacific-tint-10',
    textColor: 'text-secondary',
    borderStyles: '',
    endIconColor: '',
  },
  blue: {
    bgLight: 'bg-azure-tint-20',
    bgDark: 'bg-azure-tint-10',
    hover: 'hover:bg-azure-tint-10',
    textColor: 'text-secondary',
    borderStyles: '',
    endIconColor: '',
  },
  violet: {
    bgLight: 'bg-electric-tint-20',
    bgDark: 'bg-electric-tint-10',
    hover: 'hover:bg-electric-tint-10',
    textColor: 'text-secondary',
    borderStyles: '',
    endIconColor: '',
  },
  jazzberry: {
    bgLight: 'bg-primary-tint-90',
    bgDark: 'bg-primary-tint-60',
    hover: 'hover:bg-primary-tint-60',
    textColor: 'text-secondary',
    borderStyles: '',
    endIconColor: '',
  },
  gray: {
    bgLight: 'bg-secondary-tint-90',
    bgDark: 'bg-secondary-tint-70',
    hover: 'hover:bg-secondary-tint-70',
    textColor: 'text-secondary',
    borderStyles: '',
    endIconColor: '',
  },
  white: {
    bgLight: 'bg-gray-20',
    bgDark: 'bg-gray-20',
    hover: 'hover:bg-secondary-tint-70',
    textColor: 'text-secondary-tint-50',
    borderStyles: '',
    endIconColor: '',
  },
  black: {
    bgLight: 'bg-gray-30',
    bgDark: 'bg-gray-30',
    hover: '',
    textColor: 'text-secondary',
    borderStyles: '',
    endIconColor: '',
  },
  clickable: {
    bgLight: 'bg-gray-30',
    bgDark: 'bg-gray-30',
    hover: '',
    textColor: 'text-primary',
    borderStyles: '',
    endIconColor: '',
  },
  disabled: {
    bgLight: 'bg-gray-30',
    bgDark: 'bg-gray-30',
    hover: '',
    textColor: 'text-gray-80',
    borderStyles: '',
    endIconColor: '',
  },
};

export type ChipColor = keyof typeof config;

const chipSizes = {
  sm: 'text-xs h-5',
  md: 'text-sm h-6',
};

const iconSizes = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
};

export type ChipProps = {
  children: ReactNode;
  color: keyof typeof config;
  id?: string;
  startIcon?: IconName;
  endIcon?: IconName;
  size?: keyof typeof chipSizes;
  isBgDark?: boolean;
  isBorder?: boolean;
  onClick?: (children: ReactNode, id?: string) => void;
  className?: string;
  iconsClassName?: string;
};

export const Chip: FC<ChipProps> = ({
  children,
  color,
  id,
  startIcon,
  endIcon,
  size = 'md',
  className,
  isBgDark,
  isBorder,
  onClick,
  iconsClassName,
}) => {
  const iconClassNames = cx(
    iconSizes[size],
    config[color]?.endIconColor,
    'py-[2px] relative group-hover:text-primary-tint-50',
  );
  const Tag = onClick ? 'button' : 'span';

  return (
    <Tag
      className={cx(
        'flex items-center rounded p-2 py-[2px] text-center font-semibold transition-all',
        config[color]?.textColor,
        isBgDark ? config[color]?.bgDark : config[color]?.bgLight,
        isBorder && config[color]?.borderStyles,
        onClick && config[color]?.hover,
        chipSizes[size],
        className,
      )}
      type={onClick ? 'button' : undefined}
      onClick={onClick && (() => onClick(children, id))}
    >
      {startIcon && (
        <Icon
          className={cx(iconClassNames, 'left-[-3px]', iconsClassName)}
          name={startIcon}
        />
      )}
      {children}
      {endIcon && (
        <Icon
          className={cx(iconClassNames, 'right-[-3px]', iconsClassName)}
          name={endIcon}
        />
      )}
    </Tag>
  );
};
