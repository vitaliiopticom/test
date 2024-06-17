import { gql, QueryHookOptions, useQuery } from '@/api';
import { DropDownSelectOption } from '@/types/form';

export const GLOBAL_ROLES_QUERY = gql`
  query GetGlobalRoles {
    globalRoles {
      id
      name
      nameLocalizationKey
    }
  }
`;

export type GetGlobalRolesQueryResponse = {
  globalRoles: DropDownSelectOption[];
};

export const useGetGlobalRolesQuery = (
  options?: QueryHookOptions<GetGlobalRolesQueryResponse>,
) => {
  return useQuery<GetGlobalRolesQueryResponse>(GLOBAL_ROLES_QUERY, options);
};
