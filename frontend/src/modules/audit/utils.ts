import { createFullNameFromUser } from '@/modules/users';
import { isDef } from '@/utils/common';
import { checkIsEvenNumber } from '@/utils/numbers';

import { fieldsConfig } from './components/questionnaire/fieldsConfig';
import {
  Answer,
  ATTACHMENT_TYPE,
  ATTACHMENTS_COMBINATION,
  AttachmentsCombinationType,
  AuditQuestion,
  AuditQuestionnaireTemplate,
  AuditQuestionnaireValues,
  OverviewUser,
  QuestionnaireQueryAnswer,
} from './types';

export const joinAvatars = (users: OverviewUser[]) => {
  return users
    .filter((user) => user?.firstName)
    .map((user) => ({
      imgUrl: user.photoUrl,
      name: createFullNameFromUser(user.firstName, user.lastName),
    }));
};

export const findFieldTypeByQuestionId = (
  questions: AuditQuestion[],
  id: string,
) => {
  const question = questions.find((q) => q.id === id)!;
  const questionType = question?.valueType.__typename;
  const fieldType = fieldsConfig[questionType];

  return { fieldType, questionType };
};

export const getAllQuestionsFromTemplate = (
  template: AuditQuestionnaireTemplate,
): AuditQuestion[] => {
  return template.groups.map((group) => group.questions).flat();
};

export const transformAnswersToFormValues = (
  answers: QuestionnaireQueryAnswer[],
  questions: AuditQuestion[],
) => {
  return answers.reduce((acc, answer) => {
    if (answer.value === null && !answer.attachments?.length) return acc;

    const { fieldType } = findFieldTypeByQuestionId(
      questions,
      answer.questionId,
    );

    if (!fieldType) return acc;

    acc[answer.questionId] = {
      value: fieldType.answerToValueTransform
        ? fieldType.answerToValueTransform(answer.value)
        : answer.value,
      note: answer.note || '',
      attachments: answer.attachments || [],
    };

    return acc;
  }, {} as AuditQuestionnaireValues);
};

export const transformFormValuesToAnswers = (
  values: AuditQuestionnaireValues,
  questions: AuditQuestion[],
) => {
  return Object.entries(values)
    .map<Answer>(([id, field]) => {
      const value = field.value;
      const { fieldType, questionType } = findFieldTypeByQuestionId(
        questions,
        id,
      );

      if (!fieldType) {
        return {
          questionId: id,
          value: null,
          valueType: questionType,
          note: field.note,
        };
      }

      return {
        value: fieldType.saveValueTransform(value, field),
        questionId: id,
        valueType: questionType,
        note: field.note,
      };
    })
    .filter((answer) => isDef(answer.value));
};

export const getAttachmentType = (
  attachmentsCombination: AttachmentsCombinationType,
  index: number,
) => {
  return attachmentsCombination === ATTACHMENTS_COMBINATION.ONLY_PREVIEWS ||
    checkIsEvenNumber(index)
    ? ATTACHMENT_TYPE.PREVIEW
    : ATTACHMENT_TYPE.SCREENSHOT;
};
