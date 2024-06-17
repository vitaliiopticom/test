import { gql, QueryHookOptions, useQuery } from '@/api';

import type { Commercial } from '../types';

export const COMMERCIALS_QUERY = gql`
  query GetCommercials {
    commercials {
      id
      name
      lastName
    }
  }
`;

export type GetCommercialsQueryRequest = {};

export type GetCommercialsQueryResponse = {
  commercials: Commercial[];
};

export const useGetCommercialsQuery = (
  options?: QueryHookOptions<
    GetCommercialsQueryResponse,
    GetCommercialsQueryRequest
  >,
) => {
  return useQuery<GetCommercialsQueryResponse, GetCommercialsQueryRequest>(
    COMMERCIALS_QUERY,
    options,
  );
};
