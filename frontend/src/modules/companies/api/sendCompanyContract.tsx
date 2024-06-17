import { gql, MutationHookOptions, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

export const SEND_COMPANY_CONTRACT_MUTATION = gql`
  mutation SendContract($contract: ContractInput!) {
    sendContract(contract: $contract) {
      id
    }
  }
`;

export type SendCompanyContractMutationRequest = {
  contract: { id: number };
};

export type SendCompanyContractMutationResponse = unknown;

export const useSendCompanyContractMutation = (
  options?: MutationHookOptions<
    SendCompanyContractMutationResponse,
    SendCompanyContractMutationRequest
  >,
) => {
  const { t } = useTranslation();

  return useMutation<
    SendCompanyContractMutationResponse,
    SendCompanyContractMutationRequest
  >(SEND_COMPANY_CONTRACT_MUTATION, {
    ...options,
    onCompleted: (data, clientOptions) => {
      toast.success<string>(
        t('notifications.successUpdate', { name: t('common.contract') }),
      );
      options?.onCompleted?.(data, clientOptions);
    },
  });
};
