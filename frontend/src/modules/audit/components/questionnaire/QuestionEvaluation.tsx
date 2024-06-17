import { FC, useMemo } from 'react';

import { Heading } from '@/components/elements';
import { useWatch } from '@/components/shared';
import { cx } from '@/utils/classNames';

import { ValueTypeConfig } from '../../types';

const getColorClassName = (
  currentEvaluation: number,
  totalEvaluation: number,
) => {
  if (currentEvaluation === 0) return 'text-cerise';
  if (currentEvaluation > 0 && currentEvaluation < totalEvaluation)
    return 'text-buttercup';

  return 'text-jade';
};

export type EvaluationCalculation = (props: {
  value: any;
  valueType: ValueTypeConfig;
}) => {
  currentEvaluation: number;
  totalEvaluation: number;
};

type Props = {
  name: string;
  valueType: ValueTypeConfig;
  evaluationCalculation?: EvaluationCalculation;
};

export const QuestionEvaluation: FC<Props> = ({
  name,
  evaluationCalculation,
  valueType,
}) => {
  const field = useWatch({ name });

  const { totalEvaluation, currentEvaluation } = useMemo(() => {
    if (!evaluationCalculation)
      return { totalEvaluation: 0, currentEvaluation: 0 };

    return evaluationCalculation({ value: field, valueType });
  }, [field, evaluationCalculation, valueType]);

  if (totalEvaluation === 0) return null;

  return (
    <Heading
      className={cx(getColorClassName(currentEvaluation, totalEvaluation))}
      translate="no"
      variant="h4"
    >
      {currentEvaluation} / {totalEvaluation}
    </Heading>
  );
};
