import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { Spinner } from '@/components/elements';
import { AccessDenied } from '@/components/shared';
import { useTenant } from '@/modules/tenants';
import { routes } from '@/router/routesList';

import { Permission } from '../types';

import { useAuth } from './AuthProvider';
import { PermissionCheck } from './PermissionCheck';

type Props = {
  children: ReactNode;
  permission?: Permission | Permission[];
  permissionFallback?: ReactNode;
};

export const Authorized: FC<Props> = ({
  children,
  permission,
  permissionFallback,
}) => {
  const { isAuthenticated } = useAuth();
  const { tenant, isLoading } = useTenant();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={routes.login()} replace />;
  }

  if (!tenant?.id || isLoading) {
    return (
      <div className="grid min-h-screen place-content-center bg-gray-10 text-primary">
        <Spinner size="xl" />
      </div>
    );
  }

  if (
    tenant?.redirectToOnboarding &&
    location.pathname !== routes.onboarding()
  ) {
    return <Navigate to={routes.onboarding()} replace />;
  }

  if (
    !tenant?.redirectToOnboarding &&
    location.pathname === routes.onboarding()
  ) {
    return <Navigate to={routes.users()} replace />;
  }

  if (permission) {
    return (
      <PermissionCheck
        fallback={permissionFallback || <AccessDenied />}
        permission={permission}
      >
        {children}
      </PermissionCheck>
    );
  }

  return <>{children}</>;
};
