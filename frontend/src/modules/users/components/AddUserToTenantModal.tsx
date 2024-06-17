import React from 'react';

import { FormModal } from '@/components/shared';
import { useFormValidation } from '@/hooks';
import { useTranslation } from '@/i18n';

import { useAddUserToTenantMutation } from '../api/addUserToTenant';
import { AddTenantToUserFormValues, UserResponse } from '../types';
import { createFullNameFromUser } from '../utils';

import { AddUserToTenantFormFields } from './AddUserToTenantForm';

const defaultValues = { tenantId: '', roles: [] };

const ADD_USER_TO_TENANT_FORM_ID = 'add-user-to-tenant';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user?: UserResponse;
  title?: string;
  subtitle?: string;
};

export const AddUserToTenantModal: React.FC<Props> = ({
  isOpen,
  onClose,
  user,
  title,
  subtitle,
}) => {
  const { t } = useTranslation();
  const [addUserToTenant, addUserToTenantState] = useAddUserToTenantMutation({
    onCompleted: () => {
      onClose();
    },
  });
  const validation = useFormValidation();

  const schema = validation.schema<AddTenantToUserFormValues>({
    tenantId: validation.string(),
    roles: validation.stringArray(),
  });

  const handleSubmit = (values: AddTenantToUserFormValues) => {
    if (!user?.id) return;

    addUserToTenant({
      variables: {
        userId: user?.id,
        tenantAssignment: {
          tenantId: values.tenantId,
          roleAssignments: values.roles.map((item) => ({ id: item })),
        },
      },
    });
  };

  return (
    <FormModal
      alignActions="center"
      defaultValues={defaultValues}
      formId={ADD_USER_TO_TENANT_FORM_ID}
      isOpen={isOpen}
      isSubmitting={addUserToTenantState.loading}
      schema={schema}
      submitLabel={t('common.submit')}
      title={
        title ||
        t('users.addUserToTenantModalTitle', {
          userName: createFullNameFromUser(user?.firstname, user?.lastname),
        })
      }
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="min-h-[300px] min-w-[450px]">
        <p className="mb-4 text-secondary-tint-40">
          {subtitle || t('users.addUserToTenantModalText')}
        </p>
        <AddUserToTenantFormFields user={user} />
      </div>
    </FormModal>
  );
};
