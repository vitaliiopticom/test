import { gql, MutationHookOptions, useApolloClient, useMutation } from '@/api';
import { PROFILE_QUERY } from '@/modules/users';

type DenyPendingInTenantRequest = {
  tenantId: string;
};

export const DENY_TENANT_INVITATION_MUTATION = gql`
  mutation denyPendingInTenant($tenantId: UUID!) {
    denyPendingInTenant(tenantId: $tenantId)
  }
`;

export const useDenyTenantInvitationMutation = (
  options?: MutationHookOptions<unknown, DenyPendingInTenantRequest>,
) => {
  const client = useApolloClient();

  return useMutation<unknown, DenyPendingInTenantRequest>(
    DENY_TENANT_INVITATION_MUTATION,
    {
      ...options,
      onCompleted: (data, clientOptions) => {
        client.refetchQueries({ include: [PROFILE_QUERY] });
        options?.onCompleted?.(data, clientOptions);
      },
    },
  );
};
