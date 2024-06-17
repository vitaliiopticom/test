import React, { FC, useEffect, useMemo, useState } from 'react';

import { Button, Chip, Heading, Text } from '@/components/elements';
import { PromptConfirmModal, toast } from '@/components/shared';
import { useDisclosure, useUpdateEffect } from '@/hooks';
import { NAMESPACES, useTranslation } from '@/i18n';
import { PERMISSIONS, usePermissions } from '@/modules/auth';
import { useTenant } from '@/modules/tenants';
import { CreateUserFormValues, UserFormModal } from '@/modules/users';
import { isDef } from '@/utils/common';

import { useChangeOnboardingStatusMutation } from '../api/changeOnboardingStatus';
import { useCompleteOnboardingMutation } from '../api/completeOnboarding';
import { useGetRequiredOnboardingRolesQuery } from '../api/getRequiredRoles';
import { OnboardingUsersList } from '../components/OnboardingUsersList';
import { useOnboardingUsersStore } from '../stores/useOnboardingUsersStore';
import { OnboardingUserFormValues } from '../types';

export const OnboardingPage: FC = () => {
  const { t } = useTranslation(NAMESPACES.Onboarding);
  const { users, addUser, updateUser, removeUser, removeAllUsers } =
    useOnboardingUsersStore();
  const userModal = useDisclosure(false);
  const [editUserIndex, setEditUserIndex] = useState<number>();
  const [removeUserIndex, setRemoveUserIndex] = useState<number>();
  const { tenant } = useTenant();
  const canViewAllTenants = usePermissions(PERMISSIONS.Users_View_AllTenants);
  const [completeOnboarding, completeOnboardingState] =
    useCompleteOnboardingMutation({
      onCompleted: () => {
        removeAllUsers();
      },
    });
  const { data } = useGetRequiredOnboardingRolesQuery();
  const [changeOnboardingStatus] = useChangeOnboardingStatusMutation();
  const confirmationModal = useDisclosure();

  useEffect(() => {
    changeOnboardingStatus();
    //eslint-disable-next-line
  }, []);

  const editUser = useMemo(() => {
    if (editUserIndex !== undefined) {
      return users[editUserIndex];
    }
  }, [users, editUserIndex]);

  const requiredRolesNames = useMemo(
    () =>
      data?.requiredOnboardingRoles.map((role) =>
        t(role.nameLocalizationKey, { ns: NAMESPACES.Common }),
      ) || [],
    [data?.requiredOnboardingRoles, t],
  );

  const missingRequiredRoles = useMemo(() => {
    const selectedRoles = users.flatMap((user) => {
      return user.tenantAssignments.flatMap((item) => {
        return item.roleAssignments;
      });
    });

    return (
      data?.requiredOnboardingRoles.filter(
        ({ id }) => !selectedRoles.includes(id),
      ) || []
    );
  }, [users, data?.requiredOnboardingRoles]);

  const handleClose = () => {
    setEditUserIndex(undefined);
    userModal.onClose();
  };

  const notifyAction = (action: string) => {
    const message = t(`notifications.${action}`, {
      name: t('common.user', { ns: NAMESPACES.Common }),
      ns: NAMESPACES.Common,
    });

    toast.success(message);
  };

  const addOrEditUser = (user: OnboardingUserFormValues) => {
    if (editUserIndex !== undefined) {
      updateUser(user, editUserIndex);
      notifyAction('successUpdate');
    } else {
      addUser(user);
      notifyAction('successAdd');
    }

    handleClose();
  };

  const handleSaveUser = async (
    user: CreateUserFormValues,
    userAlreadyInSystem = false,
  ) => {
    const emailInUse = users.some(
      (item, index) => item.email === user.email && index !== editUserIndex,
    );
    const onboardingUser = {
      ...user,
      userAlreadyInSystem,
    };

    if (emailInUse) {
      const message = t(
        'Error.UserManagement.Management.UsernameIsAlreadyUsed',
        {
          ns: NAMESPACES.Common,
        },
      );

      return toast.error(message);
    }

    addOrEditUser(onboardingUser);
  };

  const handleSetEditUserIndex = (index: number) => {
    setEditUserIndex(index);
    userModal.onOpen();
  };

  const submitOnboarding = () => {
    const input = users.map(
      ({ tenantAssignments, userAlreadyInSystem, ...user }) => {
        return {
          ...user,
          roleAssignments: tenantAssignments[0]?.roleAssignments.map((id) => ({
            id,
          })),
        };
      },
    );

    const usersInSystem = users.filter((user) => user.userAlreadyInSystem);

    completeOnboarding({
      variables: { input },
    }).then(() => {
      if (usersInSystem.length) {
        toast.info(
          t('notifications.usersWillBeAdded', {
            count: usersInSystem.length,
            ns: NAMESPACES.Common,
          }) as string,
        );
      }
      confirmationModal.onClose();
    });
  };

  const handleRemove = () => {
    if (isDef(removeUserIndex)) {
      removeUser(removeUserIndex);
      setRemoveUserIndex(undefined);
      notifyAction('successDelete');
    }
  };

  const handleSubmit = () => {
    const hasAllRequiredRoles = !missingRequiredRoles.length;

    if (canViewAllTenants && !hasAllRequiredRoles) {
      confirmationModal.setOpen(true);
    } else {
      submitOnboarding();
    }
  };

  useUpdateEffect(() => {
    removeAllUsers();
  }, [tenant?.id]);

  return (
    <div className="flex min-h-layoutSetup flex-col bg-white px-24 pt-12">
      <div className="max-w-screen-2xl flex-1 overflow-auto">
        <Heading variant="h2">{t('onboarding.title')}</Heading>
        {canViewAllTenants && (
          <>
            <Text className="mt-2 text-secondary-tint-40">
              {t('onboarding.subtitle')}:
            </Text>
            <div className="mt-2 flex gap-4">
              {requiredRolesNames.map((role) => (
                <Chip key={role} color="jazzberry">
                  {role}
                </Chip>
              ))}
            </div>
          </>
        )}
        <OnboardingUsersList
          removeUser={setRemoveUserIndex}
          setEditUserIndex={handleSetEditUserIndex}
          users={users}
        />
        <Button className="mt-8 w-fit" size="lg" onClick={userModal.toggle}>
          {t('onboarding.addUser')}
        </Button>
      </div>
      <div className="flex h-24 max-w-screen-2xl justify-end gap-4">
        <Button variant="secondary" disabled>
          {t('onboarding.delegate')}
        </Button>
        <Button
          disabled={!users.length}
          isLoading={completeOnboardingState.loading}
          onClick={handleSubmit}
        >
          {t('onboarding.finishOnboarding')}
        </Button>
      </div>
      <UserFormModal
        isOpen={userModal.isOpen}
        submitLabel={t(editUser ? 'common.edit' : 'common.create', {
          ns: NAMESPACES.Common,
        })}
        tenantId={tenant?.id}
        title={t(editUser ? 'onboarding.editUser' : 'onboarding.addUser')}
        user={editUser}
        withAsyncValidation
        onClose={handleClose}
        onSubmit={handleSaveUser}
      />
      <PromptConfirmModal
        isOpen={isDef(removeUserIndex)}
        title={t('users.removeUser')}
        onClose={() => setRemoveUserIndex(undefined)}
        onConfirm={handleRemove}
      >
        {t('users.confirmUserRemove')}
      </PromptConfirmModal>
      <PromptConfirmModal
        buttonTextCancel={t('common.cancel')}
        buttonTextConfirm={t('common.confirm')}
        isOpen={confirmationModal.isOpen}
        title={t('onboarding.finishOnboarding')}
        onClose={confirmationModal.onClose}
        onConfirm={submitOnboarding}
      >
        <div className="w-[300px]">
          {t('onboarding.validationMessage', {
            roles: missingRequiredRoles
              .map((role) =>
                t(role.nameLocalizationKey, { ns: NAMESPACES.Common }),
              )
              .join(', '),
            count: missingRequiredRoles.length,
          })}
        </div>
      </PromptConfirmModal>
    </div>
  );
};
