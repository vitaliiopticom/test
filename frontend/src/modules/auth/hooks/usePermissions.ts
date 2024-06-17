import { useTenant } from '@/modules/tenants';

import type { Permission } from '../types';

export const usePermissions = (permission?: Permission | Permission[]) => {
  const { tenant } = useTenant();

  if (!tenant?.validActions || !permission) return false;

  if (Array.isArray(permission)) {
    return permission.some((p) => tenant.validActions.includes(p));
  }

  return tenant.validActions.includes(permission);
};
