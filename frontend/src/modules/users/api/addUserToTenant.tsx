import { gql, MutationHookOptions, useApolloClient, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { TenantAssignmentsInput, User } from '../types';

import { USERS_QUERY } from './getUsers';

export const ADD_USER_TO_TENANT_MUTATION = gql`
  mutation addUserToTenant(
    $userId: UUID!
    $tenantAssignment: TenantAssignmentInput!
  ) {
    addUserToTenant(userId: $userId, tenantAssignment: $tenantAssignment) {
      id
    }
  }
`;

export type AddUserToTenantMutationRequest = {
  userId: string;
  tenantAssignment: TenantAssignmentsInput;
};

export type AddUserToTenantMutationResponse = User;

export const useAddUserToTenantMutation = (
  options?: MutationHookOptions<
    AddUserToTenantMutationResponse,
    AddUserToTenantMutationRequest
  >,
) => {
  const client = useApolloClient();
  const { t } = useTranslation();

  return useMutation<
    AddUserToTenantMutationResponse,
    AddUserToTenantMutationRequest
  >(ADD_USER_TO_TENANT_MUTATION, {
    ...options,
    onCompleted: (data, clientOptions) => {
      client.refetchQueries({ include: [USERS_QUERY] });
      toast.success<string>(t('notifications.successAddUserToTenant'));
      options?.onCompleted?.(data, clientOptions);
    },
  });
};
