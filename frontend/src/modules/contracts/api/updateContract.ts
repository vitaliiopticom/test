import { gql, MutationHookOptions, useMutation } from '@/api';

import { UpdateContractSubmitValues } from '../types';

export const UPDATE_CONTRACT_MUTATION = gql`
  mutation UpdateContract($updateContract: UpdateContractInput!) {
    updateContract(updateContract: $updateContract) {
      id
    }
  }
`;

export type UpdateContractMutationRequest = {
  updateContract: UpdateContractSubmitValues;
};

export type UpdateCompanyMutationResponse = {
  updateContract: {
    id: number;
  };
};

export const useUpdateContractMutation = (
  options?: MutationHookOptions<
    UpdateCompanyMutationResponse,
    UpdateContractMutationRequest
  >,
) => {
  return useMutation<
    UpdateCompanyMutationResponse,
    UpdateContractMutationRequest
  >(UPDATE_CONTRACT_MUTATION, {
    ...options,
    onCompleted: (data, clientOptions) => {
      options?.onCompleted?.(data, clientOptions);
    },
  });
};
