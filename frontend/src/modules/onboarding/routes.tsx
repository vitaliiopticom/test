import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Authorized, PERMISSIONS } from '@/modules/auth';

import { OnboardingUnfinishedFallback } from './components/OnboardingUnfinishedFallback';
import { OnboardingPage } from './pages/OnboardingPage';

export const OnboardingRoutes: FC = () => {
  return (
    <Routes>
      <Route
        element={
          <Authorized
            permission={PERMISSIONS.Users_Add}
            permissionFallback={<OnboardingUnfinishedFallback />}
          >
            <OnboardingPage />
          </Authorized>
        }
        index
      />
    </Routes>
  );
};
