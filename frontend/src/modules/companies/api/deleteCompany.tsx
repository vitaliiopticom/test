import { gql, MutationHookOptions, useApolloClient, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { Company } from '../types';

import { COMPANIES_QUERY } from './getCompanies';

export const DELETE_COMPANY_MUTATION = gql`
  mutation DeleteCompany($input: Long!) {
    deleteCompany(id: $input) {
      id
    }
  }
`;

export type DeleteCompanyMutationRequest = {
  input: number;
};

export type DeleteCompanyMutationResponse = Company;

export const useDeleteCompanyMutation = (
  options?: MutationHookOptions<
    DeleteCompanyMutationResponse,
    DeleteCompanyMutationRequest
  >,
) => {
  const client = useApolloClient();
  const { t } = useTranslation();

  return useMutation<
    DeleteCompanyMutationResponse,
    DeleteCompanyMutationRequest
  >(DELETE_COMPANY_MUTATION, {
    ...options,
    onCompleted: (data, clientOptions) => {
      client.refetchQueries({ include: [COMPANIES_QUERY] });
      toast.success<string>(
        t('notifications.successDelete', { name: t('common.company') }),
      );
      options?.onCompleted?.(data, clientOptions);
    },
  });
};
