import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Authorized, PERMISSIONS } from '@/modules/auth';

import { ContentDetailPage } from './pages/ContentDetailPage';
import { ContentPage } from './pages/ContentPage';
import { ContentStatisticsPage } from './pages/ContentStatisticsPage';

export const ContentRoutes: FC = () => {
  return (
    <Routes>
      <Route
        element={
          <Authorized
            permission={[
              PERMISSIONS.Module_OptiContent,
              PERMISSIONS.OptiContent_View,
            ]}
          >
            <ContentPage />
          </Authorized>
        }
        index
      />
      <Route
        element={
          <Authorized
            permission={[
              PERMISSIONS.Module_OptiContent,
              PERMISSIONS.OptiContent_View,
            ]}
          >
            <ContentDetailPage />
          </Authorized>
        }
        path="detail/:id"
      />
      <Route
        element={
          <Authorized
            permission={[
              PERMISSIONS.Module_OptiContent,
              PERMISSIONS.OptiContent_View,
            ]}
          >
            <ContentStatisticsPage />
          </Authorized>
        }
        path="statistics"
      />
    </Routes>
  );
};
