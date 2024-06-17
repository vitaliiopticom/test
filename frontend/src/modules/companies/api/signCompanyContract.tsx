import { gql, MutationHookOptions, useApolloClient, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { COMPANIES_QUERY } from './getCompanies';

export const SIGN_COMPANY_CONTRACT_MUTATION = gql`
  mutation SignContract($contract: ContractInput!) {
    signContract(contract: $contract) {
      id
    }
  }
`;

export type SignCompanyContractMutationRequest = {
  contract: { id: number };
};

export type SignCompanyContractMutationResponse = unknown;

export const useSignCompanyContractMutation = (
  options?: MutationHookOptions<
    SignCompanyContractMutationResponse,
    SignCompanyContractMutationRequest
  >,
) => {
  const client = useApolloClient();
  const { t } = useTranslation();

  return useMutation<
    SignCompanyContractMutationResponse,
    SignCompanyContractMutationRequest
  >(SIGN_COMPANY_CONTRACT_MUTATION, {
    ...options,
    onCompleted: (data, clientOptions) => {
      client.refetchQueries({ include: [COMPANIES_QUERY] });
      toast.success<string>(
        t('notifications.successUpdate', { name: t('common.contract') }),
      );
      options?.onCompleted?.(data, clientOptions);
    },
  });
};
