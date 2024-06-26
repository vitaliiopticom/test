import { gql, MutationHookOptions, useMutation } from '@/api';

export const DELETE_LEAD_MUTATION = gql`
  mutation DeleteLead($id: UUID!) {
    deleteLead(leadId: $id) {
      id
    }
  }
`;

export type DeleteLeadMutationRequest = {
  input: {
    leadId: string;
  };
};

export type DeleteLeadMutationResponse = {
  id: string;
};

export const useDeleteLeadMutation = (
  options?: MutationHookOptions<
    DeleteLeadMutationResponse,
    DeleteLeadMutationRequest
  >,
) => {
  return useMutation<
    DeleteLeadMutationResponse,
    DeleteLeadMutationRequest
  >(DELETE_LEAD_MUTATION, options);
};
