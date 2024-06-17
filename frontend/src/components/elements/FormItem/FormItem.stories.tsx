import type { ComponentStoryFn, Meta } from '@storybook/react';

import { Input } from '../Input/Input';

import { FormItem } from './FormItem';

export default {
  title: 'Elements/FormItem',
  component: FormItem,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof FormItem>;

const Template: ComponentStoryFn<typeof FormItem> = (args) => {
  return (
    <FormItem {...args} id="example-input">
      <Input id="example-input" isInvalid={args.isInvalid} />
    </FormItem>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Label',
  isInvalid: false,
  helperText: '',
};
