import type { Meta, StoryObj } from '@storybook/react';

import { Icon, IconName } from './Icon';
import { icons } from './icons';

export default {
  title: 'Elements/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Icon>;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {},
  render: () => (
    <div className="flex flex-wrap gap-4 text-secondary">
      {Object.keys(icons).map((icon) => (
        <div
          key={icon}
          className="rounded-md border border-gray-30 p-4 text-secondary"
        >
          <Icon className="h-5 w-5" name={icon as IconName} />
        </div>
      ))}
    </div>
  ),
};
