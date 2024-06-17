import { gql, QueryHookOptions, useQuery } from '@/api';

import { Company } from '../types';

import { GetCompanyQueryRequest } from './getCompany';

export const COMPANY_PROFILE_QUERY = gql`
  query GetCompanyProfile($id: Long!) {
    companyProfile(id: $id) {
      id
      parentEntity {
        name
      }
      companyName
      companyNickname
      legalFormId {
        id
        name
      }
      turnover
      foundingDate
      corporatePurpose
      internationalVATNumber
      companyRegistrationNumber
      streetName
      streetNumber
      additionalAddress
      postalCode
      city
      state
      country {
        id
        name
      }
      approvedSignatoryName
      approvedSignatoryLastName
      approvedSignatoryCourtesy {
        id
        name
      }
      approvedSignatoryJobFunction {
        id
        name
      }
      approvedSignatoryJobTitle {
        id
        name
      }
      teamStatus {
        id
        name
      }
      aeroAutofactoria {
        id
        name
      }
      tyrefactoria {
        id
        name
      }
      innovafleet {
        id
        name
      }
      audit {
        id
        name
      }
      optiPix {
        id
        name
      }
      qualiphone {
        id
        name
      }
      optiAds {
        id
        name
      }
      optiConfig {
        id
        name
      }
      optiValue {
        id
        name
      }
      optiContent {
        id
        name
      }
      optiLeads {
        id
        name
      }
      customerRecoveryBundle {
        id
        name
      }
      whiteLabelWeb {
        id
        name
      }
      companyOwner {
        id
        name
        lastName
      }
      assistantOwner {
        id
        name
        lastName
      }
      clientITSystems {
        id
        name
      }
      nameClientITSystem
      googleRating
      websiteURL
      googleMyBusinessLink
      linkedInCompanyPage
      contactCourtesy {
        id
        name
      }
      contactId
      contactFirstName
      contactLastName
      contactJobTitle
      contactFunction {
        id
        name
      }
      contactEmail
      contactPhoneNumber
      contactMobilePhoneNumber
      contactDefaultLanguage {
        id
        name
      }
    }
  }
`;

export type GetCompanyProfileQueryRequest = GetCompanyQueryRequest;

export type GetCompanyProfileQueryResponse = { companyProfile: Company };

export const useGetCompanyProfileByIdQuery = (
  options?: QueryHookOptions<
    GetCompanyProfileQueryResponse,
    GetCompanyProfileQueryRequest
  >,
) => {
  return useQuery<
    GetCompanyProfileQueryResponse,
    GetCompanyProfileQueryRequest
  >(COMPANY_PROFILE_QUERY, { fetchPolicy: 'no-cache', ...options });
};
