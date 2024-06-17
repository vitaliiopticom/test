import { gql, QueryHookOptions, useQuery } from '@/api';

import { CompanyProperty, CompanyPropertyCode } from '../types';

export const COMPANY_PROPERTIES_QUERY = gql`
  query GetCompanyProperties($propertyCode: String!) {
    companyProperties(propertyCode: $propertyCode) {
      items {
        id
        name
        localizationKey
      }
      count
    }
  }
`;

export type GetCompanyPropertiesQueryRequest = {
  propertyCode: CompanyPropertyCode;
};

export type GetCompanyPropertiesQueryResponse = {
  companyProperties: {
    items: CompanyProperty[];
    count: number;
  };
};

export const useGetCompanyPropertiesQuery = (
  options?: QueryHookOptions<
    GetCompanyPropertiesQueryResponse,
    GetCompanyPropertiesQueryRequest
  >,
) => {
  return useQuery<
    GetCompanyPropertiesQueryResponse,
    GetCompanyPropertiesQueryRequest
  >(COMPANY_PROPERTIES_QUERY, options);
};
