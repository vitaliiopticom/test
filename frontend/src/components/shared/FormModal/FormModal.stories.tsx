import type { Meta, StoryFn } from '@storybook/react';

import { Button } from '@/components/elements';
import { useDisclosure, useFormValidation } from '@/hooks';

import { InputField } from '../Form';

import { FormModal } from './FormModal';

export default {
  title: 'Shared/FormModal',
  component: FormModal,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof FormModal>;

const Template: StoryFn<typeof FormModal> = (args) => {
  const modal = useDisclosure();
  const validation = useFormValidation();

  const schema = validation.schema({
    firstName: validation.string(),
    lastName: validation.string(),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
  };

  return (
    <>
      <Button onClick={() => modal.setOpen(true)}>Open form modal</Button>
      <FormModal
        {...args}
        className="m-auto flex w-[500px] flex-col gap-4"
        defaultValues={defaultValues}
        isOpen={modal.isOpen}
        schema={schema}
        title="Form modal"
        onClose={modal.onClose}
        onSubmit={(v) => console.log(v)}
      >
        <div className="flex flex-wrap-reverse gap-x-16">
          <InputField label="Name" name="firstName" />
          <InputField label="Name" name="lastName" />
        </div>
      </FormModal>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
