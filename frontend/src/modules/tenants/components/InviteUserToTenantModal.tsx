import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Spinner, Text } from '@/components/elements';
import { FormModal, InputField, QueryDataLoader } from '@/components/shared';
import { useDisclosure } from '@/hooks';
import { useTranslation } from '@/i18n';
import { useTenant } from '@/modules/tenants';
import {
  useGetUserByIdQuery,
  useProfile,
  UserTenantRolesSelect,
} from '@/modules/users';
import { routes } from '@/router/routesList';

import { useConfirmTenantInvitationMutation } from '../api/confirmTenantInvitation';
import { useDenyTenantInvitationMutation } from '../api/denyTenantInvitation';

const INVITE_USER_TO_TENANT_ID = 'invite-user-to-tenant';

const RESPONSE_TO_INVITATION_TYPES = {
  confirm: 'confirm',
  deny: 'deny',
} as const;

type ResponseToInvitation = keyof typeof RESPONSE_TO_INVITATION_TYPES;

type FormValues = {
  tenant: string;
  roles: string[];
};

export const InviteUserToTenantModal: React.FC = () => {
  const { tenant } = useTenant();
  const { profile } = useProfile();
  const modal = useDisclosure();
  const navigate = useNavigate();

  const onCompleted = () => {
    modal.onClose();
    navigate(routes.index());
  };

  const [confirmInvitation, confirmInvitationState] =
    useConfirmTenantInvitationMutation({
      onCompleted,
    });

  const [denyInvitation, denyInvitationState] = useDenyTenantInvitationMutation(
    {
      onCompleted,
    },
  );
  const { t } = useTranslation();
  const getUserByIdQuery = useGetUserByIdQuery({
    variables: { input: { id: profile?.id as string } },
    skip: !profile?.id,
  });

  const handleResponseToInvitation = (type: ResponseToInvitation) => {
    if (!tenant) return;

    const reqBody = { variables: { tenantId: tenant?.id } };

    type === RESPONSE_TO_INVITATION_TYPES.confirm
      ? confirmInvitation(reqBody)
      : denyInvitation(reqBody);
  };

  useEffect(() => {
    if (tenant) {
      modal.setOpen(tenant?.pending);
    }
  }, [modal, tenant, tenant?.pending]);

  return (
    <QueryDataLoader query={getUserByIdQuery} useCustomLoading>
      {({ data, isLoading }) => {
        const newTenant = data?.user.tenantAssignments.find(
          (item) => item.tenantId === tenant?.id,
        );
        const defaultValues: Partial<FormValues> = {
          tenant: newTenant?.name,
          roles: newTenant?.roleAssignments.map((item) => item.id) || [],
        };
        const loading = isLoading || denyInvitationState.loading;

        return (
          <FormModal
            alignActions="center"
            defaultValues={defaultValues}
            formId={INVITE_USER_TO_TENANT_ID}
            isLoading={loading}
            isOpen={modal.isOpen}
            isSubmitting={confirmInvitationState.loading}
            loader={
              <div className="grid place-content-center py-24 text-primary">
                <Spinner size="lg" />
              </div>
            }
            submitLabel={t('common.confirm')}
            title={t('users.inviteUserToTenantTitle')}
            onClose={() => handleResponseToInvitation('deny')}
            onSubmit={() => handleResponseToInvitation('confirm')}
          >
            <div className="flex min-h-[280px] w-[420px] flex-col gap-4">
              <Text>{t('users.inviteUserToTenantSubtitle')}</Text>
              <Text className="mt-2 text-secondary-tint-40">
                {t('users.inviteUserToTenantCheck')}
              </Text>
              <InputField label={t('common.company')} name="tenant" disabled />
              <UserTenantRolesSelect
                isLoading={getUserByIdQuery.loading}
                name="roles"
                roles={newTenant?.roleAssignments || []}
                disabled
                isMultiple
              />
            </div>
          </FormModal>
        );
      }}
    </QueryDataLoader>
  );
};
