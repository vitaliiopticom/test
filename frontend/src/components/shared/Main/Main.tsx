import { FC, ReactNode } from 'react';

import { cx } from '@/utils/classNames';

import { useLayout } from '../Layout';

type Props = {
  children: ReactNode;
};

export const Main: FC<Props> = ({ children }) => {
  const { isCollapsed } = useLayout();

  return (
    <main
      className={cx(
        'pt-17.5 transition-all duration-150',
        isCollapsed ? 'lg:pl-16' : 'lg:pl-60',
      )}
    >
      {children}
    </main>
  );
};
