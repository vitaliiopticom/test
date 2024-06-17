import { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { ToggleButton, ToggleButtonOption } from './ToggleButton';

export default {
  title: 'Elements/ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof ToggleButton>;

const Template: StoryFn<typeof ToggleButton> = (args) => {
  const [selectedValue, setSelectedValue] = useState<string>();

  return (
    <ToggleButton
      options={args.options}
      value={selectedValue}
      onChange={setSelectedValue}
    />
  );
};

export const Default = Template.bind({});

const options: ToggleButtonOption[] = [
  { icon: 'list', value: 'list' },
  { icon: 'grid', value: 'grid' },
  { icon: 'arrowDown', value: 'arrowDown', disabled: true },
  { icon: 'arrowRight', value: 'arrowRight', disabled: true },
];

Default.args = {
  options,
};
