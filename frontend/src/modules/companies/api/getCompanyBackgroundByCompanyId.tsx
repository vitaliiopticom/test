import { gql, QueryHookOptions, useQuery } from '@/api';

import { CompanyImage } from '../components/CompanyImages';

export const COMPANY_BACKGROUND_QUERY = gql`
  query GetCompanyBackgrounds($input: GetCompanyBackgroundsByCompanyIdInput!) {
    companyBackgroundsByCompanyId(getCompanyBackgroundsInput: $input) {
      name
      path
      thumbnailPath
    }
  }
`;

export type GetCompanyBackgroundQueryRequest = {
  input: {
    companyId: number;
  };
};

export type GetCompanyBackgroundQueryResponse = {
  companyBackgroundsByCompanyId: CompanyImage[];
};

export const useGetCompanyBackgroundByCompanyIdQuery = (
  options?: QueryHookOptions<
    GetCompanyBackgroundQueryResponse,
    GetCompanyBackgroundQueryRequest
  >,
) => {
  return useQuery<
    GetCompanyBackgroundQueryResponse,
    GetCompanyBackgroundQueryRequest
  >(COMPANY_BACKGROUND_QUERY, options);
};
