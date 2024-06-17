import {
  DataSelectField,
  RequiredDataSelectFieldProps,
} from '@/components/shared';
import { useTranslation } from '@/i18n';
import { UserRoleAssignment } from '@/modules/users';

import { useGetRolesByTenantQuery } from '../api/getUserRoles';

type Props<Multi extends boolean> = RequiredDataSelectFieldProps<
  UserRoleAssignment,
  Multi
> & { tenantId?: string; roles?: UserRoleAssignment[] };

export const UserTenantRolesSelect = <Multi extends boolean>({
  tenantId,
  roles,
  ...rest
}: Props<Multi>) => {
  const { t } = useTranslation();

  const { data } = useGetRolesByTenantQuery({
    variables: {
      input: {
        tenantId: tenantId as string,
      },
    },
    skip: !tenantId || !!roles,
  });

  const mapDataToOption = (item: UserRoleAssignment) => ({
    value: item?.id,
    label: t(item?.nameLocalizationKey),
  });

  return (
    <DataSelectField
      data={roles || data?.rolesByTenant || []}
      mapDataToOption={mapDataToOption}
      {...rest}
    />
  );
};
