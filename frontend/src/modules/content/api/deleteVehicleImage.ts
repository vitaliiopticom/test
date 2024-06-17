import { gql, MutationHookOptions, useApolloClient, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { VehicleDetails } from '../types';

import { VEHICLE_QUERY } from './getVehicleDetail';

export const DELETE_VEHICLE_IMAGE_MUTATION = gql`
  mutation DeleteVehicleImage($input: [UUID!]!) {
    deleteVehicleImage(vehicleImageIds: $input)
  }
`;

export type DeleteVehicleImageMutationRequest = {
  input: string[];
};

export type DeleteVehicleImageMutationResponse = VehicleDetails;

export const useDeleteVehicleImageMutation = (
  options?: MutationHookOptions<
    DeleteVehicleImageMutationResponse,
    DeleteVehicleImageMutationRequest
  >,
) => {
  const client = useApolloClient();
  const { t } = useTranslation();

  return useMutation<
    DeleteVehicleImageMutationResponse,
    DeleteVehicleImageMutationRequest
  >(DELETE_VEHICLE_IMAGE_MUTATION, {
    ...options,
    onCompleted: (data, clientOptions) => {
      client.refetchQueries({ include: [VEHICLE_QUERY] });
      toast.success<string>(
        t('notifications.successDelete', { name: t('content.photos') }),
      );
      options?.onCompleted?.(data, clientOptions);
    },
  });
};
