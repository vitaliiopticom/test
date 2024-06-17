import { gql, QueryHookOptions, useQuery } from '@/api';
import { Paging } from '@/types/pagination';

import { Audit, AuditListFiltersType } from '../types';

export const AUDIT_OVERVIEWS_QUERY = gql`
  query GetAuditOverviews(
    $paging: PagingParametersInput!
    $filters: AuditFilterParametersInput!
  ) {
    auditOverviews(pagingParameters: $paging, filterParameters: $filters) {
      items {
        companyId
        companyName
        companyNickname
        companyCountryName
        parentEntity
        officialCarDealer
        commercialUser {
          id
          photoUrl
          firstName
          lastName
        }
        commercialAssistantUser {
          id
          firstName
          lastName
          photoUrl
        }
        preAuditOptiAds {
          id
          responsibleUser {
            id
            firstName
            lastName
            photoUrl
          }
          rating {
            private {
              score
              max
            }
            stars {
              score
              max
            }
          }
          status
          hasHistory
        }
        preAuditOptiPix {
          id
          responsibleUser {
            id
            firstName
            lastName
            photoUrl
          }
          rating {
            private {
              score
              max
            }
            stars {
              score
              max
            }
          }
          status
          hasHistory
        }
        preAuditOptiLeads {
          id
          responsibleUser {
            id
            firstName
            lastName
            photoUrl
          }
          rating {
            private {
              score
              max
            }
            stars {
              score
              max
            }
          }
          status
          hasHistory
        }
      }
      count
    }
  }
`;

export type GetAuditOverviewsQueryRequest = {
  paging: Paging;
  filters: AuditListFiltersType;
};

export type GetAuditOverviewsQueryResponse = {
  auditOverviews: {
    items: Audit[];
    count: number;
  };
};

export const useGetAuditOverviewsQuery = (
  options?: QueryHookOptions<
    GetAuditOverviewsQueryResponse,
    GetAuditOverviewsQueryRequest
  >,
) => {
  return useQuery<
    GetAuditOverviewsQueryResponse,
    GetAuditOverviewsQueryRequest
  >(AUDIT_OVERVIEWS_QUERY, { ...options, notifyOnNetworkStatusChange: true });
};
