import { gql, QueryHookOptions, useQuery } from '@/api';
import { Paging } from '@/types/pagination';

import { AuditForUser, AuditListFiltersType } from '../types';

export const AUDIT_OVERVIEWS_FOR_USER_QUERY = gql`
  query GetUserRelatedAudits(
    $paging: PagingParametersInput!
    $filters: AuditFilterParametersInput!
  ) {
    userRelatedAudits(pagingParameters: $paging, filterParameters: $filters) {
      items {
        auditType
        companyId
        companyName
        companyNickname
        companyCountryName
        rating
        createdBy
        dateCreated
        relatedReport
        hasHistory
      }
      count
    }
  }
`;

export type GetAuditOverviewsForUserQueryRequest = {
  paging: Paging;
  filters: AuditListFiltersType;
};

export type GetAuditOverviewsForUserQueryResponse = {
  userRelatedAudits: {
    items: AuditForUser[];
    count: number;
  };
};

export const useGetAuditOverviewsForUserQuery = (
  options?: QueryHookOptions<
    GetAuditOverviewsForUserQueryResponse,
    GetAuditOverviewsForUserQueryRequest
  >,
) => {
  return useQuery<
    GetAuditOverviewsForUserQueryResponse,
    GetAuditOverviewsForUserQueryRequest
  >(AUDIT_OVERVIEWS_FOR_USER_QUERY, {
    ...options,
    notifyOnNetworkStatusChange: true,
  });
};
