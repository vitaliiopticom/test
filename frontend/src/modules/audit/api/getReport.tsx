import { gql, QueryHookOptions, useLazyQuery } from '@/api';

import { ReportDetail } from '../types';

export const REPORT_QUERY = gql`
  query GetAuditReportData($input: GetAuditReportDataInput!) {
    auditReportData(getAuditReportData: $input) {
      companyName
      questionnaireId
      questionnairePhase
      questionnaireType
      lastModified
      groups {
        groupHeader
        groupHeaderLocalizationKey
        rating {
          stars {
            score
            max
          }
        }
        nationalAverageRating {
          stars {
            score
          }
        }
      }
      questionAnswers {
        code
        questionText
        questionTextLocalizationKey
        images {
          name
          uri
          thumbnailUri
        }
      }
      rating {
        stars {
          score
          max
        }
      }
      contactBusinessCards {
        name
        uri
        thumbnailUri
      }
    }
  }
`;

export type GetReportQueryRequest = {
  input: {
    questionnaireId: string;
  };
};

export type GetReportQueryResponse = {
  auditReportData: ReportDetail;
};

export const useGetReportQuery = (
  options?: QueryHookOptions<GetReportQueryResponse, GetReportQueryRequest>,
) => {
  return useLazyQuery<GetReportQueryResponse, GetReportQueryRequest>(
    REPORT_QUERY,
    {
      fetchPolicy: 'no-cache',
      ...options,
    },
  );
};
