import { gql, QueryHookOptions, useQuery } from '@/api';

import {
  ActiveTemplates,
  AuditQuestionnairePhase,
  AuditQuestionnaireType,
} from '../types';

export const ACTIVE_TEMPLATES_QUERY = gql`
  query GetActiveTemplate($input: GetActiveTemplateInput!) {
    activeTemplates(getActiveTemplate: $input) {
      id
      name
      nameLocalizationKey
      isActive
      isEditable
      phase
      templateType
    }
  }
`;

export type ActiveTemplatesQueryRequest = {
  input: {
    phase: AuditQuestionnairePhase;
    templateType: AuditQuestionnaireType;
  };
};

export type ActiveTemplatesQueryResponse = {
  activeTemplates: ActiveTemplates[];
};

export const useQuestionnaireTemplatesQuery = (
  options?: QueryHookOptions<
    ActiveTemplatesQueryResponse,
    ActiveTemplatesQueryRequest
  >,
) => {
  return useQuery<ActiveTemplatesQueryResponse, ActiveTemplatesQueryRequest>(
    ACTIVE_TEMPLATES_QUERY,
    options,
  );
};
