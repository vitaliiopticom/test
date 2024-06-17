import { gql, QueryHookOptions, useQuery } from '@/api';

import { Company } from '../types';

export const COMPANY_CHILD_PROFILES_QUERY = gql`
  query GetCompanyChildProfiles {
    companyChildProfiles {
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
      contractState(module: OPTI_PIX) {
        id
        state
      }
      onboardingStatus
      photoBoxStatus
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
  }
`;

export type GetCompanyChildProfilesQueryRequest = {};

export type GetCompanyChildProfilesQueryResponse = {
  companyChildProfiles: Company[];
};

export const useGetCompanyChildProfilesQuery = (
  options?: QueryHookOptions<
    GetCompanyChildProfilesQueryResponse,
    GetCompanyChildProfilesQueryRequest
  >,
) => {
  return useQuery<
    GetCompanyChildProfilesQueryResponse,
    GetCompanyChildProfilesQueryRequest
  >(COMPANY_CHILD_PROFILES_QUERY, {
    ...options,
    notifyOnNetworkStatusChange: true,
  });
};
