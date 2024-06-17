import type { Meta, StoryFn } from '@storybook/react';

import { Separator } from './Separator';

export default {
  title: 'Elements/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Separator>;

const Template: StoryFn<typeof Separator> = (args) => {
  return (
    <div className="w-[300px]">
      <Separator text="This is separator" {...args} />
    </div>
  );
};

export const Default = Template.bind({});

export const IsSecondary = Template.bind({});
IsSecondary.args = {
  isSecondary: true,
};
