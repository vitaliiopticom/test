import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { useFormValidation } from '@/hooks';

import { InputField } from '../Form';

import { StepWorkflow, WorkflowStep } from './StepWorkflow';

export default {
  title: 'Shared/StepWorkflow',
  component: StepWorkflow,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof StepWorkflow>;

type FormFields = {
  firstName: string;
  lastName: string;
  age: string;
  job: string;
  address: string;
};

const defaultValues: FormFields = {
  firstName: 'John',
  lastName: 'Doe',
  age: '30',
  job: '',
  address: '',
};

const Template: StoryFn<typeof StepWorkflow> = (args) => {
  const formValidation = useFormValidation();

  const steps: WorkflowStep[] = [
    {
      title: 'First & Last name',
      subtitle: 'Contract for Audi',
      component: () => (
        <>
          <InputField label="First Name" name="firstName" />
          <InputField label="Last Name" name="lastName" />
        </>
      ),
      schema: formValidation.schema<Pick<FormFields, 'firstName' | 'lastName'>>(
        {
          firstName: formValidation.string(false),
          lastName: formValidation.string(false),
        },
      ),
    },
    {
      title: 'Age & Job',
      subtitle: 'Contract for Audi',
      component: () => (
        <>
          <InputField label="Age" name="age" />
          <InputField label="Job" name="job" />
        </>
      ),
      schema: formValidation.schema<Pick<FormFields, 'age' | 'job'>>({
        age: formValidation.string(false),
        job: formValidation.string(false),
      }),
    },
    {
      title: 'Address',
      subtitle: 'Contract for Audi',
      component: () => (
        <>
          <InputField label="Address" name="address" />
        </>
      ),
      schema: formValidation.schema<Pick<FormFields, 'address'>>({
        address: formValidation.string(false),
      }),
    },
  ];

  const handleSubmit = (values: FormFields) => {
    console.log(values);
  };

  const handleSave = (values: FormFields) => {
    console.log(values);
  };

  const handleBack = () => {
    console.log('back');
  };

  return (
    <StepWorkflow
      {...args}
      defaultValues={defaultValues}
      steps={steps}
      onSubmit={handleSubmit}
    >
      <StepWorkflow.Header onBack={handleBack} />
      <div className="flex h-80 w-full flex-col gap-4">
        <div className="grow">
          <StepWorkflow.Content className="mt-4 grid grid-cols-4 gap-4" />
        </div>
        <StepWorkflow.Actions onSave={handleSave} />
      </div>
    </StepWorkflow>
  );
};

export const Default = Template.bind({});
Default.args = {
  shouldSubmitAllValues: true,
  submitOnNext: true,
};
