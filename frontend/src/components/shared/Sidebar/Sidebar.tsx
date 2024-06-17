import { FC, useRef } from 'react';

import { Image } from '@/components/elements';
import { useOnClickOutside } from '@/hooks';
import { cx } from '@/utils/classNames';

import { useLayout } from '../Layout/Layout';
import { Navigation } from '../Navigation/Navigation';

import { CollapseButton } from './elements/CollapseButton';

export const Sidebar: FC = () => {
  const { isMenuOpen, setMenuOpen, isCollapsed } = useLayout();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(sidebarRef, () => {
    if (isMenuOpen) {
      setMenuOpen(false);
    }
  });

  return (
    <aside
      ref={sidebarRef}
      className={cx(
        'fixed left-0 top-0 overflow-hidden overflow-y-auto bg-secondary shadow-2xl lg:pt-[84px]',
        'z-header h-screen w-16 lg:z-sidebar ',
        'transition-all duration-150 lg:translate-x-0 ',
        isMenuOpen ? 'translate-x-0' : '-translate-x-full',
        isCollapsed ? 'lg:w-16' : 'w-3/4 bg-menu-img  sm:w-1/3 lg:w-60',
      )}
    >
      {!isCollapsed && (
        <Image
          alt="Logo"
          className="mb-9 ml-6 mt-6 lg:hidden"
          height="25"
          src="/images/logo_dark.svg"
          width="163"
        />
      )}
      <CollapseButton className="hidden lg:visible" />
      <Navigation />
    </aside>
  );
};
