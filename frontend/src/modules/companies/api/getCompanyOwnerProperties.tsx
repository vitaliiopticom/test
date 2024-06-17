import { gql, QueryHookOptions, useQuery } from '@/api';

import { CompanyOwnersProperty } from '../types';

export const COMPANY_OWNERS_PROPERTIES_QUERY = gql`
  query GetCompanyOwnersProperties {
    companyOwners {
      items {
        id
        name
        lastName
      }
      count
    }
  }
`;

export type GetCompanyOwnersPropertiesQueryResponse = {
  companyOwners: {
    items: CompanyOwnersProperty[];
    count: number;
  };
};

export const useGetCompanyOwnersPropertiesQuery = (
  options?: QueryHookOptions<GetCompanyOwnersPropertiesQueryResponse>,
) => {
  return useQuery<GetCompanyOwnersPropertiesQueryResponse>(
    COMPANY_OWNERS_PROPERTIES_QUERY,
    options,
  );
};
