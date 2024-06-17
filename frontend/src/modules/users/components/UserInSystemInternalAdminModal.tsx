import React, { useEffect } from 'react';

import { Button, Modal, Text } from '@/components/elements';
import { Form, useForm } from '@/components/shared';
import { useFormValidation } from '@/hooks';
import { useTranslation } from '@/i18n';
import { PermissionCheck, PERMISSIONS } from '@/modules/auth';
import { useGetTenantsQuery, useTenant } from '@/modules/tenants';

import { useAddUserToTenantMutation } from '../api/addUserToTenant';
import { useGetUserIdsByEmailsQuery } from '../api/getUserIdsByEmails';
import { CreateUserFormValues } from '../types';

import { UserTenantRolesSelect } from './UserTenantRolesSelect';
import { UserTenantSelect } from './UserTenantSelect';

type UserInSystemFormValues = {
  tenantId: string;
  roleAssignments: string[];
};

type Props = {
  onClose: () => void;
  userToAdd?: CreateUserFormValues;
  onCloseButtonClick: () => void;
};

export const UserInSystemInternalAdminModal: React.FC<Props> = ({
  onClose,
  userToAdd,
  onCloseButtonClick,
}) => {
  const validation = useFormValidation();
  const { t } = useTranslation();
  const { tenant } = useTenant();
  const { data } = useGetTenantsQuery();
  const [addUserToTenant, addUserToTenantState] = useAddUserToTenantMutation({
    onCompleted: () => {
      onClose();
    },
  });

  const variables = userToAdd?.email
    ? { emails: [userToAdd?.email] }
    : undefined;

  const userIdsByEmailsQuery = useGetUserIdsByEmailsQuery({
    variables,
    skip: !userToAdd,
  });

  const schema = validation.schema<UserInSystemFormValues>({
    tenantId: validation.string(),
    roleAssignments: validation.stringArray(),
  });

  const formMethods = useForm<UserInSystemFormValues>({
    schema,
  });
  const tenantAssignment = userToAdd?.tenantAssignments?.[0];

  useEffect(() => {
    if (tenantAssignment) {
      formMethods.reset(tenantAssignment);
    }
  }, [tenantAssignment]);

  const tenants = data?.tenants.filter((item) => item.id !== tenant?.id);
  const tenantId = formMethods.watch('tenantId');
  const email = userToAdd?.email;

  const handleSubmit = ({
    tenantId,
    roleAssignments,
  }: UserInSystemFormValues) => {
    const userId = userIdsByEmailsQuery?.data?.userIdsByEmails?.[0]?.id;

    if (!userId) {
      return;
    }

    addUserToTenant({
      variables: {
        userId,
        tenantAssignment: {
          tenantId,
          roleAssignments: roleAssignments.map((item) => ({ id: item })),
        },
      },
    });
  };

  if (!tenants?.length) {
    return null;
  }

  return (
    <Modal
      className="w-[460px]"
      isOpen={!!userToAdd}
      title={t('users.emailAlreadyAssociated')}
      onClose={onCloseButtonClick}
    >
      <Text className="mb-8">
        {t('users.emailAlreadyAssociatedConfirm', { email })}
      </Text>
      <Text className="mb-4 text-secondary-tint-40">
        {t('users.checkCompanyRole')}
      </Text>
      <Form formMethods={formMethods} onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <PermissionCheck permission={PERMISSIONS.Users_View_AllTenants}>
            <UserTenantSelect
              className="mb-4"
              disabled={addUserToTenantState.loading}
              isMultiple={false}
              label={t('common.company')}
              name="tenantId"
              placeholder={t('common.company')}
              tenants={tenants}
              isRequired
            />
          </PermissionCheck>
          {tenantId && (
            <UserTenantRolesSelect
              disabled={addUserToTenantState.loading}
              label={t('common.roles')}
              name="roleAssignments"
              placeholder={t('common.roles')}
              tenantId={tenantId}
              isMultiple
            />
          )}
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <Button
            className="w-[125px]"
            disabled={addUserToTenantState.loading}
            type="button"
            variant="secondary"
            onClick={onCloseButtonClick}
          >
            {t('common.back')}
          </Button>
          <Button
            className="w-[125px]"
            isLoading={addUserToTenantState.loading}
            type="submit"
          >
            {t('common.confirm')}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
