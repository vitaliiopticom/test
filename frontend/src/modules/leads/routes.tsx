import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { OptiLeadsPage } from './pages/OptiLeadsPage';
import { LeadsPage } from './pages/LeadsPage';
import { LeadDetailPage } from './pages/LeadDetailPage';

export const LeadsRoutes: FC = () => {
  return (
    <Routes>
      <Route element={<LeadsPage />} path="incoming" />
      <Route element={<LeadDetailPage />} path="detail/:id" />
      <Route element={<OptiLeadsPage />} index />
    </Routes>
  );
};
