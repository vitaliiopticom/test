import { gql, MutationHookOptions, useApolloClient, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { QUESTIONNAIRE_QUERY } from './getQuestionnaire';

export const UPDATE_AUDIT_STATUS_MUTATION = gql`
  mutation UpdateAuditStatus($questionnaireId: UUID!) {
    setQuestionnaireAsSent(questionnaireId: $questionnaireId)
  }
`;

export type UpdateAuditStatusMutationRequest = {
  questionnaireId: string;
};

export type UpdateAuditStatusMutationResponse = unknown;

export const useUpdateAuditStatusMutation = (
  options?: MutationHookOptions<
    UpdateAuditStatusMutationResponse,
    UpdateAuditStatusMutationRequest
  >,
) => {
  const client = useApolloClient();
  const { t } = useTranslation();

  return useMutation<
    UpdateAuditStatusMutationResponse,
    UpdateAuditStatusMutationRequest
  >(UPDATE_AUDIT_STATUS_MUTATION, {
    ...options,
    onCompleted: (data, clientOptions) => {
      client.refetchQueries({ include: [QUESTIONNAIRE_QUERY] });
      toast.success<string>(t('audit.notifications.markAsSent'));
      options?.onCompleted?.(data, clientOptions);
    },
  });
};
