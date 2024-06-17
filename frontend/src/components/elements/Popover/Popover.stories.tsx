import type { Meta, StoryFn } from '@storybook/react';

import { Button } from '../Button/Button';
import { Popover } from '../Popover/Popover';

export default {
  title: 'Elements/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Popover>;

const Template: StoryFn<typeof Popover> = () => {
  return (
    <div>
      <Popover
        trigger={
          <Button size="sm" variant="secondary">
            Show Popover
          </Button>
        }
      >
        <div className="w-[200px] border">content</div>
      </Popover>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
