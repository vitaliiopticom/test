import { gql, QueryHookOptions, useLazyQuery } from '@/api';

export const DOWNLOAD_PDF_REPORT_QUERY = gql`
  query DownloadPdfReport($downloadPdfReport: DownloadPdfReportInput!) {
    downloadPdfReport(downloadPdfReport: $downloadPdfReport) {
      uri
    }
  }
`;

export type DownloadPdfReportQueryRequest = {
  downloadPdfReport: {
    questionnaireId: string;
    languageCode: string;
  };
};

export type DownloadPdfReportQueryResponse = {
  downloadPdfReport: {
    uri: string;
  };
};

export const useDownloadPdfReportLazyQuery = (
  options?: QueryHookOptions<
    DownloadPdfReportQueryResponse,
    DownloadPdfReportQueryRequest
  >,
) => {
  return useLazyQuery<
    DownloadPdfReportQueryResponse,
    DownloadPdfReportQueryRequest
  >(DOWNLOAD_PDF_REPORT_QUERY, {
    ...options,
    fetchPolicy: 'no-cache',
  });
};
