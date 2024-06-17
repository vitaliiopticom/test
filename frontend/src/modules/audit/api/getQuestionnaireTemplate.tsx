import { gql, QueryHookOptions, useQuery } from '@/api';

import { AuditQuestionnaireTemplate } from '../types';

export const QUESTIONNAIRE_TEMPLATE_QUERY = gql`
  fragment QuestionValueTypeFields on IValueType {
    __typename
    ... on SingleSelectOption {
      id
      options {
        ...QuestionOptionFields
        onClickContent {
          __typename
          ... on SingleSelectOption {
            id
            options {
              ...QuestionOptionFields
            }
          }
          __typename
          ... on DropDownOption {
            id
            options {
              ...QuestionOptionFields
              onClickContent {
                __typename
                ... on SingleSelectOption {
                  id
                  options {
                    ...QuestionOptionFields
                  }
                }
                __typename
                ... on DropDownOption {
                  id
                  options {
                    ...QuestionOptionFields
                  }
                }
                __typename
                ... on MultiSelectOption {
                  id
                  options {
                    ...QuestionOptionFields
                  }
                }
                __typename
                ... on YesNoOption {
                  id
                  pointsForTrue
                  evaluation
                }
                ... on TextValue {
                  id
                }
                ... on NumberValue {
                  id
                }
                ... on DateTimeValue {
                  id
                }
                ... on EmptyValue {
                  id
                }
              }
            }
          }
          __typename
          ... on MultiSelectOption {
            id
            options {
              ...QuestionOptionFields
            }
          }
          __typename
          ... on YesNoOption {
            id
            pointsForTrue
            evaluation
          }
          ... on TextValue {
            id
          }
          ... on NumberValue {
            id
          }
          ... on DateTimeValue {
            id
          }
          ... on EmptyValue {
            id
          }
        }
      }
    }
    __typename
    ... on DropDownOption {
      id
      options {
        ...QuestionOptionFields
        onClickContent {
          __typename
          ... on SingleSelectOption {
            id
            options {
              ...QuestionOptionFields
            }
          }
          __typename
          ... on DropDownOption {
            id
            options {
              ...QuestionOptionFields
              onClickContent {
                __typename
                ... on SingleSelectOption {
                  id
                  options {
                    ...QuestionOptionFields
                  }
                }
                __typename
                ... on DropDownOption {
                  id
                  options {
                    ...QuestionOptionFields
                  }
                }
                __typename
                ... on MultiSelectOption {
                  id
                  options {
                    ...QuestionOptionFields
                  }
                }
                __typename
                ... on YesNoOption {
                  id
                  pointsForTrue
                  evaluation
                }
                ... on TextValue {
                  id
                }
                ... on NumberValue {
                  id
                }
                ... on DateTimeValue {
                  id
                }
                ... on EmptyValue {
                  id
                }
              }
            }
          }
          __typename
          ... on MultiSelectOption {
            id
            options {
              ...QuestionOptionFields
            }
          }
          __typename
          ... on YesNoOption {
            id
            pointsForTrue
            evaluation
          }
          ... on TextValue {
            id
          }
          ... on NumberValue {
            id
          }
          ... on DateTimeValue {
            id
          }
          ... on EmptyValue {
            id
          }
        }
      }
    }
    __typename
    ... on MultiSelectOption {
      id
      options {
        ...QuestionOptionFields
        onClickContent {
          __typename
          ... on SingleSelectOption {
            id
            options {
              ...QuestionOptionFields
            }
          }
          __typename
          ... on DropDownOption {
            id
            options {
              ...QuestionOptionFields
            }
          }
          __typename
          ... on MultiSelectOption {
            id
            options {
              ...QuestionOptionFields
            }
          }
          __typename
          ... on YesNoOption {
            id
            pointsForTrue
            evaluation
          }
          ... on TextValue {
            id
          }
          ... on NumberValue {
            id
          }
          ... on DateTimeValue {
            id
          }
        }
      }
    }
    __typename
    ... on YesNoOption {
      id
      pointsForTrue
      evaluation
    }
    ... on TextValue {
      id
    }
    ... on NumberValue {
      id
    }
    ... on DateTimeValue {
      id
    }
    ... on EmptyValue {
      id
    }
  }

  fragment QuestionOptionFields on QuestionOption {
    id
    label
    labelLocalizationKey
    isBonus
    popupDescription
    popupDescriptionLocalizationKey
    evaluation
  }

  fragment QuestionFields on Question {
    id
    attachmentsCombination
    text
    textLocalizationKey
    popupDescription
    popupDescriptionLocalizationKey
    validationRules
    valueType {
      ...QuestionValueTypeFields
    }
  }

  query GetTemplateByQuestionnaireId($input: GetTemplateInput!) {
    templateByQuestionnaireId(getTemplate: $input) {
      isActive
      templateType
      phase
      name
      nameLocalizationKey
      groups {
        header
        headerLocalizationKey
        questions {
          ...QuestionFields
        }
      }
    }
  }
`;

export type GetQuestionnaireTemplateQueryRequest = {
  input: {
    questionnaireId: string;
  };
};

export type GetQuestionnaireTemplateQueryResponse = {
  templateByQuestionnaireId: AuditQuestionnaireTemplate;
};

export const useGetQuestionnaireTemplateQuery = (
  options?: QueryHookOptions<
    GetQuestionnaireTemplateQueryResponse,
    GetQuestionnaireTemplateQueryRequest
  >,
) => {
  return useQuery<
    GetQuestionnaireTemplateQueryResponse,
    GetQuestionnaireTemplateQueryRequest
  >(QUESTIONNAIRE_TEMPLATE_QUERY, { fetchPolicy: 'no-cache', ...options });
};
