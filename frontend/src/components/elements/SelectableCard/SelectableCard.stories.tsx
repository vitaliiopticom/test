import type { Meta, StoryObj } from '@storybook/react';

import { SelectableCard } from './SelectableCard';

export default {
  title: 'Elements/SelectableCard',
  component: SelectableCard,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof SelectableCard>;

type Story = StoryObj<typeof SelectableCard>;

export const Default: Story = {
  args: {
    title: 'Template 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu mattis neque, ac consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu mattis neque, ac consequat.',
    isSelected: false,
    buttonLabel: 'Preview',
    onButtonClick: () => console.log('Button clicked'),
  },
};
