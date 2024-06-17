import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Authorized, PERMISSIONS } from '@/modules/auth';

import { UserDetailPage } from './pages/UserDetailPage';
import { UsersPage } from './pages/UsersPage';

export const UsersRoutes: FC = () => {
  return (
    <Routes>
      <Route
        element={
          <Authorized
            permission={[PERMISSIONS.Module_Users, PERMISSIONS.Users_View]}
          >
            <UsersPage />
          </Authorized>
        }
        index
      />
      <Route
        element={
          <Authorized
            permission={[
              PERMISSIONS.Module_Users,
              PERMISSIONS.Users_View,
              PERMISSIONS.Users_EditOwnProfile,
            ]}
          >
            <UserDetailPage />
          </Authorized>
        }
        path="detail/:id"
      />
    </Routes>
  );
};
