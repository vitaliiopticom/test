import React from 'react';

import { Heading, IconButton, Stepper } from '@/components/elements';
import { cx } from '@/utils/classNames';

import { useStepWorkflowContext } from '../StepWorkflow';

type Props = {
  onBack?: () => void;
};

export const Header: React.FC<Props> = ({ onBack }) => {
  const { currentStepIndex, stepsLength, steps } = useStepWorkflowContext();
  const { title, subtitle } = steps[currentStepIndex];

  return (
    <div className="flex w-auto flex-col items-center justify-between border-b py-2 pr-8 sm:flex-col md:flex-row">
      <div className="mb-4 md:mb-0">
        <div className={cx(!onBack && 'pl-8', 'mb-2 flex items-center')}>
          {onBack && (
            <IconButton
              name="arrowLeft"
              size="sm"
              variant="ghost"
              onClick={onBack}
            />
          )}
          <Heading variant="h2">
            Step {currentStepIndex + 1}: {title}
          </Heading>
        </div>
        {subtitle && <div className="ml-8 font-bold">{subtitle}</div>}
      </div>

      <Stepper
        currentStepIndex={currentStepIndex}
        numberOfSteps={stepsLength}
      />
    </div>
  );
};
