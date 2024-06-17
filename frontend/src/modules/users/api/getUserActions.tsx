import { gql, QueryHookOptions, useQuery } from '@/api';
import { DropDownSelectOption } from '@/types/form';

export const USER_ACTIONS_QUERY = gql`
  query GetActions {
    actions {
      id
      name
      nameLocalizationKey
    }
  }
`;

export type GetUserActionsQueryResponse = {
  actions: DropDownSelectOption[];
};

export const useGetUserActionsQuery = (
  options?: QueryHookOptions<GetUserActionsQueryResponse>,
) => {
  return useQuery<GetUserActionsQueryResponse>(USER_ACTIONS_QUERY, options);
};
