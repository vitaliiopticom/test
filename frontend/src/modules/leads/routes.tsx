import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { LeadsPage } from './pages/LeadsPage';
import { LeadDetailPage } from './pages/LeadDetailPage';

export const LeadsRoutes: FC = () => {
  return (
    <Routes>
      <Route element={<LeadsPage />} index />
      <Route element={<LeadDetailPage />} path="detail/:id" />
    </Routes>
  );
};
