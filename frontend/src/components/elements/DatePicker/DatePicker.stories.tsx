import { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { DatePicker, DatePickerValueType } from './DatePicker';

export default {
  title: 'Elements/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof DatePicker>;

const Template: StoryFn<typeof DatePicker> = (args) => {
  const [value, setValue] = useState<DatePickerValueType>();

  return <DatePicker {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {};
