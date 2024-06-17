import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { config } from '../Chip/Chip';
import { sizes } from '../Input/Input';

import { TagsInput } from './TagsInput';

export default {
  title: 'Elements/TagsInput',
  component: TagsInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      options: Object.keys(sizes),
      control: { type: 'select' },
    },
    color: {
      options: Object.keys(config),
      control: { type: 'select' },
    },
  },
} as Meta<typeof TagsInput>;

const Template: StoryFn<typeof TagsInput> = ({ ...props }) => {
  const [value, setValue] = useState<string[]>([]);

  return (
    <div className="w-[350px]">
      <TagsInput {...props} value={value} onChange={setValue} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  isInvalid: false,
  color: 'jazzberry',
  size: 'md',
  required: false,
};
