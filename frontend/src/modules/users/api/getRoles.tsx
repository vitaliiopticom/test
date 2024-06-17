import { gql, QueryHookOptions, useQuery } from '@/api';
import { DropDownSelectOption } from '@/types/form';

export const ROLES_QUERY = gql`
  query GetRoles {
    roles {
      id
      name
      nameLocalizationKey
    }
  }
`;

export type GetUserRolesQueryResponse = {
  roles: DropDownSelectOption[];
};

export const useGetRolesQuery = (
  options?: QueryHookOptions<GetUserRolesQueryResponse>,
) => {
  return useQuery<GetUserRolesQueryResponse>(ROLES_QUERY, options);
};
