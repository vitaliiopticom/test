import React from 'react';
import { Navigate } from 'react-router-dom';

import { PERMISSIONS, usePermissions } from '@/modules/auth';
import { useTenant } from '@/modules/tenants';
import { useProfile } from '@/modules/users';
import { routes } from '@/router/routesList';

const {
  OptiPix_AccessOptiPix,
  OptiContent_View_ChildTenants,
  OptiContent_View_AllPhotos,
  Module_Users,
  Module_OptiAudit,
  OptiContent_View_AllTenants,
} = PERMISSIONS;

const loginRedirectMap: Record<string, string> = {
  [OptiContent_View_AllPhotos]: routes.content(), // Marketing Manager dealership
  [OptiContent_View_ChildTenants]: routes.content(), // Marketing Manager dealer group
  [OptiPix_AccessOptiPix]: routes.content(), // Photographer
  [Module_Users]: routes.users(), // UAM (all)
  [Module_OptiAudit]: routes.audit(), // Audit Manager (all)
  [OptiContent_View_AllTenants]: routes.content(), // Photo quality checker internal
};

export const IndexRoute: React.FC = () => {
  const { tenant } = useTenant();
  const { profile } = useProfile();
  const canViewOptiAudit = usePermissions(PERMISSIONS.Module_OptiAudit);
  const canViewChildTenants = usePermissions(
    PERMISSIONS.OptiContent_View_ChildTenants,
  );
  const canViewCompanies = usePermissions(PERMISSIONS.Module_Companies);

  const getIndexRoute = () => {
    if (profile?.id) {
      // if audit manager + marketing manager = marketing manager has priority
      if (canViewOptiAudit && canViewChildTenants) {
        return routes.content();
      }

      // internal admin
      if (canViewCompanies) {
        return routes.companies();
      }

      const redirectPath = tenant?.validActions.reduce(
        (redirectPath, permission) => {
          const path = loginRedirectMap[permission];

          return redirectPath || path || '';
        },
        '',
      );

      // fallback path
      return redirectPath || routes.userDetail(profile.id);
    }

    return routes.login();
  };

  const indexRoute = getIndexRoute();

  return <Navigate to={indexRoute} replace />;
};
