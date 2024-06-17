import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../Header/Header';

export const SetupLayout: FC = () => {
  return (
    <>
      <Header isSetupLayout />
      <main className="pt-17.5">
        <Outlet />
      </main>
    </>
  );
};
