import { FC } from 'react';

import { Text } from '@/components/elements';
import { ConfirmModal, toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { useDetachUserFromTenantMutation } from '../api/detachUserFromTenant';
import { UserTenantAssignment } from '../types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
  tenant?: UserTenantAssignment;
  handleRemoveTenantField: () => void;
};

export const UserDetachConfirmModal: FC<Props> = ({
  isOpen,
  onClose,
  userId,
  tenant,
  handleRemoveTenantField,
}) => {
  const { t } = useTranslation();

  const { tenantId, name } = { ...tenant };

  const [detachUser, detachUserState] = useDetachUserFromTenantMutation({
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      onClose();
      handleRemoveTenantField();
      toast.info<string>(t('users.notifications.userDetachedInfo', { name }));
    },
  });

  const handleDetachUser = () => {
    if (!tenantId || !userId) return;

    detachUser({ variables: { input: { tenantId, id: userId } } });
  };

  return (
    <ConfirmModal
      buttonTextConfirm="common.detach"
      className="w-96"
      inSubmitting={detachUserState.loading}
      isOpen={isOpen}
      title={t('users.detachUserQuestion')}
      onClose={onClose}
      onConfirm={handleDetachUser}
    >
      <Text>{t('users.detachUserMessage')}</Text>
    </ConfirmModal>
  );
};
