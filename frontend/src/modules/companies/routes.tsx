import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Authorized, PERMISSIONS } from '@/modules/auth';
import { ContractPage } from '@/modules/contracts';

import { CompaniesPage } from './pages/CompaniesPage';
import { CompanyDetailPage } from './pages/CompanyDetailPage';

export const CompaniesRoutes: FC = () => {
  return (
    <Routes>
      <Route
        element={
          <Authorized
            permission={[
              PERMISSIONS.Module_Companies,
              PERMISSIONS.Companies_View,
            ]}
          >
            <CompaniesPage />
          </Authorized>
        }
        index
      />
      <Route
        element={
          <Authorized
            permission={[
              PERMISSIONS.Module_Companies,
              PERMISSIONS.Companies_View,
              PERMISSIONS.CompanyProfiles_View,
            ]}
          >
            <CompanyDetailPage />
          </Authorized>
        }
        path="detail/:id"
      />
      <Route
        element={
          <Authorized
            permission={[
              PERMISSIONS.Module_Companies,
              PERMISSIONS.Companies_View,
            ]}
          >
            <ContractPage />
          </Authorized>
        }
        path="/:companyId/contracts/:contractId"
      />
    </Routes>
  );
};
