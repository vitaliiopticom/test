import type { Meta, StoryObj } from '@storybook/react';

import { IconThumbnail } from './IconThumbnail';

export default {
  title: 'Elements/IconThumbnail',
  component: IconThumbnail,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof IconThumbnail>;

type Story = StoryObj<typeof IconThumbnail>;

export const Default: Story = {
  args: {
    src: '/images/background-login.webp',
    iconName: 'play',
    iconBgSize: 'sm',
    iconBgVariant: 'roundedFull',
  },
};
