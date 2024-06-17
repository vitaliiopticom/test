import { gql, MutationHookOptions, useApolloClient, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { User } from '../types';

import { USERS_QUERY } from './getUsers';

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(createUser: $input) {
      id
    }
  }
`;

export type CreateUserMutationRequest = {
  input: Omit<User, 'id' | 'photoUrl'>;
};

export type CreateUserMutationResponse = User;

export const useCreateUserMutation = (
  options?: MutationHookOptions<
    CreateUserMutationResponse,
    CreateUserMutationRequest
  >,
) => {
  const client = useApolloClient();
  const { t } = useTranslation();

  return useMutation<CreateUserMutationResponse, CreateUserMutationRequest>(
    CREATE_USER_MUTATION,
    {
      ...options,
      onCompleted: (data, clientOptions) => {
        client.refetchQueries({ include: [USERS_QUERY] });
        toast.success<string>(
          t('notifications.successCreate', { name: t('common.user') }),
        );
        options?.onCompleted?.(data, clientOptions);
      },
    },
  );
};
