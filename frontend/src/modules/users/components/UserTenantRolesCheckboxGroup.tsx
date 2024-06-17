import {
  DataCheckboxGroupField,
  RequiredDataCheckboxGroupFieldProps,
} from '@/components/shared';
import { useTranslation } from '@/i18n';
import { DropDownSelectOption } from '@/types/form';

import { useGetRolesByTenantQuery } from '../api/getUserRoles';

import { UserRolesSkeleton } from './UserRolesSkeleton';

type Props = {
  tenantId?: string;
  isDisabled?: boolean;
  roles?: DropDownSelectOption[];
} & RequiredDataCheckboxGroupFieldProps<DropDownSelectOption>;

export const UserTenantRolesCheckboxGroup = ({
  tenantId,
  isDisabled,
  roles,
  ...rest
}: Props) => {
  const { t } = useTranslation();
  const { data, loading } = useGetRolesByTenantQuery({
    variables: {
      input: {
        tenantId: tenantId as string,
      },
    },
    skip: !tenantId || !!roles,
  });

  return (
    <>
      {loading ? (
        <UserRolesSkeleton />
      ) : (
        <DataCheckboxGroupField
          className="[&>div]:grid-cols1 [&>div]:grid [&>div]:gap-x-9 [&>div]:2xl:grid-cols-2"
          data={roles || data?.rolesByTenant || []}
          labelClassName="inline-block max-w-[30ch] truncate"
          mapDataToOption={(item) => {
            const label = t(item.nameLocalizationKey, {
              defaultValue: item.name,
            });

            return {
              value: item.id,
              label,
              tooltip: label.length > 33 ? label : undefined,
              isDisabled,
            };
          }}
          {...rest}
        />
      )}
    </>
  );
};
