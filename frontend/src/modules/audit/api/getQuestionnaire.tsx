import { gql, QueryHookOptions, useQuery } from '@/api';

import { AuditDetail } from '../types';

export const QUESTIONNAIRE_QUERY = gql`
  query GetQuestionnaire($input: GetQuestionnaireAnswersInput!) {
    questionnaireAnswers(getQuestionnaireAnswers: $input) {
      company {
        companyName
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
      responsibleUser {
        firstName
        lastName
      }
      phase
      state
      type
      date
      lastModified
      answers {
        questionId
        attachments {
          id
          name
          sizeInBytes
          contentType
          uri
          thumbnailUri
          createdAt
        }
        value
        note
      }
      lastModifiedByUser {
        firstName
        lastName
      }
    }
  }
`;

export type GetQuestionnaireQueryRequest = {
  input: {
    questionnaireId: string;
  };
};

export type GetQuestionnaireQueryResponse = {
  questionnaireAnswers: AuditDetail;
};

export const useGetQuestionnaireQuery = (
  options?: QueryHookOptions<
    GetQuestionnaireQueryResponse,
    GetQuestionnaireQueryRequest
  >,
) => {
  return useQuery<GetQuestionnaireQueryResponse, GetQuestionnaireQueryRequest>(
    QUESTIONNAIRE_QUERY,
    { fetchPolicy: 'no-cache', ...options },
  );
};
