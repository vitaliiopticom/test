import { gql, QueryHookOptions, useQuery } from '@/api';
import { Pageable, Paging } from '@/types/pagination';

import type { CompaniesByDealerFilters, Company } from '../types';

export const COMPANIES_BY_DEALER_QUERY = gql`
  query GetCompaniesByDealer(
    $filters: CompanyFilterParametersInput!
    $paging: PagingParametersInput!
  ) {
    companies(pagingParameters: $paging, filterParameters: $filters) {
      count
      items {
        id
        companyName
      }
    }
  }
`;

export type GetCompaniesByDealerQueryRequest = {
  filters: CompaniesByDealerFilters;
  paging: Paging;
};

export type GetCompaniesByDealerQueryResponse = {
  companies: Pageable<Company>;
};

export const useGetCompaniesByDealerQuery = (
  options?: QueryHookOptions<
    GetCompaniesByDealerQueryResponse,
    GetCompaniesByDealerQueryRequest
  >,
) => {
  return useQuery<
    GetCompaniesByDealerQueryResponse,
    GetCompaniesByDealerQueryRequest
  >(COMPANIES_BY_DEALER_QUERY, {
    ...options,
    fetchPolicy: 'cache-and-network',
  });
};
