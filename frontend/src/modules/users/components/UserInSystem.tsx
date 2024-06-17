import React from 'react';

import { PERMISSIONS, usePermissions } from '@/modules/auth';
import { UserInSystemExternalManagerModal } from '@/modules/onboarding';

import type { CreateUserFormValues } from '../types';

import { UserInSystemInternalAdminModal } from './UserInSystemInternalAdminModal';

type Props = {
  user?: CreateUserFormValues;
  onSubmit: (user: CreateUserFormValues) => void;
  onClose: () => void;
  onCloseButtonClick: () => void;
  isLoading?: boolean;
};

export const UserInSystem: React.FC<Props> = ({
  user,
  onSubmit,
  onClose,
  onCloseButtonClick,
  isLoading,
}) => {
  const viewAllTenants = usePermissions(PERMISSIONS.Users_View_AllTenants);

  if (viewAllTenants) {
    return (
      <UserInSystemInternalAdminModal
        userToAdd={user}
        onClose={onClose}
        onCloseButtonClick={onCloseButtonClick}
      />
    );
  }

  return (
    <UserInSystemExternalManagerModal
      isLoading={isLoading}
      user={user}
      onCloseButtonClick={onCloseButtonClick}
      onConfirm={onSubmit}
    />
  );
};
