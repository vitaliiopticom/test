import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Authorized } from '@/modules/auth';

import { InvoicingPage } from './pages/InvoicingPage';

export const InvoicingRoutes: FC = () => {
  return (
    <Routes>
      <Route
        element={
          <Authorized>
            <InvoicingPage />
          </Authorized>
        }
        index
      />
    </Routes>
  );
};
