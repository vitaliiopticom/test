import { gql, QueryHookOptions, useQuery } from '@/api';

import { CompanyImage } from '../components/CompanyImages';

export const COMPANY_LICENSE_PLATES_QUERY = gql`
  query GetCompanyLicensePlates(
    $input: GetCompanyLicensePlatesByCompanyIdInput!
  ) {
    companyLicensePlatesByCompanyId(getCompanyLicensePlatesInput: $input) {
      name
      path
      thumbnailPath
    }
  }
`;

export type GetCompanyLicensePlatesQueryRequest = {
  input: {
    companyId: number;
  };
};

export type GetCompanyLicensePlatesQueryResponse = {
  companyLicensePlatesByCompanyId: CompanyImage[];
};

export const useGetCompanyLicensePlatesByCompanyIdQuery = (
  options?: QueryHookOptions<
    GetCompanyLicensePlatesQueryResponse,
    GetCompanyLicensePlatesQueryRequest
  >,
) => {
  return useQuery<
    GetCompanyLicensePlatesQueryResponse,
    GetCompanyLicensePlatesQueryRequest
  >(COMPANY_LICENSE_PLATES_QUERY, options);
};
