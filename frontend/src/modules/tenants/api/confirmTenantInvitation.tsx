import { gql, MutationHookOptions, useApolloClient, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';
import { PROFILE_QUERY } from '@/modules/users';

type ConfirmPendingInTenantRequest = {
  tenantId: string;
};

export const CONFIRM_TENANT_INVITATION_MUTATION = gql`
  mutation confirmPendingInTenant($tenantId: UUID!) {
    confirmPendingInTenant(tenantId: $tenantId)
  }
`;

export const useConfirmTenantInvitationMutation = (
  options?: MutationHookOptions<unknown, ConfirmPendingInTenantRequest>,
) => {
  const { t } = useTranslation();
  const client = useApolloClient();

  return useMutation<unknown, ConfirmPendingInTenantRequest>(
    CONFIRM_TENANT_INVITATION_MUTATION,
    {
      ...options,
      onCompleted: (data, clientOptions) => {
        client.refetchQueries({ include: [PROFILE_QUERY] });
        toast.success<string>(t('notifications.successAddUserToTenant'));
        options?.onCompleted?.(data, clientOptions);
      },
    },
  );
};
