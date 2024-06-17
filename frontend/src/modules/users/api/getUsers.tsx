import { gql, QueryHookOptions, useQuery } from '@/api';

import { UserResponse, UsersListFiltersType } from '../types';

export const USERS_QUERY = gql`
  query GetUsers($filters: UserFilterParametersInput!) {
    users(userFilterParameters: $filters) {
      id
      firstname
      lastname
      email
      phoneNumber
      mobileNumber
      tenantAssignments {
        tenantId: id
        name
        pending
        roleAssignments {
          id
          name
          nameLocalizationKey
        }
      }
    }
  }
`;

export type GetUsersQueryRequest = {
  filters: UsersListFiltersType;
};

export type GetUsersQueryResponse = {
  users: UserResponse[];
};

export const useGetUsersQuery = (
  options?: QueryHookOptions<GetUsersQueryResponse, GetUsersQueryRequest>,
) => {
  return useQuery<GetUsersQueryResponse, GetUsersQueryRequest>(USERS_QUERY, {
    ...options,
    notifyOnNetworkStatusChange: true,
  });
};
