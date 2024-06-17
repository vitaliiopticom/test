import { FC } from 'react';

import { DataView, InputField } from '@/components/shared';
import { useTranslation } from '@/i18n';
import { PermissionCheck, PERMISSIONS } from '@/modules/auth';

import { UserRoleSelect } from './UserRoleSelect';
import { UserTenantSelect } from './UserTenantSelect';

export const UsersListFilters: FC = () => {
  const { t } = useTranslation();

  return (
    <DataView.FilterGroup>
      <InputField
        endIcon="search"
        name="search"
        placeholder={t('common.nameOrEmail')}
      />
      <PermissionCheck permission={PERMISSIONS.Users_View_AllTenants}>
        <UserTenantSelect name="tenantId" placeholder={t('common.company')} />
      </PermissionCheck>
      <UserRoleSelect />
    </DataView.FilterGroup>
  );
};
