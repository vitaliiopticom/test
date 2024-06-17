import { gql, QueryHookOptions, useQuery } from '@/api';
import { Pageable, Paging } from '@/types/pagination';

import { Company, CompanyListFilters } from '../types';

export const COMPANIES_QUERY = gql`
  query GetCompanies(
    $filters: CompanyFilterParametersInput!
    $paging: PagingParametersInput!
  ) {
    companies(pagingParameters: $paging, filterParameters: $filters) {
      items {
        id
        country {
          id
          name
        }
        companyName
        parentEntity {
          name
        }
        companyNickname
        companyOwner {
          id
          name
          lastName
        }
        teamStatus {
          id
          name
        }
        contactFirstName
        contactLastName
        contactPhoneNumber
        contactEmail
        onboardingStatus
        photoBoxStatus
        contractState(module: OPTI_PIX) {
          id
          state
        }
        optiPix {
          id
          name
        }
        optiAds {
          id
          name
        }
        optiLeads {
          id
          name
        }
        foundingDate
        lastUpdate
      }
      count
    }
  }
`;

export type GetCompaniesQueryRequest = {
  filters: CompanyListFilters;
  paging: Paging;
};

export type GetCompaniesQueryResponse = {
  companies: Pageable<Company>;
};

export const useGetCompaniesQuery = (
  options?: QueryHookOptions<
    GetCompaniesQueryResponse,
    GetCompaniesQueryRequest
  >,
) => {
  return useQuery<GetCompaniesQueryResponse, GetCompaniesQueryRequest>(
    COMPANIES_QUERY,
    { ...options, notifyOnNetworkStatusChange: true },
  );
};
