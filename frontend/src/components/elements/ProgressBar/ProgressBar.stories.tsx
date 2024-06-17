import type { Meta, StoryFn } from '@storybook/react';

import { ProgressBar } from './ProgressBar';

export default {
  title: 'Elements/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof ProgressBar>;

const progressSteps = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const Template: StoryFn<typeof ProgressBar> = ({ className }) => (
  <div className="flex flex-wrap gap-4">
    {progressSteps.map((step) => (
      <ProgressBar key={step} className={className} progress={step} />
    ))}
  </div>
);

export const Default = Template.bind({});
