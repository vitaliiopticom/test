import { gql, QueryHookOptions, useQuery } from '@/api';

import { VehicleDetails } from '../types/vehicleTypes';

export const GET_VEHICLE_QUERY = gql`
  query getVehicleById($id: String!) {
    vehicleById(id: $id) {
      id
        name
        model
        make
        fullName
        country
        created
        published
        stock
        structure
        imageCount
        fuel
        companyName
        constructionYear
        price {
            offerPrice
            purchasingPrice
            grossPrice
            netPrice
        }
        unitDetails {
            kilometers
            vIN
            exteriorColor
            colorName
            available
            availableFromDate
            localization
            referenceForAd
        }
        extraFieldsPlatform {
            mainImage {
                order
                path
                isLastPhoto
                isDeleted
            }
        }
        firstImageDAT {
            order
            path
            isLastPhoto
            isDeleted
        }
    }
  }
`;


export type GetVehicleByIdQueryRequest = {
  id: string
};

export type GetVehicleByIdQueryResponse = {
    vehiclesByFilter: VehicleDetails[];
};



export const useGetVehicleByIdQuery = (
  options?: QueryHookOptions<GetVehicleByIdQueryResponse, GetVehicleByIdQueryRequest>,
) => {
  return useQuery<GetVehicleByIdQueryResponse, GetVehicleByIdQueryRequest>(
    GET_VEHICLE_QUERY,
    { fetchPolicy: 'no-cache', ...options },
  );
};
