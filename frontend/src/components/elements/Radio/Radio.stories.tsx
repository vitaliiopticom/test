import type { ComponentStoryFn, Meta } from '@storybook/react';

import { Radio } from './Radio';

export default {
  title: 'Elements/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Radio>;

const Template: ComponentStoryFn<typeof Radio> = (args) => {
  return <Radio {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  disabled: false,
};
