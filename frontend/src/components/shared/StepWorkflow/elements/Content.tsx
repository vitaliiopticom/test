import React from 'react';

import { cx } from '@/utils/classNames';

import { useStepWorkflowContext } from '../StepWorkflow';

type Props = {
  className?: string;
};

export const Content: React.FC<Props> = ({ className }) => {
  const { steps, ...workflowBag } = useStepWorkflowContext();

  return (
    <>
      {steps.map((step, index) => (
        <div
          key={index}
          className={cx([
            workflowBag.currentStepIndex !== index && 'hidden',
            className,
          ])}
        >
          {step.component(workflowBag)}
        </div>
      ))}
    </>
  );
};
