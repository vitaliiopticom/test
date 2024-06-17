import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './Avatar';

export default {
  title: 'Elements/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Avatar>;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    imgUrl: 'https://pbs.twimg.com/media/EiPOzFkXsAA13f0.jpg',
    name: 'Gandalf the Grey',
    alt: 'Gandalf the Grey',
    size: 'md',
    tooltip: 'Gandalf the Grey',
  },
};
