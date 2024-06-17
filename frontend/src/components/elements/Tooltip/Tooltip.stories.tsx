import type { Meta, StoryFn } from '@storybook/react';

import { Button } from '../Button/Button';

import { Tooltip } from './Tooltip';

export default {
  title: 'Elements/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Tooltip>;

const Template: StoryFn<typeof Tooltip> = ({ content, ...args }) => {
  return (
    <Tooltip {...args} content={content}>
      <Button variant="secondary">Reference element</Button>
    </Tooltip>
  );
};

export const Default = Template.bind({});
Default.args = {
  content: 'Content',
};

export const NodeContent = Template.bind({});
NodeContent.args = {
  contentWrapperAs: 'div',
  content: (
    <div>
      <div>title</div>
      <div>some component</div>
    </div>
  ),
};
