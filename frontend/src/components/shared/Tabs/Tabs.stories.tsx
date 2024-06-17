import type { Meta, StoryObj } from '@storybook/react';

import { Tabs } from './Tabs';

export default {
  title: 'Shared/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Tabs>;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    tabs: [
      { title: 'Tab1', content: 'content1' },
      { title: 'Tab2', content: 'content2' },
      { title: 'Tab3', content: 'content3' },
      { title: 'Tab4', content: 'content4' },
    ],
  },
};
