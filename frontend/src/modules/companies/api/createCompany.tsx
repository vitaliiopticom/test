import { gql, MutationHookOptions, useApolloClient, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { Company, CompanyFormValues } from '../types';

import { COMPANIES_QUERY } from './getCompanies';

export const CREATE_COMPANY_MUTATION = gql`
  mutation CreateCompany($input: CreateCompanyInput!) {
    createCompany(createCompany: $input) {
      id
      companyName
    }
  }
`;

export type CreateCompanyMutationRequest = {
  input: Omit<
    CompanyFormValues,
    'turnover' | 'foundingDate' | 'streetNumber' | 'googleRating'
  > & {
    turnover: number | null;
    foundingDate: string | null;
    streetNumber: string | null;
    googleRating: string | null;
  };
};

export type CreateCompanyMutationResponse = Company;

export const useCreateCompanyMutation = (
  options?: MutationHookOptions<
    CreateCompanyMutationResponse,
    CreateCompanyMutationRequest
  >,
) => {
  const client = useApolloClient();
  const { t } = useTranslation();

  return useMutation<
    CreateCompanyMutationResponse,
    CreateCompanyMutationRequest
  >(CREATE_COMPANY_MUTATION, {
    ...options,
    onCompleted: (data, clientOptions) => {
      client.refetchQueries({ include: [COMPANIES_QUERY] });
      toast.success<string>(
        t('notifications.successCreate', { name: t('common.company') }),
      );
      options?.onCompleted?.(data, clientOptions);
    },
  });
};
