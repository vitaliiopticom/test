import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Modal, Skeleton } from '@/components/elements';
import { Form, QueryDataLoader, RadioGroupField } from '@/components/shared';
import { useFormValidation } from '@/hooks';
import { NAMESPACES, useTranslation } from '@/i18n';
import { routes } from '@/router/routesList';

import { useCreateQuestionnaireMutation } from '../api/createQuestionnaire';
import { useQuestionnaireTemplatesQuery } from '../api/getQuestionnaireTemplates';
import { QUESTIONNAIRE_PHASE } from '../constants';
import { AuditQuestionnaireType } from '../types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectTemplateAudit?: SelectTemplateAudit;
};

export type SelectTemplateAudit = {
  companyId: number;
  templateType: AuditQuestionnaireType;
};

type SelectTemplateFormValues = {
  template: string;
};

export const SelectTemplateModal: React.FC<Props> = ({
  isOpen,
  onClose,
  selectTemplateAudit,
}) => {
  const { companyId, templateType } = selectTemplateAudit || {};

  const navigate = useNavigate();
  const { t } = useTranslation();
  const validation = useFormValidation();
  const questionnaireTemplatesQuery = useQuestionnaireTemplatesQuery({
    variables: {
      input: {
        phase: QUESTIONNAIRE_PHASE.PRE_AUDIT,
        templateType: templateType as AuditQuestionnaireType,
      },
    },
    skip: !selectTemplateAudit,
  });
  const [createQuestionnaire, createQuestionnaireState] =
    useCreateQuestionnaireMutation({
      onCompleted: (data) => {
        navigate(routes.auditDetail(data.createQuestionnaire.questionnaireId));
      },
    });

  const schema = validation.schema({
    template: validation.string(),
  });

  const isSubmitting = createQuestionnaireState.loading;
  const { activeTemplates } = questionnaireTemplatesQuery.data || {};

  const options = useMemo(
    () =>
      activeTemplates?.map((template) => ({
        label: t(template.nameLocalizationKey, {
          defaultValue: template.name,
          ns: NAMESPACES.QuestionnaireTemplate,
        }),
        value: template.id,
      })) ?? [],
    [activeTemplates, t],
  );

  const handleSubmit = (values: SelectTemplateFormValues) => {
    if (!companyId) return;

    createQuestionnaire({
      variables: {
        input: {
          companyId,
          templateId: values.template,
        },
      },
    });
  };

  // TODO for the next phase
  /*const renderGroupField = (item: OptionType, node: ReactNode) => {
    return (
      <div key={item.value} className="gap flex justify-between">
        {node}
        <div className="flex gap-4">
          <Button size="sm" startIcon="layers" variant="secondary">
            {t('common.copy')}
          </Button>
          <Button size="sm" startIcon="edit" variant="secondary">
            {t('common.edit')}
          </Button>
        </div>
      </div>
    );
  };*/

  return (
    <Modal
      className="overflow-x-auto"
      isOpen={isOpen}
      title={t('audit.selectTemplate')}
      onClose={onClose}
    >
      <QueryDataLoader
        loader={
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-80" />
            <Skeleton className="h-8 w-80" />
          </div>
        }
        query={questionnaireTemplatesQuery}
      >
        <div className="min-w-[400px]">
          <Form schema={schema} onSubmit={handleSubmit}>
            <RadioGroupField
              name="template"
              options={options}
              // render={renderGroupField}
              isVertical
            />
            <div className="mt-8 flex justify-end">
              <div className="flex gap-4">
                <Button
                  disabled={isSubmitting}
                  variant="secondary"
                  onClick={onClose}
                >
                  {t('common.cancel')}
                </Button>
                <Button isLoading={isSubmitting} type="submit">
                  {t('common.start')}
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </QueryDataLoader>
    </Modal>
  );
};
