import { gql, QueryHookOptions, useQuery } from '@/api';

import { Company } from '../types';

export const COMPANY_QUERY = gql`
  query GetCompany($id: Long!) {
    company(id: $id) {
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
      contractState(module: OPTI_PIX) {
        id
        state
      }
    }
  }
`;

export type GetCompanyQueryRequest = {
  id: number;
};

export type GetCompanyQueryResponse = {
  company: Company;
};

export const useGetCompanyByIdQuery = (
  options?: QueryHookOptions<GetCompanyQueryResponse, GetCompanyQueryRequest>,
) => {
  return useQuery<GetCompanyQueryResponse, GetCompanyQueryRequest>(
    COMPANY_QUERY,
    { fetchPolicy: 'no-cache', ...options },
  );
};
