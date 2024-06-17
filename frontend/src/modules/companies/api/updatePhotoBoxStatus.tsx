import { gql, MutationHookOptions, useApolloClient, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

import type { PhotoBoxStatus } from '../types';

import { COMPANIES_QUERY } from './getCompanies';

export const UPDATE_PHOTOBOX_STATUS_MUTATION = gql`
  mutation UpdatePhotoBoxStatus($input: UpdatePhotoBoxInput!) {
    updatePhotoBoxStatus(updatePhotoBox: $input)
  }
`;

export type UpdatePhotoBoxStatusMutationRequest = {
  input: { id: number; status: PhotoBoxStatus };
};

export type UpdatePhotoBoxStatusMutationResponse = unknown;

export const useUpdatePhotoBoxStatusMutation = (
  options?: MutationHookOptions<
    UpdatePhotoBoxStatusMutationResponse,
    UpdatePhotoBoxStatusMutationRequest
  >,
) => {
  const client = useApolloClient();
  const { t } = useTranslation();

  return useMutation<
    UpdatePhotoBoxStatusMutationResponse,
    UpdatePhotoBoxStatusMutationRequest
  >(UPDATE_PHOTOBOX_STATUS_MUTATION, {
    ...options,
    onCompleted: (data, clientOptions) => {
      client.refetchQueries({ include: [COMPANIES_QUERY] });
      toast.success<string>(
        t('notifications.successUpdate', { name: t('common.photoBox') }),
      );
      options?.onCompleted?.(data, clientOptions);
    },
  });
};
