import type { ComponentStoryFn, Meta } from '@storybook/react';

import { IconButton } from './IconButton';

export default {
  title: 'Elements/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof IconButton>;

const Template: ComponentStoryFn<typeof IconButton> = (args) => {
  return <IconButton {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  name: 'audit',
  variant: 'primary',
  size: 'md',
  isLoading: false,
  disabled: false,
};
