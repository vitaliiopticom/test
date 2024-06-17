import { gql, QueryHookOptions, useQuery } from '@/api';

import { AuditHistoryRow, AuditQuestionnaireType } from '../types';

export const AUDIT_HISTORY_OVERVIEW_QUERY = gql`
  query GetAuditHistoryOverview($input: GetAuditHistoryOverviewInput!) {
    auditHistoryOverview(getAuditHistoryOverview: $input) {
      questionnaireId
      dateCreated
      createdByUser {
        firstname
        lastname
      }
      dateSent
      sentByUser {
        firstname
        lastname
      }
      rating {
        stars {
          max
          score
        }
      }
      status
    }
  }
`;

export type GetAuditHistoryOverviewQueryRequest = {
  input: {
    auditType: AuditQuestionnaireType;
    companyId: number;
  };
};

export type GetAuditHistoryOverviewQueryResponse = {
  auditHistoryOverview: AuditHistoryRow[];
};

export const useGetAuditHistoryOverview = (
  options?: QueryHookOptions<
    GetAuditHistoryOverviewQueryResponse,
    GetAuditHistoryOverviewQueryRequest
  >,
) => {
  return useQuery<
    GetAuditHistoryOverviewQueryResponse,
    GetAuditHistoryOverviewQueryRequest
  >(AUDIT_HISTORY_OVERVIEW_QUERY, {
    ...options,
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
  });
};
