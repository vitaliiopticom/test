import { gql, MutationHookOptions, useMutation } from '@/api';
import { UploadFile } from '@/types/file';

import { UploadAttachment } from '../types';

export const UPLOAD_ATTACHMENT_MUTATION = gql`
  mutation UploadAttachments($input: UploadAttachmentsInput!) {
    uploadAttachments(uploadAttachments: $input) {
      id
      name
      uri
      thumbnailUri
      sizeInBytes
      contentType
    }
  }
`;

export type UploadAttachmentsMutationRequest = {
  input: {
    files: UploadAttachment[];
    questionId: string;
    questionnaireId: string;
  };
};

export type UploadAttachmentsMutationResponse = {
  uploadAttachments: UploadFile[];
};

export const useUploadAttachmentsMutation = (
  options?: MutationHookOptions<
    UploadAttachmentsMutationResponse,
    UploadAttachmentsMutationRequest
  >,
) => {
  return useMutation<
    UploadAttachmentsMutationResponse,
    UploadAttachmentsMutationRequest
  >(UPLOAD_ATTACHMENT_MUTATION, options);
};
