import type { Meta, StoryFn } from '@storybook/react';

import { Button } from '@/components/elements';
import { useFormValidation } from '@/hooks';
import type { OptionType } from '@/types/form';

import { CheckboxField } from './fields/CheckboxField';
import { CheckboxGroupField } from './fields/CheckboxGroupField';
import { DatePickerField } from './fields/DatePickerField';
import { InputField } from './fields/InputField';
import { PasswordInputField } from './fields/PasswordInputField';
import { PhoneInputField } from './fields/PhoneInputField';
import { RadioField } from './fields/RadioField';
import { SelectField } from './fields/SelectField';
import { SwitchField } from './fields/SwitchField';
import { TagsInputField } from './fields/TagsInputField';
import { TextareaField } from './fields/TextareaField';
import { UploadField } from './fields/UploadField';
import { Form } from './Form';

export default {
  title: 'Shared/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Form>;

const items: OptionType[] = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
  { label: 'Option 5', value: 'option5' },
];

const Template: StoryFn<typeof Form> = (args) => {
  const validation = useFormValidation();

  const schema = validation.schema({
    input: validation.string(),
    phoneInput: validation.phoneNumber(),
    select: validation.string(),
    date: validation.date(false),
    textarea: validation.string(),
    chips: validation.stringArray(1),
  });

  return (
    <Form
      {...args}
      className="m-auto flex w-[500px] flex-col gap-4"
      schema={schema}
      onSubmit={(v) => console.log(v)}
    >
      <InputField label="Input" name="input" isRequired />
      <PhoneInputField label="Phone Input" name="phoneInput" />
      <SelectField label="Select" name="select" options={items} />
      <SwitchField label="Switch" name="switch" />
      <CheckboxField label="Checkbox" name="checkbox" />
      <CheckboxGroupField
        label="Checkbox group"
        name="checkboxGroup"
        options={items}
      />
      <RadioField label="Radio" name="radio" value="radio1" />
      <UploadField label="Upload" name="upload" />
      <DatePickerField label="Date Picker" name="date" />
      <TextareaField label="Textarea" name="textarea" />
      <TagsInputField label="Tags Input" name="chips" />
      <PasswordInputField label="Password Input" name="password" />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export const Default = Template.bind({});
Default.args = {};
