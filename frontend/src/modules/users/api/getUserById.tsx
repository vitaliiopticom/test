import { gql, QueryHookOptions, useQuery } from '@/api';

import { UserResponse } from '../types';

export const USER_QUERY = gql`
  query GetUser($input: GetUserInput!) {
    user(getUser: $input) {
      id
      gender
      firstname
      lastname
      email
      defaultLanguageId
      mobileNumber
      phoneNumber
      photoUrl
      tenantAssignments {
        tenantId: id
        name
        roleAssignments {
          id
          name
          nameLocalizationKey
        }
      }
    }
  }
`;

export type GetUserByIdQueryRequest = {
  input: { id: string };
};

export type GetUserByIdQueryResponse = {
  user: UserResponse;
};

export const useGetUserByIdQuery = (
  options?: QueryHookOptions<GetUserByIdQueryResponse, GetUserByIdQueryRequest>,
) => {
  return useQuery<GetUserByIdQueryResponse, GetUserByIdQueryRequest>(
    USER_QUERY,
    { fetchPolicy: 'no-cache', ...options },
  );
};
