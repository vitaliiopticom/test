import { gql, MutationHookOptions, useApolloClient, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { VehicleDetails } from '../types';

import { VEHICLE_QUERY } from './getVehicleDetail';

export const DELETE_VEHICLE_VIDEO_MUTATION = gql`
  mutation DeleteVehicleVideo($input: [UUID!]!) {
    deleteVehicleVideo(vehicleVideoIds: $input)
  }
`;

export type DeleteVehicleVideoMutationRequest = {
  input: string[];
};

export type DeleteVehicleVideoMutationResponse = VehicleDetails;

export const useDeleteVehicleVideoMutation = (
  options?: MutationHookOptions<
    DeleteVehicleVideoMutationResponse,
    DeleteVehicleVideoMutationRequest
  >,
) => {
  const client = useApolloClient();
  const { t } = useTranslation();

  return useMutation<
    DeleteVehicleVideoMutationResponse,
    DeleteVehicleVideoMutationRequest
  >(DELETE_VEHICLE_VIDEO_MUTATION, {
    ...options,
    onCompleted: (data, clientOptions) => {
      client.refetchQueries({ include: [VEHICLE_QUERY] });
      toast.success<string>(
        t('notifications.successDelete', { name: t('content.video') }),
      );
      options?.onCompleted?.(data, clientOptions);
    },
  });
};
