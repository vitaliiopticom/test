import { ReactNode, useMemo } from 'react';

import { cx } from '@/utils/classNames';

import { Dropdown, DropdownProps } from '../Dropdown/Dropdown';
import { Icon, IconName } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
import { Link } from '../Link/Link';

export type ActionMenuItemProps = (
  | { onClick: () => void; to?: never; isExternal?: never }
  | { onClick?: never; to: string; isExternal?: boolean }
) & {
  label: ReactNode;
  icon?: IconName;
  isDisabled?: boolean;
  isShown?: boolean;
  iconClassName?: string;
};

type Props = {
  items: ActionMenuItemProps[];
  children?: ReactNode;
  menuItemClassName?: string;
} & Omit<
  DropdownProps<ActionMenuItemProps>,
  'children' | 'items' | 'render' | 'getDisabled'
>;

export const ActionsMenu = ({
  items,
  wrapperClassName,
  menuClassName,
  menuItemClassName,
  children,
  placement,
  offset,
}: Props) => {
  const shownItems = useMemo(
    () => items?.filter((item) => item.isShown !== false),
    [items],
  );

  if (!shownItems.length) return null;

  return (
    <Dropdown
      getDisabled={(item) => !!item.isDisabled}
      items={shownItems}
      menuClassName={menuClassName}
      offset={offset}
      placement={placement}
      render={({ defaultClassName, item, isDisabled }) => {
        const styles = cx(
          defaultClassName,
          'text-secondary hover:text-secondary',
          isDisabled && 'text-gray-80 hover:text-gray-80 cursor-not-allowed',
          !!item.icon && 'flex items-center gap-2',
          menuItemClassName,
        );

        const content = item.icon ? (
          <>
            <Icon className={item.iconClassName} name={item.icon} />
            <span>{item.label}</span>
          </>
        ) : (
          item.label
        );

        if (item.to) {
          return (
            <Link
              className={styles}
              isDisabled={isDisabled}
              isExternal={item.isExternal}
              to={item.to}
            >
              {content}
            </Link>
          );
        }

        return (
          <button
            className={styles}
            disabled={item.isDisabled}
            type="button"
            onClick={item.onClick}
          >
            {content}
          </button>
        );
      }}
      wrapperClassName={cx(wrapperClassName, !children && 'w-fit')}
    >
      {children || <IconButton name="threeDotsVertical" variant="ghost" />}
    </Dropdown>
  );
};
