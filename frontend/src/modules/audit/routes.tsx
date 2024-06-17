import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Authorized, PERMISSIONS } from '@/modules/auth';

import { AuditDetailPage } from './pages/AuditDetailPage';
import { AuditPage } from './pages/AuditPage';

export const AuditRoutes: FC = () => {
  return (
    <Routes>
      <Route
        element={
          <Authorized permission={PERMISSIONS.Module_OptiAudit}>
            <AuditPage />
          </Authorized>
        }
        index
      />
      <Route
        element={
          <Authorized permission={PERMISSIONS.Module_OptiAudit}>
            <AuditDetailPage />
          </Authorized>
        }
        path="detail/:id"
      />
    </Routes>
  );
};
