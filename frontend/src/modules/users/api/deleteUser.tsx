import { gql, MutationHookOptions, useApolloClient, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { USERS_QUERY } from './getUsers';

export const DELETE_USER_MUTATION = gql`
  mutation deleteUser($input: DeleteUserInput!) {
    deleteUser(deleteUser: $input)
  }
`;

export type DeleteUserMutationRequest = {
  input: {
    id: string;
  };
};

export type DeleteUserMutationResponse = string;

export const useDeleteUserMutation = (
  options?: MutationHookOptions<
    DeleteUserMutationResponse,
    DeleteUserMutationRequest
  >,
) => {
  const client = useApolloClient();
  const { t } = useTranslation();

  return useMutation<DeleteUserMutationResponse, DeleteUserMutationRequest>(
    DELETE_USER_MUTATION,
    {
      ...options,
      onCompleted: (data, clientOptions) => {
        client.refetchQueries({ include: [USERS_QUERY] });
        toast.success<string>(
          t('notifications.successDelete', { name: t('common.user') }),
        );
        options?.onCompleted?.(data, clientOptions);
      },
    },
  );
};
