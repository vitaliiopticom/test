import { gql, MutationHookOptions, useApolloClient, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { VEHICLE_QUERY } from './getVehicleDetail';

export const REPLACE_VEHICLE_PHOTO_MUTATION = gql`
  mutation ReplaceVehiclePhoto($input: replaceVehiclePhotoInput!) {
    replaceVehiclePhoto(replaceVehiclePhoto: $input)
  }
`;

export type ReplaceVehiclePhotoMutationRequest = {
  input: {
    photo: File;
    vehicleId: string;
  };
};

export type ReplaceVehiclePhotoMutationResponse = unknown;

export const useReplaceVehiclePhotoMutation = (
  options?: MutationHookOptions<
    ReplaceVehiclePhotoMutationResponse,
    ReplaceVehiclePhotoMutationRequest
  >,
) => {
  const client = useApolloClient();
  const { t } = useTranslation();

  return useMutation<
    ReplaceVehiclePhotoMutationResponse,
    ReplaceVehiclePhotoMutationRequest
  >(REPLACE_VEHICLE_PHOTO_MUTATION, {
    ...options,
    onCompleted: (data, clientOptions) => {
      client.refetchQueries({ include: [VEHICLE_QUERY] });
      toast.info<string>(
        t('notifications.infoReplace', { name: t('content.photo') }),
      );
      options?.onCompleted?.(data, clientOptions);
    },
  });
};
