import { gql, MutationHookOptions, useApolloClient, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { NAMESPACES, useTranslation } from '@/i18n';
import { COMPANIES_QUERY } from '@/modules/companies';
import { PROFILE_QUERY, ValidationUser } from '@/modules/users';

export const CREATE_CONTRACT_MUTATION = gql`
  mutation CompleteOnboarding($input: [InvitedUserInput]!) {
    completeOnboarding(invitedUsers: $input)
  }
`;

export type CompleteOnboardingMutationRequest = { input: ValidationUser[] };

export type CompleteOnboardingMutationResponse = {};

export const useCompleteOnboardingMutation = (
  options?: MutationHookOptions<
    CompleteOnboardingMutationResponse,
    CompleteOnboardingMutationRequest
  >,
) => {
  const client = useApolloClient();
  const { t } = useTranslation(NAMESPACES.Onboarding);

  return useMutation<
    CompleteOnboardingMutationResponse,
    CompleteOnboardingMutationRequest
  >(CREATE_CONTRACT_MUTATION, {
    ...options,
    onCompleted: (data, clientOptions) => {
      client.refetchQueries({ include: [COMPANIES_QUERY, PROFILE_QUERY] });
      toast.success<string>(t('notifications.onboardingCompleted'));

      options?.onCompleted?.(data, clientOptions);
    },
  });
};
