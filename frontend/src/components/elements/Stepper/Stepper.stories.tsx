import type { Meta, StoryFn } from '@storybook/react';

import { Stepper } from './Stepper';

export default {
  title: 'Elements/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Stepper>;

const Template: StoryFn<typeof Stepper> = (args) => {
  return <Stepper {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  currentStepIndex: 2,
  numberOfSteps: 5,
};
