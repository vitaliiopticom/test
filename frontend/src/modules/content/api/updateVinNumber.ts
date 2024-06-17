import { gql, MutationHookOptions, useApolloClient, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { VehicleDetails } from '../types';

import { VEHICLE_QUERY } from './getVehicleDetail';

// TODO: Implement when BE part is ready
export const UPDATE_VIN_NUMBER_MUTATION = gql`
  mutation UpdateVinNumber {
    vin
  }
`;

export type UpdateVinNumberMutationRequest = {
  input: { id: string; vin?: string };
};

export type UpdateVinNumberMutationResponse = VehicleDetails;

export const useUpdateVinNumberMutation = (
  options?: MutationHookOptions<
    UpdateVinNumberMutationResponse,
    UpdateVinNumberMutationRequest
  >,
) => {
  const client = useApolloClient();
  const { t } = useTranslation();

  return useMutation<
    UpdateVinNumberMutationResponse,
    UpdateVinNumberMutationRequest
  >(UPDATE_VIN_NUMBER_MUTATION, {
    ...options,
    onCompleted: (data, clientOptions) => {
      client.refetchQueries({ include: [VEHICLE_QUERY] });
      toast.success<string>(
        t('notifications.successUpdate', { name: t('common.vehicle') }),
      );
      options?.onCompleted?.(data, clientOptions);
    },
  });
};
