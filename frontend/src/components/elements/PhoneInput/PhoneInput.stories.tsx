import { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { PhoneInput } from './PhoneInput';

export default {
  title: 'Elements/PhoneInput',
  component: PhoneInput,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof PhoneInput>;

const Template: StoryFn<typeof PhoneInput> = (args) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  return <PhoneInput {...args} value={phoneNumber} onChange={setPhoneNumber} />;
};

export const Default = Template.bind({});
Default.args = {
  size: 'md',
  disabled: false,
  isInvalid: false,
  required: false,
};
