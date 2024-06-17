import { gql, QueryHookOptions, useQuery } from '@/api';

import { Profile } from '../types';

export const PROFILE_QUERY = gql`
  query GetProfile {
    currentUserProfile {
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
        id
        name
        companyId
        shouldUpdateOptipixPassword
        validActions
        redirectToOnboarding
        pending
      }
    }
  }
`;

export type GetUserByIdQueryRequest = never;

export type GetUserByIdQueryResponse = {
  currentUserProfile: Profile;
};

export const useProfileQuery = (
  options?: QueryHookOptions<GetUserByIdQueryResponse, GetUserByIdQueryRequest>,
) => {
  return useQuery<GetUserByIdQueryResponse, GetUserByIdQueryRequest>(
    PROFILE_QUERY,
    options,
  );
};
