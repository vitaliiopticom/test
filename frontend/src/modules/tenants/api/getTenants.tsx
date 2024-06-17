import { gql, QueryHookOptions, useQuery } from '@/api';

import { Tenant } from '../types';

export const TENANTS_QUERY = gql`
  query GetTenants {
    tenants {
      id
      name
    }
  }
`;

export type GetTenantsQueryResponse = {
  tenants: Tenant[];
};

export const useGetTenantsQuery = (
  options?: QueryHookOptions<GetTenantsQueryResponse>,
) => {
  return useQuery<GetTenantsQueryResponse>(TENANTS_QUERY, {
    fetchPolicy: 'no-cache',
    ...options,
  });
};
