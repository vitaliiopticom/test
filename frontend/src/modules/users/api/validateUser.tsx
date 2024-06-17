import { gql, MutationHookOptions, useMutation } from '@/api';

import { ValidationUser } from '../types';

export const VALIDATE_USER_MUTATION = gql`
  mutation ValidateUser($input: InvitedUserInput!) {
    validateOnboardingInvitedUser(invitedUser: $input)
  }
`;

export type ValidateUserMutationRequest = {
  input: ValidationUser;
};

export type ValidateUserMutationResponse = unknown;

export const useValidateUserMutation = (
  options?: MutationHookOptions<
    ValidateUserMutationResponse,
    ValidateUserMutationRequest
  >,
) => {
  return useMutation<ValidateUserMutationResponse, ValidateUserMutationRequest>(
    VALIDATE_USER_MUTATION,
    options,
  );
};
