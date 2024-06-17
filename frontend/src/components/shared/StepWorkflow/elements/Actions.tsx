import React from 'react';

import { Button } from '@/components/elements';
import { useTranslation } from '@/i18n';

import { FieldValuesType, useFormContext } from '../../Form/Form';
import { StepWorkflowBag, useStepWorkflowContext } from '../StepWorkflow';

type Props<T> = {
  onSave?: (values: T) => void;
  customButtons?: (stepWorkflowBag: StepWorkflowBag) => React.ReactElement;
};

export const Actions = <T extends FieldValuesType>({
  onSave,
  customButtons,
}: Props<T>): React.ReactElement => {
  const stepWorkflowBag = useStepWorkflowContext();
  const { trigger, getValues } = useFormContext<T>();
  const { t } = useTranslation();

  const { isFirstStep, isLastStep, setStepIndex, isSubmitting } =
    stepWorkflowBag;

  const handleBack = () => {
    setStepIndex((index) => index - 1);
  };

  const handleSave = async () => {
    const isValid = await trigger();

    if (isValid) {
      const values = getValues();

      onSave?.(values);
    }
  };

  if (customButtons) {
    return customButtons(stepWorkflowBag);
  }

  return (
    <div className="flex w-full justify-between">
      <Button
        disabled={isSubmitting || isFirstStep}
        variant="secondary"
        onClick={handleBack}
      >
        {t('common.back')}
      </Button>
      <div className="flex gap-4">
        {onSave && (
          <Button
            isLoading={isSubmitting}
            variant="secondary"
            onClick={handleSave}
          >
            {t('common.saveFinishLater')}
          </Button>
        )}
        <Button isLoading={isSubmitting} type="submit">
          {t(isLastStep ? 'common.submit' : 'common.next')}
        </Button>
      </div>
    </div>
  );
};
