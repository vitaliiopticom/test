import { FC } from 'react';

import { ConfirmModal } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { useUpdateAuditStatusMutation } from '../../api/updateAuditStatus';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  questionnaireId: string;
};

export const MarkAsSentConfirmModal: FC<Props> = ({
  isOpen,
  onClose,
  questionnaireId,
}) => {
  const { t } = useTranslation();
  const [updateAuditStatus, updateAuditStatusState] =
    useUpdateAuditStatusMutation({
      onCompleted: () => {
        onClose();
      },
    });

  const handleConfirm = () => {
    if (!questionnaireId) return;

    updateAuditStatus({ variables: { questionnaireId } });
  };

  return (
    <ConfirmModal
      buttonTextConfirm={t('common.send')}
      inSubmitting={updateAuditStatusState.loading}
      isOpen={isOpen}
      title={t('common.warning')}
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      {t('audit.auditDetail.markAsSentConfirmText')}
    </ConfirmModal>
  );
};
