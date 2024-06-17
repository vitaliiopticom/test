import React, { useState } from 'react';

import { Button } from '@/components/elements';
import { Tabs, useFieldArray } from '@/components/shared';
import { TabElement } from '@/components/shared/Tabs';
import { useDisclosure } from '@/hooks';
import { useTranslation } from '@/i18n';
import { PERMISSIONS, usePermissions } from '@/modules/auth';

import { TENANT_ASSIGNMENTS } from '../constants';
import {
  UpdateUserWithMultipleTenantsForm,
  UserResponse,
  UserTenantAssignment,
} from '../types';

import { UserDetachConfirmModal } from './UserDetachConfirmModal';
import { UserRoles } from './UserRoles';

type TenantTab = UserTenantAssignment & { tabIndex: number };

type Props = {
  user: UserResponse;
  isDisabled?: boolean;
};

export const UserManagement: React.FC<Props> = ({ user, isDisabled }) => {
  const { t } = useTranslation();
  const canGetRoles = usePermissions(PERMISSIONS.Auth_GetRoles);
  const userDetachConfirmModal = useDisclosure();
  const [currentTenant, setCurrentTenant] = useState<TenantTab>();
  const { fields, remove } = useFieldArray<
    UpdateUserWithMultipleTenantsForm,
    'tenantAssignments',
    'tenantId'
  >({
    name: TENANT_ASSIGNMENTS,
  });

  const userTenants = user?.tenantAssignments || [];

  const handleTabChange = (index: number) =>
    setCurrentTenant({ ...userTenants[index], tabIndex: index });

  const handleRemoveTenantField = () => {
    const tenantFieldIdx = fields.findIndex(
      ({ tenantId }) => currentTenant?.tenantId === tenantId,
    );

    remove(tenantFieldIdx);
    handleTabChange(0);
  };

  const tabs: TabElement[] = fields.map((field, index) => {
    const tenant = userTenants.find(
      (tenant) => tenant.tenantId === field.tenantId,
    );

    const roles = canGetRoles ? undefined : tenant?.roleAssignments;
    const canDetachUser = fields?.length > 1 && !isDisabled;

    const handleDetachUserClick = () => {
      if (!tenant) {
        return;
      }

      setCurrentTenant({ ...tenant, tabIndex: index });
      userDetachConfirmModal.onOpen();
    };

    return {
      title: field.name,
      content: (
        <>
          <UserRoles
            key={field.tenantId}
            index={index}
            isDisabled={isDisabled}
            roles={roles}
            tenantId={field.tenantId}
          />
          {canDetachUser && (
            <Button
              className="mt-8"
              startIcon="userMinus"
              variant="secondary"
              onClick={handleDetachUserClick}
            >
              {t('users.detachUser')}
            </Button>
          )}
        </>
      ),
    };
  });

  return (
    <>
      <Tabs
        selectedTab={currentTenant?.tabIndex}
        setSelectedTab={handleTabChange}
        tabs={tabs}
        unmount={false}
      />
      <UserDetachConfirmModal
        handleRemoveTenantField={handleRemoveTenantField}
        isOpen={userDetachConfirmModal.isOpen}
        tenant={currentTenant}
        userId={user?.id}
        onClose={userDetachConfirmModal.onClose}
      />
    </>
  );
};
