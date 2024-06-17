import {
  DataSelectField,
  RequiredDataSelectFieldProps,
} from '@/components/shared';
import { Tenant, useGetTenantsQuery } from '@/modules/tenants';

import { UserResponse } from '../types';

type Props<Multi extends boolean> = RequiredDataSelectFieldProps<
  Tenant,
  Multi
> & { user?: UserResponse; tenants?: Tenant[] };

export const UserTenantSelect = <Multi extends boolean>({
  user,
  tenants,
  ...rest
}: Props<Multi>) => {
  const { data } = useGetTenantsQuery();

  const userAssignedTenants = user?.tenantAssignments.map(
    (tenantAssignment) => tenantAssignment.tenantId,
  );

  const filteredTenants = data?.tenants.filter(
    (tenant) => !userAssignedTenants?.includes(tenant.id),
  );

  return <DataSelectField data={tenants || filteredTenants || []} {...rest} />;
};
