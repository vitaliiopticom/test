import { FC, useEffect } from 'react';
import { unstable_useBlocker as useBlocker } from 'react-router-dom';

import { PromptConfirmModal } from '../PromptConfirmModal/PromptConfirmModal';

import { useFormState } from './Form';

export const FormPrompt: FC = () => {
  const { isDirty, isSubmitSuccessful } = useFormState();
  const blocker = useBlocker(isDirty && !isSubmitSuccessful);
  const isBlocked = blocker.state === 'blocked';

  useEffect(() => {
    if (isBlocked && !isDirty) {
      blocker.reset();
    }
  }, [blocker, isBlocked, isDirty]);

  return (
    <PromptConfirmModal
      isOpen={isBlocked}
      onClose={() => blocker.reset?.()}
      onConfirm={() => blocker.proceed?.()}
    />
  );
};
