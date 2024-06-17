import type { Meta, StoryFn } from '@storybook/react';

import { Switch } from './Switch';

export default {
  title: 'Elements/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Switch>;

const Template: StoryFn<typeof Switch> = (args) => {
  return <Switch {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  disabled: false,
};
