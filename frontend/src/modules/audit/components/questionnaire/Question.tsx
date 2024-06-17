import { FC } from 'react';

import { Card, Heading, Text } from '@/components/elements';
import { NAMESPACES, useTranslation } from '@/i18n';
import { cx } from '@/utils/classNames';

import {
  AttachmentsCombinationType,
  QuestionValidationRules,
  ValueTypeConfig,
} from '../../types';

import { fieldsConfig } from './fieldsConfig';
import { HelperTooltip } from './HelperTooltip';
import { QuestionEvaluation } from './QuestionEvaluation';
import { QuestionPanel } from './QuestionPanel';

export type QuestionProps = {
  name: string;
  questionNumber: number;
  valueType: ValueTypeConfig;
  text: string;
  textLocalizationKey: string;
  validationRules: QuestionValidationRules[];
  tooltip?: string;
  isDisabled?: boolean;
  attachmentsCombination: AttachmentsCombinationType;
};

export const Question: FC<QuestionProps> = (props) => {
  const { t } = useTranslation();
  const {
    name,
    questionNumber,
    text,
    textLocalizationKey,
    valueType,
    tooltip,
    validationRules,
    isDisabled,
    attachmentsCombination,
  } = props;
  const valueName = `${name}.value`;
  const field = fieldsConfig[valueType.__typename];
  const isQuestionRequired = validationRules?.includes('AnswerRequired');
  const textTranslated = t(textLocalizationKey, {
    defaultValue: text,
    ns: NAMESPACES.QuestionnaireTemplate,
  });

  return (
    <Card>
      <div className="flex items-center justify-between">
        <Heading
          className={cx(
            'flex items-center',
            isQuestionRequired &&
              "after:ml-1 after:text-cerise after:content-['*']",
          )}
          variant="h3"
        >
          {t('common.question')} {questionNumber}
          {tooltip && <HelperTooltip>{tooltip}</HelperTooltip>}
        </Heading>
        {field && (
          <QuestionEvaluation
            evaluationCalculation={field.evaluationCalculation}
            name={valueName}
            valueType={valueType}
          />
        )}
      </div>
      <hr className="mb-8 mt-3 bg-secondary-tint-80" />
      <Text className="mb-10" size="lg" variant="bold">
        {textTranslated}
      </Text>
      {field?.render({ ...props, t, name: valueName })}
      <hr className="mb-2 mt-8 bg-secondary-tint-80" />
      <QuestionPanel
        attachmentsCombination={attachmentsCombination}
        canAttachFile={validationRules?.includes('CanAttachFile')}
        field={field}
        isDisabled={isDisabled}
        name={name}
      />
    </Card>
  );
};
