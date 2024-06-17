import { FC, useMemo } from 'react';

import { cx } from '@/utils/classNames';

import { AuditQuestion, FormMethods } from '../../types';

import { fieldsConfig } from './fieldsConfig';

type Props = {
  formMethods: FormMethods;
  questions: AuditQuestion[];
};

export const QuestionnaireHeaderTabChip: FC<Props> = ({
  formMethods,
  questions,
}) => {
  const questionsTypeNames = useMemo(
    () => questions.map((question) => question.valueType.__typename),
    [questions],
  );
  const questionsIds = useMemo(
    () => questions.map((question) => question.id),
    [questions],
  );
  const questionsLength = questionsIds.length;
  const newAnswers = formMethods.watch(questionsIds);

  const answersLength = useMemo(() => {
    if (newAnswers[0]) {
      let newAnswersLength = 0;

      newAnswers.forEach((answer, index) => {
        if (answer) {
          const isNotEmpty = !fieldsConfig[questionsTypeNames[index]].isEmpty(
            answer.value,
            answer.attachments,
          );

          if (isNotEmpty) {
            newAnswersLength += 1;
          }
        }
      });

      return newAnswersLength;
    }

    return 0;
  }, [newAnswers, questionsTypeNames]);

  const setChipColor = () => {
    if (!questionsLength || answersLength === 0) {
      return 'bg-gray-30';
    }

    if (answersLength === questionsLength) {
      return 'bg-jade-tint-10  text-secondary';
    }

    return 'bg-buttercup-tint-10  text-secondary';
  };

  return (
    <div
      className={cx(
        'h-6 w-[50px] rounded-xl pt-[2px] text-center text-sm font-semibold text-gray-80',
        setChipColor(),
      )}
    >
      {answersLength}/{questionsLength}
    </div>
  );
};
