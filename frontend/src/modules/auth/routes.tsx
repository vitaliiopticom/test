import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { LoginPage } from './pages/LoginPage';

export const AuthRoutes: FC = () => {
  return (
    <Routes>
      <Route element={<LoginPage />} index />
    </Routes>
  );
};
