import { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { PasswordInput } from './PasswordInput';

export default {
  title: 'Elements/PasswordInput',
  component: PasswordInput,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof PasswordInput>;
const Template: StoryFn<typeof PasswordInput> = (args) => {
  const [value, setValue] = useState('');
  return (
    <PasswordInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...args}
      placeholder="Placeholder"
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  size: 'md',
  disabled: false,
  isInvalid: false,
  required: false,
};
