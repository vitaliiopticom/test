import { gql, MutationHookOptions, useMutation } from '@/api';

export const DELETE_ATTACHMENT_MUTATION = gql`
  mutation DeleteAttachment($input: DeleteAttachmentsInput!) {
    deleteAttachment(deleteAttachment: $input)
  }
`;

export type DeleteAttachmentMutationRequest = {
  input: {
    questionId: string;
    questionnaireId: string;
    uri: string;
    attachmentId: string;
  };
};

export type DeleteAttachmentMutationResponse = {
  deleteAttachment: string;
};

export const useDeleteAttachmentMutation = (
  options?: MutationHookOptions<
    DeleteAttachmentMutationResponse,
    DeleteAttachmentMutationRequest
  >,
) => {
  return useMutation<
    DeleteAttachmentMutationResponse,
    DeleteAttachmentMutationRequest
  >(DELETE_ATTACHMENT_MUTATION, options);
};
