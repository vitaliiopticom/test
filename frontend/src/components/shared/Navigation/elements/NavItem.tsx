import { FC } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

import { Icon, IconName, Tooltip } from '@/components/elements';
import { useTranslation } from '@/i18n';
import { Permission, usePermissions } from '@/modules/auth';
import { cx } from '@/utils/classNames';
import { isDef } from '@/utils/common';

import { useLayout } from '../../Layout';

export type NavItemProps = {
  icon: IconName;
  label: string;
  isLocked?: boolean;
  permission?: Permission | Permission[];
} & NavLinkProps;

const baseStyles =
  'flex items-center justify-between border-l-8 py-3.5 pr-2 content-center align-items transition-transform hover:bg-primary-shade-40 focus:outline-0 focus-visible:ring-1 focus-visible:ring-primary border-l-transparent bg-transparent text-secondary-tint-70';

export const NavItem: FC<NavItemProps> = ({
  icon,
  label,
  isLocked,
  permission,
  ...rest
}) => {
  const { t } = useTranslation();
  const isPermitted = usePermissions(permission);
  const isSectionLocked = isLocked || (!isPermitted && isDef(permission));
  const { isCollapsed } = useLayout();

  const linkContent = (
    <>
      <div className={cx('flex w-fit items-center gap-x-5 pl-4')}>
        <Icon className="h-4 w-4" name={icon} />
        {!isCollapsed && (
          <span className="truncate text-md font-medium">{label}</span>
        )}
      </div>
      <div>
        {isSectionLocked && !isCollapsed && (
          <Icon className="mr-2 h-4 w-4" name="lockClosed" />
        )}
      </div>
    </>
  );

  if (isSectionLocked) {
    return (
      <Tooltip content={t('common.locked')} placement="right">
        <div
          className={cx(
            baseStyles,
            'border-l-transparent bg-transparent text-secondary-tint-70',
            'cursor-not-allowed text-secondary-tint-30 hover:bg-transparent',
            isCollapsed && 'py-4.5',
          )}
          title={label}
        >
          {linkContent}
        </div>
      </Tooltip>
    );
  }

  return (
    <NavLink
      className={({ isActive }) =>
        cx(
          baseStyles,
          isActive && 'border-l-primary bg-primary-shade-40 text-white',
          isCollapsed && 'py-4.5',
        )
      }
      title={label}
      {...rest}
    >
      {linkContent}
    </NavLink>
  );
};
