import type { Meta, StoryObj } from '@storybook/react';

import { Skeleton } from './Skeleton';

export default {
  title: 'Elements/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Skeleton>;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    className: 'h-4 w-20',
  },
};
