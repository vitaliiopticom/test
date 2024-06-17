import { FC, ReactNode } from 'react';

import { Button, Modal } from '@/components/elements';
import { useTranslation } from '@/i18n';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children?: ReactNode;
  title?: string;
  isSubmitting?: boolean;
  buttonTextCancel?: string;
  buttonTextConfirm?: string;
};

export const PromptConfirmModal: FC<Props> = ({
  children,
  isOpen,
  title = 'common.warning',
  onConfirm,
  onClose,
  buttonTextCancel = 'common.no',
  buttonTextConfirm = 'common.yes',
  isSubmitting,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      actions={
        <>
          <Button variant="secondary" onClick={onClose}>
            {t(buttonTextCancel)}
          </Button>
          <Button isLoading={isSubmitting} onClick={onConfirm}>
            {t(buttonTextConfirm)}
          </Button>
        </>
      }
      isOpen={isOpen}
      title={t(title)}
      onClose={onClose}
    >
      {children ?? (
        <>
          {t('common.lostFormWarningLine1')}
          <br />
          {t('common.lostFormWarningLine2')}
        </>
      )}
    </Modal>
  );
};
