import { gql, MutationHookOptions, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { Answer } from '../types';

export const SAVE_QUESTIONNAIRE_MUTATION = gql`
  mutation SaveQuestionnaireAnswers($input: SaveQuestionnaireAnswersInput!) {
    saveQuestionnaireAnswers(saveQuestionnaireAnswers: $input)
  }
`;

export type SaveQuestionnaireMutationRequest = {
  input: {
    questionnaireId: string;
    answers: Array<{ questionId: string; value: Answer }>;
  };
};

export type SaveQuestionnaireMutationResponse = string;

export const useSaveQuestionnaireMutation = (
  options?: MutationHookOptions<
    SaveQuestionnaireMutationResponse,
    SaveQuestionnaireMutationRequest
  >,
) => {
  const { t } = useTranslation();

  return useMutation<
    SaveQuestionnaireMutationResponse,
    SaveQuestionnaireMutationRequest
  >(SAVE_QUESTIONNAIRE_MUTATION, {
    ...options,
    onCompleted: (data, clientOptions) => {
      toast.success<string>(
        t('notifications.successUpdate', { name: t('common.preAudit') }),
      );
      options?.onCompleted?.(data, clientOptions);
    },
  });
};
