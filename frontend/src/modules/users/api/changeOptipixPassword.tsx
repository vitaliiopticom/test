import { gql, MutationHookOptions, useApolloClient, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { PROFILE_QUERY } from './getProfile';

export const CHANGE_OPTIPIX_PASSWORD_MUTATION = gql`
  mutation ChangeOptipixPassword($input: ChangeOptipixPasswordInput!) {
    changeOptipixPassword(changeOptipixPassword: $input)
  }
`;

export type ChangeOptipixPasswordMutationRequest = {
  input: {
    optipixPassword: string;
  };
};

export type ChangeOptipixPasswordMutationResponse = boolean;

export const useChangeOptipixPasswordMutation = (
  options?: MutationHookOptions<
    ChangeOptipixPasswordMutationResponse,
    ChangeOptipixPasswordMutationRequest
  >,
) => {
  const client = useApolloClient();
  const { t } = useTranslation();

  return useMutation<
    ChangeOptipixPasswordMutationResponse,
    ChangeOptipixPasswordMutationRequest
  >(CHANGE_OPTIPIX_PASSWORD_MUTATION, {
    ...options,
    onCompleted: (data, clientOptions) => {
      client.refetchQueries({ include: [PROFILE_QUERY] });
      toast.success<string>(t('users.optipixPassword.confirm'));
      options?.onCompleted?.(data, clientOptions);
    },
  });
};
