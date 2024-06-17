import React, {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { usePrevious } from '@/hooks/usePrevious';

import {
  DeepPartialType,
  FieldValuesType,
  Form,
  useForm,
  ZodSchemaType,
} from '../Form/Form';

import { Actions } from './elements/Actions';
import { Content } from './elements/Content';
import { Header } from './elements/Header';

export type StepWorkflowBag = {
  currentStepIndex: number;
  prevStepIndex?: number;
  setStepIndex: React.Dispatch<React.SetStateAction<number>>;
  stepsLength: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  isSubmitting?: boolean;
};

export type WorkflowStep = {
  component: (props: StepWorkflowBag) => React.ReactNode;
  schema?: ZodSchemaType;
  title?: string;
  subtitle?: string;
};

export type Props<T extends FieldValuesType> = PropsWithChildren<{
  defaultValues?: DeepPartialType<T>;
  steps: WorkflowStep[];
  onSubmit: (values: T, stepComponentBag: StepWorkflowBag) => void;
  initialStepIndex?: number;
  isSubmitting?: boolean;
  submitOnNext?: boolean;
  id?: string;
  shouldSubmitAllValues?: boolean;
}>;

type Components = {
  Content: typeof Content;
  Actions: typeof Actions;
  Header: typeof Header;
};

export const StepWorkflowContext = createContext<
  { steps: WorkflowStep[] } & StepWorkflowBag
>({
  isFirstStep: true,
  isLastStep: false,
  stepsLength: 0,
  currentStepIndex: 0,
  isSubmitting: false,
  steps: [],
  setStepIndex: () => {},
});

export const useStepWorkflowContext = () => useContext(StepWorkflowContext);

export function StepWorkflow<T extends object>({
  steps,
  initialStepIndex = 0,
  isSubmitting,
  defaultValues,
  onSubmit,
  submitOnNext,
  shouldSubmitAllValues,
  children,
  id,
}: Props<T>): ReactElement<Props<T> & Components> {
  const [currentStepIndex, setStepIndex] = useState<number>(initialStepIndex);
  const prevStepIndex = usePrevious(currentStepIndex);

  const schema = steps[currentStepIndex].schema;
  const formMethods = useForm<T>({ schema, mode: 'onChange', defaultValues });

  const stepWorkflowBag = useMemo(
    () => ({
      isFirstStep: currentStepIndex === 0,
      isLastStep: currentStepIndex === steps.length - 1,
      currentStepIndex,
      prevStepIndex,
      setStepIndex,
      stepsLength: steps.length,
      isSubmitting,
    }),
    [prevStepIndex, currentStepIndex, steps.length, isSubmitting],
  );

  const handleSubmit = (values: T) => {
    const { isLastStep } = stepWorkflowBag;
    const submitValues = shouldSubmitAllValues
      ? formMethods.getValues()
      : values;

    if (isLastStep) {
      onSubmit(submitValues, stepWorkflowBag);
    } else {
      setStepIndex((index) => index + 1);

      if (submitOnNext) {
        onSubmit(submitValues, stepWorkflowBag);
      }
    }
  };

  useEffect(() => {
    if (initialStepIndex) {
      setStepIndex(initialStepIndex);
    }
  }, [initialStepIndex]);

  return (
    <Form formMethods={formMethods} id={id} onSubmit={handleSubmit}>
      <StepWorkflowContext.Provider value={{ steps, ...stepWorkflowBag }}>
        {children}
      </StepWorkflowContext.Provider>
    </Form>
  );
}

StepWorkflow.Actions = Actions;
StepWorkflow.Content = Content;
StepWorkflow.Header = Header;
