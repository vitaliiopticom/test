import { gql, MutationHookOptions, useApolloClient, useMutation } from '@/api';

import { USER_QUERY } from './getUserById';

export const UPLOAD_USER_PHOTO_MUTATION = gql`
  mutation UploadUserPhoto($input: UploadUserPhotoInput!) {
    uploadUserPhoto(uploadUserPhoto: $input)
  }
`;

export type UploadUserPhotoMutationRequest = {
  input: {
    photo: File;
    userId: string;
  };
};

export type UploadUserPhotoMutationResponse = unknown;

export const useUploadUserPhotoMutation = (
  options?: MutationHookOptions<
    UploadUserPhotoMutationResponse,
    UploadUserPhotoMutationRequest
  >,
) => {
  const client = useApolloClient();

  return useMutation<
    UploadUserPhotoMutationResponse,
    UploadUserPhotoMutationRequest
  >(UPLOAD_USER_PHOTO_MUTATION, {
    ...options,
    onCompleted: (data, clientOptions) => {
      client.refetchQueries({ include: [USER_QUERY] });
      options?.onCompleted?.(data, clientOptions);
    },
  });
};
