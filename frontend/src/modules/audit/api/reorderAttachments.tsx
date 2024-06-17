import { gql, MutationHookOptions, useMutation } from '@/api';

import { ReorderAttachment } from '../types';

export const REORDER_ATTACHMENTS_MUTATION = gql`
  mutation ReorderAttachments($input: ReorderAttachmentsInput!) {
    reorderAttachments(reorderAttachmentsInput: $input)
  }
`;

export type ReorderAttachmentsMutationRequest = {
  input: {
    attachments: ReorderAttachment[];
    questionId: string;
    questionnaireId: string;
  };
};

export type ReorderAttachmentsMutationResponse = {
  reorderAttachments: string;
};

export const useReorderAttachmentsMutation = (
  options?: MutationHookOptions<
    ReorderAttachmentsMutationResponse,
    ReorderAttachmentsMutationRequest
  >,
) => {
  return useMutation<
    ReorderAttachmentsMutationResponse,
    ReorderAttachmentsMutationRequest
  >(REORDER_ATTACHMENTS_MUTATION, options);
};
