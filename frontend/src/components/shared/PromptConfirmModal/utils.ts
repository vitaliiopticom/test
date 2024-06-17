import { getNumOfDiff } from '@/utils/object';

import { FieldValuesType, FormDefaultValues, UseFormReturn } from '../Form';

export const handleProceedWithPrompt = <T extends FieldValuesType>(
  formMethods: UseFormReturn<T, any>,
  onOpen: () => void,
  onClose: () => void,
  defaultValues?: FormDefaultValues<T>,
): void => {
  const { isDirty, isSubmitSuccessful } = formMethods?.formState;
  const isValuesDiff = defaultValues
    ? getNumOfDiff(formMethods.getValues(), defaultValues as T)
    : false;
  const isBlocked = (isDirty || isValuesDiff) && !isSubmitSuccessful;

  isBlocked ? onOpen() : onClose();
};
