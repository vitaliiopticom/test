import React, { FC, useEffect, useMemo, useState } from 'react';

import { FormModal, PromptConfirmModal, useForm } from '@/components/shared';
import { handleProceedWithPrompt } from '@/components/shared/PromptConfirmModal';
import { useDisclosure, useFormValidation } from '@/hooks';
import { useTranslation } from '@/i18n';
import { PERMISSIONS, usePermissions } from '@/modules/auth';

import { useGetUserIdsByEmailsQuery } from '../api/getUserIdsByEmails';
import { CreateUserFormValues } from '../types';

import {
  CREATE_USER_FORM_ID,
  userFormDefaultValues,
  UserFormFields,
} from './UserFormFields';
import { UserInSystem } from './UserInSystem';

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    values: CreateUserFormValues,
    userAlreadyInSystem?: boolean,
  ) => void;
  user?: CreateUserFormValues;
  tenantId?: string;
  withAsyncValidation?: boolean;
  submitLabel?: string;
  isLoading?: boolean;
  withTenantRoles?: boolean;
  isAddUser?: boolean;
};

export const UserFormModal: FC<Props> = ({
  title,
  user,
  onClose,
  onSubmit,
  isOpen,
  tenantId,
  submitLabel,
  isLoading,
  withTenantRoles,
  isAddUser,
}) => {
  const { t } = useTranslation();
  const formValidation = useFormValidation();
  const [userToAdd, setUserToAdd] = useState<CreateUserFormValues>();
  const canViewAllTenants = usePermissions(PERMISSIONS.Users_View_AllTenants);
  const { data: usersInSystemList, loading } = useGetUserIdsByEmailsQuery({
    variables: { emails: [userToAdd?.email as string] },
    skip: !userToAdd,
  });

  const warningModal = useDisclosure();

  const resetUserCreationData = () => {
    warningModal.onClose();
    setUserToAdd(undefined);
    formMethods.reset();
    onClose();
  };

  const schema = useMemo(
    () =>
      formValidation
        .schema<CreateUserFormValues>({
          gender: formValidation.string(),
          firstname: formValidation.string(),
          lastname: formValidation.string(),
          email: formValidation.email(),
          tenantAssignments: formValidation.elementSchema(canViewAllTenants),
          defaultLanguageId: formValidation.string(),
          phoneNumber: formValidation.phoneNumber(true),
          mobileNumber: formValidation.phoneNumber(true),
        })
        .refine(
          (formValues) => !!formValues.phoneNumber || !!formValues.mobileNumber,
          {
            message: t('fieldError.phoneOrMobile'),
            path: ['mobileNumber'],
          },
        ),
    [formValidation, t, canViewAllTenants],
  );
  const defaultValues = {
    ...userFormDefaultValues,
    ...user,
  } as CreateUserFormValues;

  const formMethods = useForm({
    schema,
    defaultValues,
    mode: 'onChange',
  });

  const handleClose = () =>
    handleProceedWithPrompt(
      formMethods,
      warningModal.onOpen,
      resetUserCreationData,
    );

  useEffect(() => {
    if (!isOpen) {
      handleClose();
    }
  }, [isOpen]);

  useEffect(() => {
    if (
      usersInSystemList &&
      !usersInSystemList?.userIdsByEmails.length &&
      userToAdd
    ) {
      onSubmit(userToAdd);
      setUserToAdd(undefined);
    }
  }, [usersInSystemList?.userIdsByEmails]);

  return (
    <>
      <FormModal
        defaultValues={defaultValues}
        formId={CREATE_USER_FORM_ID}
        formMethods={formMethods}
        isOpen={isOpen}
        isSubmitting={isLoading || loading}
        resetFormMethodsOnClose={false}
        schema={schema}
        submitLabel={submitLabel}
        title={title}
        withDivider
        onClose={handleClose}
        onSubmit={setUserToAdd}
      >
        <UserFormFields
          isAddUser={isAddUser}
          tenantId={tenantId}
          withTenantRoles={withTenantRoles}
        />
      </FormModal>
      <PromptConfirmModal
        isOpen={warningModal.isOpen}
        onClose={warningModal.onClose}
        onConfirm={resetUserCreationData}
      />
      <UserInSystem
        isLoading={isLoading}
        user={
          usersInSystemList?.userIdsByEmails?.length ? userToAdd : undefined
        }
        onClose={resetUserCreationData}
        onCloseButtonClick={() => setUserToAdd(undefined)}
        onSubmit={(values) => onSubmit(values, true)}
      />
    </>
  );
};
