import { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, DndProvider, Icon, Link } from '@/components/elements';
import {
  DataLoader,
  Page,
  PromptConfirmModal,
  useForm,
} from '@/components/shared';
import { useDisclosure } from '@/hooks';
import { useTranslation } from '@/i18n';
import { routes } from '@/router/routesList';

import { useGetQuestionnaireQuery } from '../api/getQuestionnaire';
import { useGetQuestionnaireTemplateQuery } from '../api/getQuestionnaireTemplate';
import { useSaveQuestionnaireMutation } from '../api/saveQuestionnaire';
import { GenerateReportPopover } from '../components/GenerateReportPopover';
import { MarkAsSentConfirmModal } from '../components/questionnaire/MarkAsSentConfirmModal';
import { Questionnaire } from '../components/questionnaire/Questionnaire';
import { QuestionnaireHeader } from '../components/questionnaire/QuestionnaireHeader';
import { QuestionnaireSkeleton } from '../components/questionnaire/QuestionnaireSkeleton';
import { AUDIT_STATUS } from '../constants';
import { AuditDetailParams, AuditQuestionnaireValues } from '../types';
import {
  getAllQuestionsFromTemplate,
  transformAnswersToFormValues,
  transformFormValuesToAnswers,
} from '../utils';

export const AuditDetailPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id = '' } = useParams<AuditDetailParams>();
  const [isEditMode, setIsEditMode] = useState(false);
  const markAsSentModal = useDisclosure();
  const promptConfirmModal = useDisclosure();

  const [selectedTab, setSelectedTab] = useState(0);

  const questionnaireQuery = useGetQuestionnaireQuery({
    variables: { input: { questionnaireId: id } },
    skip: !id,
    notifyOnNetworkStatusChange: true,
  });

  const audit = questionnaireQuery.data?.questionnaireAnswers;
  const hasEditActions =
    (audit?.state !== AUDIT_STATUS.SENT &&
      audit?.state !== AUDIT_STATUS.DONE) ||
    isEditMode;
  const hasExportAction =
    (audit?.state === AUDIT_STATUS.SENT ||
      audit?.state === AUDIT_STATUS.DONE) &&
    !isEditMode;

  const templateQuery = useGetQuestionnaireTemplateQuery({
    variables: {
      input: {
        questionnaireId: id,
      },
    },
    skip: !audit,
  });

  const template = templateQuery.data?.templateByQuestionnaireId;
  const answers = useMemo(() => audit?.answers, [audit]);

  const questions = useMemo(() => {
    if (!template) return [];

    return getAllQuestionsFromTemplate(template);
  }, [template]);

  const defaultValues = useMemo(
    () => transformAnswersToFormValues(answers ?? [], questions),
    [answers, questions],
  );

  const formMethods = useForm({ defaultValues });

  useEffect(() => {
    formMethods.reset(defaultValues);
  }, [defaultValues, formMethods]);

  const [saveQuestionnaire, saveQuestionnaireState] =
    useSaveQuestionnaireMutation({
      onCompleted: () => {
        questionnaireQuery.refetch();
        setIsEditMode(false);
      },
    });

  const handleSubmit = (values: AuditQuestionnaireValues) => {
    if (!id) return;

    const answers = transformFormValuesToAnswers(values, questions);

    saveQuestionnaire({
      variables: {
        input: {
          questionnaireId: id,
          answers,
        },
      },
    });
  };

  const handleCancel = async () => {
    await questionnaireQuery.refetch();

    formMethods.reset();
    promptConfirmModal.onClose();
    setIsEditMode(false);
  };

  return (
    <DndProvider>
      <Page
        actions={
          audit ? (
            <>
              {audit.state === AUDIT_STATUS.DONE && !isEditMode && (
                <>
                  <Button
                    startIcon="check"
                    variant="ghost"
                    onClick={markAsSentModal.onOpen}
                  >
                    {t('audit.auditDetail.markAsSent')}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setIsEditMode(true)}
                  >
                    {t('common.edit')}
                  </Button>
                </>
              )}
              {hasExportAction && (
                <GenerateReportPopover questionnaireId={id}>
                  <Button
                    disabled={
                      questionnaireQuery.loading || templateQuery.loading
                    }
                    endIcon="arrowDown"
                  >
                    {t('common.exportPdf')}
                  </Button>
                </GenerateReportPopover>
              )}
              {hasEditActions && (
                <>
                  <Button
                    variant="secondary"
                    onClick={
                      isEditMode
                        ? promptConfirmModal.onOpen
                        : () => navigate(routes.audit())
                    }
                  >
                    {t('common.cancel')}
                  </Button>
                  <Button
                    disabled={
                      questionnaireQuery.loading || templateQuery.loading
                    }
                    form="audit-questionnaire-form"
                    isLoading={saveQuestionnaireState.loading}
                    type="submit"
                  >
                    {t('common.submit')}
                  </Button>
                </>
              )}
            </>
          ) : null
        }
        headerContent={
          audit ? (
            <QuestionnaireHeader
              audit={audit}
              formMethods={formMethods}
              groups={
                templateQuery?.data?.templateByQuestionnaireId.groups ?? []
              }
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          ) : undefined
        }
        title={
          audit
            ? t('audit.auditDetail.title', {
                type: t(`audit.type.${audit.type}`),
                phase: t(`audit.phase.${audit.phase}`),
                companyName: audit.company?.companyName,
              })
            : undefined
        }
        backButton
        isHeaderSticky
      >
        <DataLoader
          data={templateQuery.data}
          isLoading={templateQuery.loading || questionnaireQuery.loading}
          loader={<QuestionnaireSkeleton />}
        >
          {({ data }) => (
            <>
              <div className="flex h-0 justify-end bg-primary text-primary [&_p]:text-sm [&_p]:font-semibold [&_svg]:mr-2 [&_svg]:mt-1">
                <Icon name="question" />
                <Link
                  to="/guidelines/auditGuidelinePdf.pdf"
                  download
                  isExternal
                >
                  {t('audit.report.guidelinePdf')}
                </Link>
              </div>
              <Questionnaire
                formMethods={formMethods}
                isDisabled={
                  audit?.state === AUDIT_STATUS.SENT ||
                  (audit?.state === AUDIT_STATUS.DONE && !isEditMode)
                }
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                template={data.templateByQuestionnaireId}
                onSubmit={handleSubmit}
              />
            </>
          )}
        </DataLoader>
        <MarkAsSentConfirmModal
          isOpen={markAsSentModal.isOpen}
          questionnaireId={id}
          onClose={markAsSentModal.onClose}
        />
        <PromptConfirmModal
          isOpen={promptConfirmModal.isOpen}
          isSubmitting={questionnaireQuery.loading}
          onClose={promptConfirmModal.onClose}
          onConfirm={handleCancel}
        />
      </Page>
    </DndProvider>
  );
};
