import { gql, QueryHookOptions, useQuery } from '@/api';

import { CardsStatistics, StatisticsDateFiltersForApi } from '../types';

export const VEHICLE_BASIC_STATISTICS_QUERY = gql`
  query GetVehicleStatistics(
    $inputParameters: VehicleStatisticsFilterParametersInput!
  ) {
    vehicleStatistics(inputParameters: $inputParameters) {
      activeVehiclesCount
      deletedVehiclesCount
      totalVehiclesCount
      vehiclesImagesCount
    }
  }
`;

export type GetVehicleBasicStatisticsQueryRequest = {
  inputParameters: StatisticsDateFiltersForApi;
};

export type GetVehicleBasicStatisticsQueryResponse = {
  vehicleStatistics: CardsStatistics;
};

export const useGetVehicleBasicStatisticsQuery = (
  options?: QueryHookOptions<
    GetVehicleBasicStatisticsQueryResponse,
    GetVehicleBasicStatisticsQueryRequest
  >,
) => {
  return useQuery<
    GetVehicleBasicStatisticsQueryResponse,
    GetVehicleBasicStatisticsQueryRequest
  >(VEHICLE_BASIC_STATISTICS_QUERY, {
    ...options,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
  });
};
