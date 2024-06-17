import type { ReactNode } from 'react';

import {
  CheckboxGroupField,
  DatePickerField,
  InputField,
  RadioGroupField,
} from '@/components/shared';
import type { TFunction } from '@/i18n';
import { NAMESPACES } from '@/i18n';
import type { UploadFile } from '@/types/file';
import { sum } from '@/utils/array';
import { formatDateToAPI, parseDate } from '@/utils/date';
import { parseNumber } from '@/utils/numbers';

import {
  AnswerValue,
  AuditQuestionnaireFormValue,
  ValueTypeName,
} from '../../types';

import { AnswerWrapper } from './AnswerWrapper';
import type { QuestionProps } from './Question';
import type { EvaluationCalculation } from './QuestionEvaluation';

export type FieldConfig = {
  render: (props: QuestionProps & { t: TFunction }) => ReactNode;
  saveValueTransform: (
    value: AnswerValue,
    field: AuditQuestionnaireFormValue,
  ) => AnswerValue | null;
  defaultValue: AnswerValue;
  isEmpty: (value: AnswerValue, attachments?: UploadFile[]) => boolean;
  enableAttachmentsOnStart?: boolean;
  answerToValueTransform?: (answer: AnswerValue) => AnswerValue;
  evaluationCalculation?: EvaluationCalculation;
};

const isAuditFieldEmpty = (value: AnswerValue, defaultValue: AnswerValue) => {
  if (typeof value === 'undefined') {
    return true;
  }

  if (Array.isArray(value) && !value.length) {
    return true;
  }

  return value === defaultValue;
};

export const fieldsConfig: Record<ValueTypeName, FieldConfig> = {
  YesNoOption: {
    render: ({ name, valueType, t, isDisabled }) => {
      const options = [
        {
          label: t('common.yes'),
          value: 'true',
          evaluation: valueType.pointsForTrue ? valueType.evaluation : 0,
          isDisabled,
        },
        {
          label: t('common.no'),
          value: 'false',
          evaluation: !valueType.pointsForTrue ? valueType.evaluation : 0,
          isDisabled,
        },
      ];

      return (
        <RadioGroupField
          className="text-secondary-tint-50"
          name={name}
          options={options}
          render={(item, node) => (
            <AnswerWrapper
              key={item.value}
              evaluation={(item as any).evaluation}
            >
              {node}
            </AnswerWrapper>
          )}
          isVertical
        />
      );
    },
    evaluationCalculation: ({ value, valueType }) => {
      const totalEvaluation = valueType.evaluation;

      if (valueType.pointsForTrue) {
        return {
          totalEvaluation,
          currentEvaluation: value === 'true' ? valueType.evaluation : 0,
        };
      }

      return {
        totalEvaluation,
        currentEvaluation: value === 'false' ? valueType.evaluation : 0,
      };
    },
    saveValueTransform: (value) => {
      if (value === 'true') return true;
      if (value === 'false') return false;
      return null;
    },
    answerToValueTransform: (value) => {
      if (value === true) return 'true';
      if (value === false) return 'false';
      return '';
    },
    defaultValue: '',
    isEmpty: function (value) {
      return isAuditFieldEmpty(value, this.defaultValue);
    },
  },
  TextValue: {
    render: ({ name, isDisabled }) => (
      <InputField disabled={isDisabled} name={name} />
    ),
    saveValueTransform: (value) => value || null,
    answerToValueTransform: (answer) => answer || '',
    defaultValue: '',
    isEmpty: function (value) {
      return isAuditFieldEmpty(value, this.defaultValue);
    },
  },
  DateTimeValue: {
    render: ({ name, isDisabled }) => (
      <DatePickerField
        className="max-w-[300px]"
        isDisabled={isDisabled}
        name={name}
        includeTime
      />
    ),
    saveValueTransform: (value) => formatDateToAPI(value) || null,
    answerToValueTransform: (value) => parseDate(value),
    defaultValue: null,
    isEmpty: function (value) {
      return isAuditFieldEmpty(value, this.defaultValue);
    },
  },
  NumberValue: {
    render: ({ name, isDisabled }) => (
      <InputField disabled={isDisabled} name={name} type="number" />
    ),
    saveValueTransform: (value) => parseNumber(value),
    defaultValue: '',
    isEmpty: function (value) {
      return isAuditFieldEmpty(value, this.defaultValue);
    },
  },
  SingleSelectOption: {
    render: ({ name, valueType, isDisabled, t }) => (
      <RadioGroupField
        className="text-secondary-tint-50"
        name={name}
        options={valueType.options.map((item) => ({
          ...item,
          value: item.id,
          tooltip: t(item.popupDescriptionLocalizationKey, {
            defaultValue: item.popupDescription,
            ns: NAMESPACES.QuestionnaireTemplate,
          }),
          label: t(item.labelLocalizationKey, {
            defaultValue: item.label,
            ns: NAMESPACES.QuestionnaireTemplate,
          }),
          isDisabled,
        }))}
        render={(item, node) => (
          <AnswerWrapper key={item.value} evaluation={(item as any).evaluation}>
            {node}
          </AnswerWrapper>
        )}
        isVertical
      />
    ),
    evaluationCalculation: ({ value, valueType }) => {
      const totalEvaluation = valueType.options.reduce((acc, item) => {
        return item.evaluation > acc ? item.evaluation : acc;
      }, 0);

      const currentEvaluation =
        valueType.options.find((item) => item.id === value)?.evaluation ?? 0;

      return { totalEvaluation, currentEvaluation };
    },
    saveValueTransform: (value) => value || null,
    defaultValue: '',
    isEmpty: function (value) {
      return isAuditFieldEmpty(value, this.defaultValue);
    },
  },
  MultiSelectOption: {
    render: ({ name, valueType, isDisabled, t }) => (
      <CheckboxGroupField
        className="text-secondary-tint-50"
        name={name}
        options={valueType.options.map((item) => ({
          ...item,
          value: item.id,
          tooltip: t(item.popupDescriptionLocalizationKey, {
            defaultValue: item.popupDescription,
            ns: NAMESPACES.QuestionnaireTemplate,
          }),
          isDisabled,
          label: t(item.labelLocalizationKey, {
            defaultValue: item.label,
            ns: NAMESPACES.QuestionnaireTemplate,
          }),
        }))}
        render={(item, node) => (
          <AnswerWrapper key={item.value} evaluation={(item as any).evaluation}>
            {node}
          </AnswerWrapper>
        )}
        isVertical
      />
    ),
    evaluationCalculation: ({ value, valueType }) => {
      const totalEvaluation = sum(valueType.options, (item) => item.evaluation);
      const currentEvaluation = sum(
        valueType.options.filter((item) => value?.includes(item.id)),
        (item) => item.evaluation,
      );

      return { totalEvaluation, currentEvaluation };
    },
    saveValueTransform: (value) => (value?.length ? value : null),
    defaultValue: [],
    isEmpty: function (value) {
      return isAuditFieldEmpty(value, this.defaultValue);
    },
  },
  DropDownOption: {
    render: () => (
      <div className="text-lg text-cerise">
        DROPDOWN OPTION - not supported yet
      </div>
    ),
    saveValueTransform: () => null,
    defaultValue: '',
    isEmpty: function (value) {
      return isAuditFieldEmpty(value, this.defaultValue);
    },
  },
  EmptyValue: {
    render: () => null,
    saveValueTransform: (_, field) => (!!field.attachments?.length ? '' : null),
    defaultValue: [],
    enableAttachmentsOnStart: true,
    isEmpty: function (_, attachments) {
      return isAuditFieldEmpty(attachments, this.defaultValue);
    },
  },
};
