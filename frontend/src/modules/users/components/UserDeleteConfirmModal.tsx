import { FC } from 'react';

import { ConfirmModal } from '@/components/shared';
import { Trans, useTranslation } from '@/i18n';

import { useDeleteUserMutation } from '../api/deleteUser';
import { UserResponse } from '../types';
import { createFullNameFromUser } from '../utils';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user?: UserResponse;
};

export const UserDeleteConfirmModal: FC<Props> = ({
  isOpen,
  onClose,
  user,
}) => {
  const { t } = useTranslation();
  const name = createFullNameFromUser(user?.firstname, user?.lastname);

  const [deleteUser, deleteUserState] = useDeleteUserMutation({
    onCompleted: () => {
      onClose();
    },
  });

  const handleConfirm = () => {
    if (!user) return;

    deleteUser({ variables: { input: { id: user.id } } });
  };

  return (
    <ConfirmModal
      inSubmitting={deleteUserState.loading}
      isOpen={isOpen}
      title={t('common.deleteConfirmationTitle')}
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      <Trans i18nKey="users.deleteConfirmation" values={{ name }}>
        Do you really want to deactivate user
        <span className="font-semibold">{name}</span>?
      </Trans>
    </ConfirmModal>
  );
};
