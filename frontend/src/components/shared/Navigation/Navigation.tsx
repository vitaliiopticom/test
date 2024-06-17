import { FC, useMemo } from 'react';

import { useTranslation } from '@/i18n';

import { NavItem } from './elements/NavItem';
import { getMenuItems } from './menuItems';

export const Navigation: FC = () => {
  const { t } = useTranslation();
  const navigationItems = useMemo(() => getMenuItems(t), [t]);

  return (
    <nav>
      {navigationItems.map((item, index) => (
        <NavItem key={index} {...item} />
      ))}
    </nav>
  );
};
