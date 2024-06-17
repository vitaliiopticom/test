import { gql, QueryHookOptions, useQuery } from '@/api';

export const USER_IDS_BY_EMAILS_QUERY = gql`
  query GetUsers($emails: [String]!) {
    userIdsByEmails(emails: $emails) {
      email
      id
    }
  }
`;

export type GetUserIdsByEmailsQueryRequest = {
  emails: string[];
};

export type GetUserIdsByEmailsQueryResponse = {
  userIdsByEmails: {
    email: string;
    id: string;
  }[];
};

export const useGetUserIdsByEmailsQuery = (
  options?: QueryHookOptions<
    GetUserIdsByEmailsQueryResponse,
    GetUserIdsByEmailsQueryRequest
  >,
) => {
  return useQuery<
    GetUserIdsByEmailsQueryResponse,
    GetUserIdsByEmailsQueryRequest
  >(USER_IDS_BY_EMAILS_QUERY, {
    ...options,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
  });
};
