import { gql, QueryHookOptions, useQuery } from '@/api';

import {
  CardsStatistics,
  Photographer,
  StatisticsDateFiltersForApi,
} from '../types';

export const VEHICLE_FULL_STATISTICS_QUERY = gql`
  query GetVehicleStatistics(
    $inputParameters: VehicleStatisticsFilterParametersInput!
  ) {
    vehicleStatistics(inputParameters: $inputParameters) {
      activeVehiclesCount
      deletedVehiclesCount
      totalVehiclesCount
      vehiclesImagesCount
    }
    photographersVehicleStatistics(inputParameters: $inputParameters) {
      userId
      userFirstName
      userLastName
      userEmail
      vehiclesActiveCount
      vehiclesDeletedCount
      vehiclesImagesCount
      totalVehiclesCount
    }
  }
`;

export type GetVehicleFullStatisticsQueryRequest = {
  inputParameters: StatisticsDateFiltersForApi;
};

export type GetVehicleFullStatisticsQueryResponse = {
  vehicleStatistics: CardsStatistics;
  photographersVehicleStatistics: Photographer[];
};

export const useGetVehicleFullStatisticsQuery = (
  options?: QueryHookOptions<
    GetVehicleFullStatisticsQueryResponse,
    GetVehicleFullStatisticsQueryRequest
  >,
) => {
  return useQuery<
    GetVehicleFullStatisticsQueryResponse,
    GetVehicleFullStatisticsQueryRequest
  >(VEHICLE_FULL_STATISTICS_QUERY, {
    ...options,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
  });
};
