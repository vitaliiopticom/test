import type { Meta, StoryFn } from '@storybook/react';

import { Checkbox } from './Checkbox';

export default {
  title: 'Elements/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = (args) => {
  return <Checkbox {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  disabled: false,
};
