import { FC, ReactNode } from 'react';

import { Button, Modal } from '@/components/elements';
import { useTranslation } from '@/i18n';

export type ConfirmModalProps = {
  children: ReactNode;
  title: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  inSubmitting?: boolean;
  buttonTextCancel?: string;
  buttonTextConfirm?: string;
  className?: string;
  hideClose?: boolean;
};

export const ConfirmModal: FC<ConfirmModalProps> = ({
  children,
  isOpen,
  title,
  onConfirm,
  onClose,
  buttonTextCancel = 'common.cancel',
  buttonTextConfirm = 'common.confirm',
  inSubmitting,
  className,
  hideClose,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      actions={
        <>
          {!hideClose && (
            <Button
              disabled={inSubmitting}
              variant="secondary"
              onClick={onClose}
            >
              {t(buttonTextCancel)}
            </Button>
          )}
          <Button isLoading={inSubmitting} onClick={onConfirm}>
            {t(buttonTextConfirm)}
          </Button>
        </>
      }
      className={className}
      isOpen={isOpen}
      title={title}
      onClose={onClose}
    >
      {children}
    </Modal>
  );
};
