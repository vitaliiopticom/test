import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';

import { useEventListener, usePersistedState } from '@/hooks';
import { InviteUserToTenantModal, useTenant } from '@/modules/tenants';

import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Sidebar } from '../Sidebar/Sidebar';

type LayoutState = {
  isMenuOpen: boolean;
  isCollapsed: boolean;
};

type LayoutContextType = LayoutState & {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
};

const LayoutContext = createContext({} as LayoutContextType);

export const Layout: FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isCollapsed, setCollapsed] = usePersistedState<boolean>(
    'sidebar_collapsed',
    false,
  );
  const { tenant } = useTenant();

  const { pending } = tenant || {};

  useEffect(() => {
    if (isCollapsed && isMenuOpen) {
      setCollapsed(false);
      setMenuOpen(false);
    }
  }, [isCollapsed, isMenuOpen, setCollapsed]);

  useEventListener('resize', () => setCollapsed(window.innerWidth <= 1280));

  const value: LayoutContextType = {
    isMenuOpen,
    setMenuOpen,
    isCollapsed,
    setCollapsed,
  };

  return (
    <LayoutContext.Provider value={value}>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
      <ScrollRestoration />
      {pending && <InviteUserToTenantModal />}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
