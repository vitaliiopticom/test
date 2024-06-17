import { gql, QueryHookOptions, useQuery } from '@/api';
import { CompanyContact } from '@/modules/users';

export const CONTACTS_FOR_TENANT_MUTATION = gql`
  query GetContactsForTenant($input: ContactsTenantIdInput) {
    contactsForTenant(tenantIdInput: $input) {
      contactFirstName
      contactLastName
      contactEmail
      contactPhoneNumber
      contactMobilePhoneNumber
      contactCourtesyId {
        id
        localizationKey
        name
      }
      contactDefaultLanguage {
        id
        localizationKey
        name
      }
      contactFunctionIds {
        id
        localizationKey
        name
      }
    }
  }
`;

export type GetContactsForTenantRequest = {
  input: {
    tenantId?: string;
  };
};

export type GetContactsForTenantResponse = {
  contactsForTenant: CompanyContact[];
};

export const useGetContactsForTenantQuery = (
  options?: QueryHookOptions<
    GetContactsForTenantResponse,
    GetContactsForTenantRequest
  >,
) => {
  return useQuery<GetContactsForTenantResponse, GetContactsForTenantRequest>(
    CONTACTS_FOR_TENANT_MUTATION,
    {
      fetchPolicy: 'no-cache',
      ...options,
    },
  );
};
