import React, { PropsWithChildren, ReactNode } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';

import { Button, ButtonProps, Modal, ModalProps } from '@/components/elements';
import { useTranslation } from '@/i18n';

import { Form as FormShared, FormProps } from '../Form/Form';

type BaseProps<V extends FieldValues> = {
  formId: string;
  onSubmit: SubmitHandler<V>;
  onClose: () => void;
  isLoading?: boolean;
  loader?: ReactNode;
  isSubmitting?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  modalClassName?: string;
  alignActions?: 'start' | 'end' | 'center';
  withDivider?: boolean;
  resetFormMethodsOnClose?: boolean;
};

type Props<V extends FieldValues> = React.PropsWithChildren<
  FormProps<V> &
    BaseProps<V> &
    Pick<ModalProps, 'isOpen' | 'title' | 'isFullScreen'>
>;

type ButtonConfig = ButtonProps & { key: string };

const Form = <V extends FieldValues>({
  children,
  formId,
  ...props
}: PropsWithChildren<FormProps<V> & Pick<BaseProps<V>, 'formId'>>) => {
  return (
    <FormShared id={formId} {...props}>
      {children}
    </FormShared>
  );
};

export const FormModal = <V extends FieldValues>({
  isOpen,
  formId,
  isSubmitting,
  submitLabel,
  cancelLabel,
  isLoading,
  loader = null,
  children,
  onSubmit,
  onClose,
  modalClassName,
  title,
  isFullScreen,
  alignActions = 'end',
  withDivider,
  resetFormMethodsOnClose = true,
  ...formProps
}: Props<V>) => {
  const { t } = useTranslation();
  const handleClose = () => {
    resetFormMethodsOnClose && formProps.formMethods?.reset();
    onClose();
  };

  const actionsConfig: ButtonConfig[] = [
    {
      disabled: isSubmitting || isLoading,
      variant: 'secondary',
      children: cancelLabel ?? t('common.cancel'),
      key: 'cancelButton',
      onClick: () => handleClose?.(),
    },
    {
      disabled: isLoading,
      form: formId,
      isLoading: isSubmitting,
      type: 'submit',
      children: submitLabel ?? t('common.create'),
      key: 'confirmButton',
    },
  ];

  const actions = (
    <div className={`flex w-full justify-${alignActions} gap-4`}>
      {actionsConfig.map((buttonProps) => (
        <Button className="min-w-[125px]" {...buttonProps} />
      ))}
    </div>
  );

  return (
    <Modal
      actions={actions}
      className={modalClassName}
      isFullScreen={isFullScreen}
      isOpen={isOpen}
      title={title}
      onClose={handleClose}
    >
      {isLoading ? (
        loader
      ) : (
        <Form formId={formId} {...formProps} onSubmit={onSubmit}>
          {withDivider && <hr className="mb-8" />}
          {children}
        </Form>
      )}
    </Modal>
  );
};
