import { gql, MutationHookOptions, useApolloClient, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { AUDIT_OVERVIEWS_QUERY } from './getAudits';

export const CREATE_QUESTIONNAIRE_MUTATION = gql`
  mutation CreateQuestionnaire($input: CreateQuestionnaireInput!) {
    createQuestionnaire(createQuestionnaire: $input) {
      questionnaireId
    }
  }
`;

export type CreateQuestionnaireMutationRequest = {
  input: {
    companyId: number;
    templateId: string;
  };
};

export type CreateQuestionnaireMutationResponse = {
  createQuestionnaire: {
    questionnaireId: string;
  };
};

export const useCreateQuestionnaireMutation = (
  options?: MutationHookOptions<
    CreateQuestionnaireMutationResponse,
    CreateQuestionnaireMutationRequest
  >,
) => {
  const client = useApolloClient();
  const { t } = useTranslation();

  return useMutation<
    CreateQuestionnaireMutationResponse,
    CreateQuestionnaireMutationRequest
  >(CREATE_QUESTIONNAIRE_MUTATION, {
    ...options,
    onCompleted: (data, clientOptions) => {
      client.refetchQueries({ include: [AUDIT_OVERVIEWS_QUERY] });
      toast.success<string>(
        t('notifications.successCreate', { name: t('common.preAudit') }),
      );
      options?.onCompleted?.(data, clientOptions);
    },
  });
};
