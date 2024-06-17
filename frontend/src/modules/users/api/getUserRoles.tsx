import { gql, QueryHookOptions, useQuery } from '@/api';
import { DropDownSelectOption } from '@/types/form';

export const USER_ROLES_QUERY = gql`
  query GetRolesByTenant($input: GetRolesByTenantInput!) {
    rolesByTenant(getRolesByTenant: $input) {
      id
      name
      nameLocalizationKey
    }
  }
`;

export type GetUserRolesQueryRequest = {
  input: {
    tenantId: string;
  };
};

export type GetUserRolesQueryResponse = {
  rolesByTenant: DropDownSelectOption[];
};

export const useGetRolesByTenantQuery = (
  options?: QueryHookOptions<
    GetUserRolesQueryResponse,
    GetUserRolesQueryRequest
  >,
) => {
  return useQuery<GetUserRolesQueryResponse, GetUserRolesQueryRequest>(
    USER_ROLES_QUERY,
    options,
  );
};
