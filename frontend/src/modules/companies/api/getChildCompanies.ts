import { gql, QueryHookOptions, useQuery } from '@/api';
import { Pageable } from '@/types/pagination';

import { Dealership } from '../types';

export const CHILD_COMPANIES_QUERY = gql`
  query GetChildCompanies {
    childCompanies {
      items {
        companyName
        tenantId
      }
      count
    }
  }
`;

type Response = {
  childCompanies: Pageable<Dealership>;
};

type Request = {};

export const useChildCompaniesQuery = (
  options?: QueryHookOptions<Response, Request>,
) => {
  return useQuery<Response, Request>(CHILD_COMPANIES_QUERY, options);
};
