import type { Meta, StoryFn } from '@storybook/react';

import { Timer } from './Timer';

export default {
  title: 'Elements/Timer',
  component: Timer,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Timer>;

const progressSteps = [undefined, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const Template: StoryFn<typeof Timer> = ({ children, ...rest }) => (
  <div className="flex flex-wrap gap-4">
    {progressSteps.map((step, index) => (
      <Timer key={index} {...rest} percentLeft={step}>
        {children}
      </Timer>
    ))}
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: 'Timer',
};

export const OnClick = Template.bind({});
OnClick.args = {
  children: 'Click',
  onClick: (children, id) => console.log(children, id),
};
