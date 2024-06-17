import { gql, MutationHookOptions, useApolloClient, useMutation } from '@/api';

import { USER_QUERY } from './getUserById';

export const DETACH_USER_FROM_TENANT_MUTATION = gql`
  mutation DetachUserFromTenant($input: DetachUserFromTenantInput!) {
    detachUserFromTenant(detachUserFromTenant: $input)
  }
`;

export type DetachUserFromTenantMutationRequest = {
  input: {
    id: string;
    tenantId: string;
  };
};

export type DetachUserFromTenantMutationResponse = unknown;

export const useDetachUserFromTenantMutation = (
  options?: MutationHookOptions<
    DetachUserFromTenantMutationResponse,
    DetachUserFromTenantMutationRequest
  >,
) => {
  const client = useApolloClient();

  return useMutation<
    DetachUserFromTenantMutationResponse,
    DetachUserFromTenantMutationRequest
  >(DETACH_USER_FROM_TENANT_MUTATION, {
    ...options,
    onCompleted: (data, clientOptions) => {
      client.refetchQueries({ include: [USER_QUERY] });
      options?.onCompleted?.(data, clientOptions);
    },
  });
};
