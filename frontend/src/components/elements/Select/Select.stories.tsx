import { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { OptionType } from '@/types/form';

import { Select } from './Select';

export default {
  title: 'Elements/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Select>;

const items: OptionType[] = [
  {
    label: 'Option 1 some super long option that can never fit in the box',
    value: 'option1',
  },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
  { label: 'Option 5', value: 'option5' },
];

const Template: StoryFn<typeof Select> = (args) => {
  const [valueSingle, setValueSingle] = useState<string | null>(null);
  const [valueMultiple, setValueMultiple] = useState<string[]>([]);

  return (
    <div className="w-72">
      <Select
        {...args}
        name="testName"
        options={items}
        value={args.isMultiple ? valueMultiple : valueSingle}
        onChange={args.isMultiple ? setValueMultiple : (setValueSingle as any)}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  isMultiple: false,
  required: false,
};
