import { gql, QueryHookOptions, useQuery } from '@/api';
import { Pageable } from '@/types/pagination';

import { CompanyType, Dealer } from '../types';

export const DEALERS_QUERY = gql`
  query GetDealers(
    $filters: CompanyFilterParametersInput
    $paging: PagingParametersInput
  ) {
    companies(pagingParameters: $paging, filterParameters: $filters) {
      items {
        id
        companyName
      }
    }
  }
`;

export type GetDealersQueryRequest = {
  filters: {
    companyType: CompanyType;
  };
};

export type GetDealersQueryResponse = {
  companies: Pageable<Dealer>;
};

export const useGetDealersQuery = (
  options?: QueryHookOptions<GetDealersQueryResponse, GetDealersQueryRequest>,
) => {
  return useQuery<GetDealersQueryResponse, GetDealersQueryRequest>(
    DEALERS_QUERY,
    { ...options, fetchPolicy: 'no-cache' },
  );
};
