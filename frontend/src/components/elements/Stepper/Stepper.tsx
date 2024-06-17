import React from 'react';

import { cx } from '@/utils/classNames';

type Props = {
  numberOfSteps: number;
  currentStepIndex: number;
};

export const Stepper: React.FC<Props> = ({
  numberOfSteps,
  currentStepIndex,
}) => {
  const steps = Array(numberOfSteps).fill(0);

  return (
    <div className="flex">
      {steps.map((_, index) => {
        let stepColor;

        if (currentStepIndex < index) {
          stepColor = 'bg-gray-70';
        }
        if (currentStepIndex === index) {
          stepColor = 'bg-primary-tint-10';
        }
        if (currentStepIndex > index) {
          stepColor = 'bg-primary-tint-60';
        }

        return (
          <div key={index} className="flex items-center">
            <div
              className={cx([
                stepColor,
                currentStepIndex === index &&
                  'ring-2 ring-primary-tint-10 ring-offset-4',
                'flex h-10 w-10 items-center justify-center rounded-full text-2xl font-bold text-white',
              ])}
            >
              {index + 1}
            </div>
            {index !== steps.length - 1 && (
              <div className="z-background h-0.5 w-10 bg-gray-70" />
            )}
          </div>
        );
      })}
    </div>
  );
};
