import { gql, MutationHookOptions, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

import {
  VEHICLES_FILTER_DEFAULT,
  VEHICLES_PAGINATION_DEFAULT,
} from '../constants';

import { VEHICLES_QUERY } from './getVehicles';

export const DELETE_VEHICLE_MUTATION = gql`
  mutation DeleteVehicle($input: UUID!) {
    deleteVehicle(vehicleId: $input)
  }
`;

export type DeleteVehicleMutationRequest = {
  input: string;
};

export type DeleteVehicleMutationResponse = unknown;

export const useDeleteVehicleMutation = (
  options?: MutationHookOptions<
    DeleteVehicleMutationResponse,
    DeleteVehicleMutationRequest
  >,
) => {
  const { t } = useTranslation();

  return useMutation<
    DeleteVehicleMutationResponse,
    DeleteVehicleMutationRequest
  >(DELETE_VEHICLE_MUTATION, {
    ...options,
    onCompleted: (data, clientOptions) => {
      toast.success<string>(
        t('notifications.successDelete', { name: t('common.vehicle') }),
      );
      options?.onCompleted?.(data, clientOptions);
    },
    refetchQueries: [
      {
        query: VEHICLES_QUERY,
        variables: {
          inputParameters: {
            pagingParameters: VEHICLES_PAGINATION_DEFAULT,
            filterParameters: VEHICLES_FILTER_DEFAULT,
          },
        },
      },
    ],
  });
};
