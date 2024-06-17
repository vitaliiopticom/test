import { gql, MutationHookOptions, useMutation } from '@/api';

export const CHANGE_ONBOARDING_STATUS_MUTATION = gql`
  mutation ChangeOnboardingStatus {
    changeOnboardingStatus
  }
`;

export type ChangeOnboardingStatusMutationRequest = unknown;

export type ChangeOnboardingStatusMutationResponse = unknown;

export const useChangeOnboardingStatusMutation = (
  options?: MutationHookOptions<
    ChangeOnboardingStatusMutationResponse,
    ChangeOnboardingStatusMutationRequest
  >,
) => {
  return useMutation<
    ChangeOnboardingStatusMutationResponse,
    ChangeOnboardingStatusMutationRequest
  >(CHANGE_ONBOARDING_STATUS_MUTATION, options);
};
