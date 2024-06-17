import { gql, MutationHookOptions, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { User } from '../types';

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(updateUser: $input) {
      id
    }
  }
`;

export type UpdateUserMutationRequest = {
  input: Omit<User, 'photoUrl'>;
};

export type UpdateUserMutationResponse = User;

export const useUpdateUserMutation = (
  options?: MutationHookOptions<
    UpdateUserMutationResponse,
    UpdateUserMutationRequest
  >,
) => {
  const { t } = useTranslation();

  return useMutation<UpdateUserMutationResponse, UpdateUserMutationRequest>(
    UPDATE_USER_MUTATION,
    {
      ...options,
      onCompleted: (data, clientOptions) => {
        toast.success<string>(
          t('notifications.successUpdate', { name: t('common.user') }),
        );
        options?.onCompleted?.(data, clientOptions);
      },
    },
  );
};
