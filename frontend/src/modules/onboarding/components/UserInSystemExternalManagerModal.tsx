import React from 'react';

import { ConfirmModal } from '@/components/shared';
import { Trans, useTranslation } from '@/i18n';
import { createFullNameFromUser } from '@/modules/users';

import { OnboardingUserFormValues } from '../types';

type Props = {
  onConfirm: (user: OnboardingUserFormValues) => void;
  isLoading?: boolean;
  user?: OnboardingUserFormValues;
  onCloseButtonClick: () => void;
};

export const UserInSystemExternalManagerModal: React.FC<Props> = ({
  onConfirm,
  user,
  isLoading,
  onCloseButtonClick,
}) => {
  const { t } = useTranslation();

  const { email } = user || {};
  const name = createFullNameFromUser(user?.firstname, user?.lastname);

  const handleConfirm = () => {
    onConfirm(user as OnboardingUserFormValues);
  };

  return (
    <ConfirmModal
      buttonTextConfirm={t('common.sendMail')}
      className="w-[386px]"
      inSubmitting={isLoading}
      isOpen={!!user}
      title={t('users.userAlreadyExistsTitle')}
      onClose={onCloseButtonClick}
      onConfirm={handleConfirm}
    >
      <Trans
        i18nKey="users.userAlreadyExistsDescription"
        values={{ email, name }}
      >
        To protect user's data, we'll sent an email to <b>{email}</b> asking for
        their confirmation to work with <b>{name}</b>. Once confirmed, you'll be
        able to see them in your company's user list
      </Trans>
    </ConfirmModal>
  );
};
