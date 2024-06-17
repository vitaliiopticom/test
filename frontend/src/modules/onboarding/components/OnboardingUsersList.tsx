import React, { useMemo } from 'react';

import { ActionsMenu, Icon, Tooltip } from '@/components/elements';
import { createTableColumns, DataView } from '@/components/shared';
import { useTranslation } from '@/i18n';
import {
  CreateUserFormValues,
  RolesListStatus,
  useGetRolesQuery,
} from '@/modules/users';

import { ONBOARDING_DATA_VIEW_ID } from '../constants';
import { OnboardingUserFormValues } from '../types';

const TenantRolesCell: React.FC<{ user: CreateUserFormValues }> = ({
  user,
}) => {
  const { t } = useTranslation();
  const { roleAssignments } = user.tenantAssignments?.[0] ?? {};
  const { data } = useGetRolesQuery({
    skip: !roleAssignments,
  });

  const roles = useMemo(
    () =>
      data?.roles
        .filter((role) => roleAssignments.includes(role.id))
        .map((role) => t(role.nameLocalizationKey)) ?? [],
    [t, data?.roles, roleAssignments],
  );

  return <RolesListStatus roles={roles} />;
};

type Props = {
  users: OnboardingUserFormValues[];
  removeUser: (index: number) => void;
  setEditUserIndex: (index: number) => void;
};

export const OnboardingUsersList: React.FC<Props> = ({
  users,
  removeUser,
  setEditUserIndex,
}) => {
  const { t } = useTranslation();

  const columns = useMemo(
    () =>
      createTableColumns<OnboardingUserFormValues>((ch) => [
        ch.accessor('firstname', {
          header: () => t('common.firstname'),
        }),
        ch.accessor('lastname', {
          header: () => t('common.lastname'),
          cell: ({ row }) => (
            <span className="uppercase">{row.original.lastname}</span>
          ),
        }),
        ch.accessor('email', {
          header: () => t('common.email'),
          cell: ({ row }) => {
            return (
              <div className="flex items-center gap-2">
                {row.original.email}
                {row.original.userAlreadyInSystem && (
                  <Tooltip content={t('users.emailSentToUser')} placement="top">
                    <div>
                      <Icon className="text-primary-tint-70" name="userPlus" />
                    </div>
                  </Tooltip>
                )}
              </div>
            );
          },
        }),
        ch.accessor('phoneNumber', {
          header: () => t('common.phoneNumber'),
        }),
        ch.display({
          id: 'roles',
          header: () => t('common.roles'),
          cell: ({ row }) => <TenantRolesCell user={row.original} />,
        }),
        ch.display({
          id: '_actions',
          header: () => t('common.actions'),
          cell: (column) => {
            const { index } = column.cell.row;

            return (
              <ActionsMenu
                items={[
                  {
                    label: t('common.seeEditDetail'),
                    onClick: () => setEditUserIndex(index),
                  },
                  {
                    label: t('common.remove'),
                    onClick: () => removeUser(index),
                  },
                ]}
              />
            );
          },
        }),
      ]),
    [t, setEditUserIndex, removeUser],
  );

  if (users.length) {
    return (
      <div className="mt-8">
        <DataView
          data={users}
          id={ONBOARDING_DATA_VIEW_ID}
          initialPageSize={1000}
          recordsCount={users.length}
        >
          <DataView.RecordsCount
            className="mb-2"
            rowsCountFormat={(count) => {
              const userLabel = t('common.user', { count });

              return `${count} ${userLabel}`;
            }}
          />
          <DataView.Table columns={columns} hasDataViewPagination={false} />
        </DataView>
      </div>
    );
  }

  return null;
};
