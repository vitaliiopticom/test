import { gql, MutationHookOptions, useApolloClient, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { Company, CompanyFormValues } from '../types';

import { COMPANIES_QUERY } from './getCompanies';

export const UPDATE_COMPANY_MUTATION = gql`
  mutation UpdateCompany($input: UpdateCompanyInput!) {
    updateCompany(updateCompany: $input) {
      id
    }
  }
`;

export type UpdateCompanyMutationRequest = {
  input: { id: number; contactId?: number } & Omit<
    CompanyFormValues,
    'turnover' | 'foundingDate'
  > & {
      turnover: number | null;
      foundingDate: string | null;
      streetNumber: string | null;
      googleRating: string | null;
    };
};

export type UpdateCompanyMutationResponse = Company;

export const useUpdateCompanyMutation = (
  options?: MutationHookOptions<
    UpdateCompanyMutationResponse,
    UpdateCompanyMutationRequest
  >,
) => {
  const client = useApolloClient();
  const { t } = useTranslation();

  return useMutation<
    UpdateCompanyMutationResponse,
    UpdateCompanyMutationRequest
  >(UPDATE_COMPANY_MUTATION, {
    ...options,
    onCompleted: (data, clientOptions) => {
      client.refetchQueries({ include: [COMPANIES_QUERY] });
      toast.success<string>(
        t('notifications.successUpdate', { name: t('common.company') }),
      );
      options?.onCompleted?.(data, clientOptions);
    },
  });
};
