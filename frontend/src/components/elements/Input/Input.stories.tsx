import type { Meta, StoryFn } from '@storybook/react';

import { Input } from './Input';

export default {
  title: 'Elements/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => {
  return <Input {...args} placeholder="Placeholder" />;
};

export const Default = Template.bind({});
Default.args = {
  size: 'md',
  disabled: false,
  isInvalid: false,
  required: false,
};

export const TypeTime = Template.bind({});
TypeTime.args = {
  type: 'time',
};
