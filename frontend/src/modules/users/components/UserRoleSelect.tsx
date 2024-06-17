import { FC, useMemo } from 'react';

import { SelectValue } from '@/components/elements';
import { SelectField, useFormContext } from '@/components/shared';
import { useTranslation } from '@/i18n';
import { useTenant } from '@/modules/tenants';
import { OptionType } from '@/types/form';

import { useGetGlobalRolesQuery } from '../api/getGlobalRoles';
import { UserRoleAssignment } from '../types';

export const UserRoleSelect: FC = () => {
  const { t } = useTranslation();
  const { tenant } = useTenant();
  const { data, loading } = useGetGlobalRolesQuery();
  const { setValue } = useFormContext();

  const tenantId = tenant?.id || '';

  const rolesOptions: OptionType<string>[] = useMemo(() => {
    const mappedOptions =
      data?.globalRoles?.map(
        ({ id, nameLocalizationKey }: UserRoleAssignment) => ({
          value: id,
          label: t(nameLocalizationKey),
        }),
      ) || [];

    return [
      ...mappedOptions,
      {
        value: tenantId,
        label: t('users.emptyRoles'),
      },
    ];
  }, [data?.globalRoles, t, tenantId]);

  return (
    <SelectField<string, false>
      handleOnChange={(value: SelectValue) =>
        setValue('role.noRoles', value === tenantId)
      }
      isLoading={loading}
      name="role.id"
      options={rolesOptions}
      placeholder={t('common.role')}
    />
  );
};
