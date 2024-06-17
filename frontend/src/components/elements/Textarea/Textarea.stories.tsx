import type { Meta, StoryObj } from '@storybook/react';

import { Textarea } from './Textarea';

export default {
  title: 'Elements/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Textarea>;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    disabled: false,
    required: false,
    placeholder: 'Placeholder',
  },
};
