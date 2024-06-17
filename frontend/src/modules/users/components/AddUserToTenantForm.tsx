import React from 'react';

import { useFormContext } from '@/components/shared';
import { useTranslation } from '@/i18n';
import { PermissionCheck, PERMISSIONS } from '@/modules/auth';

import type { UserResponse } from '../types';

import { UserTenantRolesSelect } from './UserTenantRolesSelect';
import { UserTenantSelect } from './UserTenantSelect';

type Props = {
  user?: UserResponse;
};

export const AddUserToTenantFormFields: React.FC<Props> = ({ user }) => {
  const { t } = useTranslation();
  const { watch } = useFormContext();

  const tenant = watch('tenantId');

  return (
    <>
      <PermissionCheck permission={PERMISSIONS.Users_View_AllTenants}>
        <UserTenantSelect
          className="mb-4"
          isMultiple={false}
          label={t('common.company')}
          name="tenantId"
          placeholder={t('common.company')}
          user={user}
          isRequired
        />
      </PermissionCheck>
      {tenant && (
        <UserTenantRolesSelect
          label={t('common.roles')}
          name="roles"
          placeholder={t('common.roles')}
          tenantId={tenant}
          isMultiple
        />
      )}
    </>
  );
};
