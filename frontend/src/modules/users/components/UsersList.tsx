import React, { FC, useMemo, useState } from 'react';
import { Row } from '@tanstack/react-table';

import { ActionsMenu, Icon, Tooltip } from '@/components/elements';
import { createTableColumns, DataView, useFilters } from '@/components/shared';
import { useTranslation } from '@/i18n';
import { PERMISSIONS, usePermissions } from '@/modules/auth';
import { routes } from '@/router/routesList';

import { USERS_DATA_VIEW_ID } from '../constants';
import { UserResponse } from '../types';

import { AddUserToTenantModal } from './AddUserToTenantModal';
import { RolesListStatus } from './RolesListStatus';
import { UserDeleteConfirmModal } from './UserDeleteConfirmModal';
import { UsersListFilters } from './UsersListFilters';

export const UsersList: FC = () => {
  const { t } = useTranslation();
  const [tenantedUser, setTenantedUser] = useState<UserResponse>();
  const [deletedUser, setDeletedUser] = useState<UserResponse>();
  const canAddUser = usePermissions(PERMISSIONS.Users_Add_AllTenants);
  const canViewUser = usePermissions(PERMISSIONS.Users_View);
  const canDeleteUser = usePermissions(PERMISSIONS.Users_Delete);
  const canViewCompanyColumn = usePermissions(
    PERMISSIONS.Users_View_AllTenants,
  );
  const filters = useFilters(USERS_DATA_VIEW_ID);
  const assignments = (row: Row<UserResponse>) => {
    const tenantAssignments = row.original.tenantAssignments;
    const filteredAssignment = tenantAssignments?.find(
      (assignment) => assignment.tenantId === filters?.tenantId,
    );

    return filteredAssignment || tenantAssignments?.[0];
  };

  const columns = useMemo(
    () =>
      createTableColumns<UserResponse>((ch) => [
        ch.accessor('firstname', {
          header: () => t('common.firstname'),
        }),
        ch.accessor('lastname', {
          header: () => t('common.lastname'),
          cell: ({ row }) => row.original.lastname?.toUpperCase(),
        }),
        ch.accessor('email', {
          header: () => t('common.email'),
          cell: ({ row }) => {
            if (assignments(row)?.pending) {
              return (
                <Tooltip
                  content={t('users.invitedUserToTenant.pending')}
                  placement="top"
                >
                  <div className="flex items-center gap-2">
                    {row.original.email}
                    <Icon className="text-primary-tint-70" name="userPlus" />
                  </div>
                </Tooltip>
              );
            }
            return <>{row.original.email}</>;
          },
        }),
        ch.accessor(
          (data) => {
            const filteredAssignment = data.tenantAssignments.find(
              (assignment) => assignment.tenantId === filters?.tenantId,
            );

            return (
              (filteredAssignment || data.tenantAssignments?.[0])?.name || '-'
            );
          },
          {
            id: 'tenantName',
            header: () => t('common.company'),
          },
        ),
        ch.accessor('phoneNumber', {
          header: () => t('common.phoneNumber'),
        }),
        ch.accessor('mobileNumber', {
          header: () => t('common.mobileNumber'),
        }),
        ch.accessor('tenantAssignments', {
          header: () => t('common.roles'),
          cell: ({ row }) => {
            const roles =
              assignments(row)?.roleAssignments?.map((role) =>
                t(role.nameLocalizationKey, { defaultValue: role.name }),
              ) || [];

            return <RolesListStatus roles={roles} />;
          },
        }),
        ch.display({
          id: '_actions',
          header: () => t('common.actions'),
          cell: ({ row }) => {
            return (
              <ActionsMenu
                items={[
                  {
                    label: t('common.detail'),
                    to: routes.userDetail(row.original.id),
                    isShown: canViewUser,
                  },
                  {
                    label: t('users.addUserToTenantAction'),
                    onClick: () => setTenantedUser(row.original),
                    isShown: canAddUser,
                  },
                  {
                    label: (
                      <span className="text-cerise">
                        {t('common.deactivate')}
                      </span>
                    ),
                    onClick: () => setDeletedUser(row.original),
                    isShown: canDeleteUser,
                  },
                ]}
              />
            );
          },
        }),
      ]),
    [t, canAddUser, canViewUser, canDeleteUser, filters, assignments],
  );

  return (
    <>
      <div className="mb-5 flex justify-between">
        <DataView.RecordsCount />
        <DataView.FiltersToggle />
      </div>
      <DataView.Filters hasToggle>
        <UsersListFilters />
      </DataView.Filters>
      <DataView.Table
        columns={columns}
        initialState={{
          columnVisibility: { tenantName: canViewCompanyColumn },
        }}
      />
      <UserDeleteConfirmModal
        isOpen={!!deletedUser}
        user={deletedUser}
        onClose={() => setDeletedUser(undefined)}
      />
      <AddUserToTenantModal
        isOpen={!!tenantedUser}
        user={tenantedUser}
        onClose={() => setTenantedUser(undefined)}
      />
    </>
  );
};
