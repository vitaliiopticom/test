import { FC, useMemo } from 'react';

import { Button, Modal, Text } from '@/components/elements';
import { Form, PasswordInputField } from '@/components/shared';
import { useFormValidation } from '@/hooks';
import { useTranslation } from '@/i18n';

import { useChangeOptipixPasswordMutation } from '../api/changeOptipixPassword';
import { ChangeOptipixPasswordFormValues } from '../types';

import { useProfile } from './ProfileProvider';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const OptipixPasswordSetModal: FC<Props> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const formValidation = useFormValidation();
  const { profile } = useProfile();
  const [changePassword, changePasswordState] =
    useChangeOptipixPasswordMutation({
      onCompleted: () => {
        onClose?.();
      },
    });

  const handleSubmit = (values: ChangeOptipixPasswordFormValues) => {
    if (!profile?.email) return;

    changePassword({
      variables: {
        input: {
          optipixPassword: values.password,
        },
      },
    });
  };

  const schema = useMemo(
    () =>
      formValidation
        .schema<ChangeOptipixPasswordFormValues>({
          password: formValidation.string(),
          repeatPassword: formValidation.string(),
        })
        .refine(
          (formValues) => formValues.password === formValues.repeatPassword,
          {
            message: t('fieldError.passwordsMatch'),
            path: ['repeatPassword'],
          },
        ),
    [formValidation, t],
  );

  return (
    <Modal
      className="w-[300px]"
      isOpen={isOpen}
      title={t('users.optipixPassword.title')}
      onClose={onClose}
    >
      <Text className="mb-9">{t('users.optipixPassword.resetText')}</Text>
      <Form
        className="flex flex-col gap-3"
        schema={schema}
        onSubmit={handleSubmit}
      >
        <PasswordInputField label={t('common.password')} name="password" />
        <PasswordInputField
          label={t('common.repeatPassword')}
          name="repeatPassword"
        />
        <Button
          className="mt-6 w-full"
          isLoading={changePasswordState.loading}
          type="submit"
        >
          {t('users.optipixPassword.submit')}
        </Button>
      </Form>
    </Modal>
  );
};
