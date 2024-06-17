import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/elements';
import { Page, QueryDataLoader } from '@/components/shared';
import { useTranslation } from '@/i18n';
import { PERMISSIONS, usePermissions } from '@/modules/auth';
import { UpdateUserWithMultipleTenantsForm, useProfile } from '@/modules/users';
import { routes } from '@/router/routesList';

import { useGetUserByIdQuery } from '../api/getUserById';
import { useUpdateUserMutation } from '../api/updateUser';
import { UserDetailSkeleton } from '../components/UserDetailSkeleton';
import { UserProfileForm } from '../components/UserProfileForm';
import { UserDetailParams } from '../types';

export const UserDetailPage: FC = () => {
  const { profile, refetch } = useProfile();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id = '' } = useParams<UserDetailParams>();
  const canViewUsers = usePermissions(PERMISSIONS.Module_Users);
  const canEditUser = usePermissions(PERMISSIONS.Users_Edit);
  const canEditOwnProfile = usePermissions(PERMISSIONS.Users_EditOwnProfile);
  const isCurrentUser = id === profile?.id;
  const getUserByIdQuery = useGetUserByIdQuery({
    variables: { input: { id } },
  });
  const [updateUser, updateUserState] = useUpdateUserMutation({
    onCompleted: () => {
      refetch();
      if (!isCurrentUser) {
        navigate(routes.users());
      }
    },
  });

  const handleUpdateUser = ({
    tenantAssignments,
    ...values
  }: UpdateUserWithMultipleTenantsForm) => {
    if (!canEditUser && !(canEditOwnProfile && isCurrentUser)) return;

    const userValues = {
      ...values,
      tenantAssignments: tenantAssignments.map(
        ({ tenantId, roleAssignments }) => ({
          tenantId,
          roleAssignments: roleAssignments.map((id) => ({ id })),
        }),
      ),
    };

    updateUser({
      variables: {
        input: {
          id,
          ...userValues,
        },
      },
    });
  };

  return (
    <Page
      actions={
        <>
          {canViewUsers && (
            <Button variant="ghost" onClick={() => navigate(routes.users())}>
              {t('common.cancel')}
            </Button>
          )}
          {(canEditUser || (canEditOwnProfile && isCurrentUser)) && (
            <Button
              disabled={getUserByIdQuery.loading}
              form="updateUserForm"
              isLoading={updateUserState.loading}
              type="submit"
            >
              {t('common.save')}
            </Button>
          )}
        </>
      }
      backButton={canViewUsers && !isCurrentUser}
      title={t('users.detail')}
    >
      <QueryDataLoader loader={<UserDetailSkeleton />} query={getUserByIdQuery}>
        {({ data }) => (
          <UserProfileForm
            isCurrentUser={isCurrentUser}
            isSubmitting={updateUserState.loading}
            user={data.user}
            onSubmit={handleUpdateUser}
          />
        )}
      </QueryDataLoader>
    </Page>
  );
};
