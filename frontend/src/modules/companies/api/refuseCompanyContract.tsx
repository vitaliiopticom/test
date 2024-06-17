import { gql, MutationHookOptions, useApolloClient, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { COMPANIES_QUERY } from './getCompanies';

export const REFUSE_COMPANY_CONTRACT_MUTATION = gql`
  mutation RefuseContract($contract: ContractInput!) {
    refuseContract(contract: $contract) {
      id
    }
  }
`;

export type RefuseCompanyContractMutationRequest = {
  contract: { id: number };
};

export type RefuseCompanyContractMutationResponse = unknown;

export const useRefuseCompanyContractMutation = (
  options?: MutationHookOptions<
    RefuseCompanyContractMutationResponse,
    RefuseCompanyContractMutationRequest
  >,
) => {
  const client = useApolloClient();
  const { t } = useTranslation();

  return useMutation<
    RefuseCompanyContractMutationResponse,
    RefuseCompanyContractMutationRequest
  >(REFUSE_COMPANY_CONTRACT_MUTATION, {
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
