import { gql, MutationHookOptions, useMutation } from '@/api';

export const CREATE_CONTRACT_MUTATION = gql`
  mutation CreateContract($input: Long!) {
    createContract(companyId: $input) {
      id
    }
  }
`;

export type CreateContractMutationRequest = { input: number };

export type CreateCompanyMutationResponse = {
  createContract: {
    id: number;
  };
};

export const useCreateContractMutation = (
  options?: MutationHookOptions<
    CreateCompanyMutationResponse,
    CreateContractMutationRequest
  >,
) => {
  return useMutation<
    CreateCompanyMutationResponse,
    CreateContractMutationRequest
  >(CREATE_CONTRACT_MUTATION, options);
};
