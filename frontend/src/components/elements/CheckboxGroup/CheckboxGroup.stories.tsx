import { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import type { OptionType } from '@/types/form';

import { CheckboxGroup } from './CheckboxGroup';

export default {
  title: 'Elements/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof CheckboxGroup>;

const items: OptionType[] = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
  { label: 'Option 5', value: 'option5' },
];

const Template: StoryFn<typeof CheckboxGroup> = (args) => {
  const [value, setValue] = useState<string[]>([]);

  return (
    <CheckboxGroup
      {...args}
      options={items}
      value={value}
      onChange={setValue}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  isVertical: false,
};
