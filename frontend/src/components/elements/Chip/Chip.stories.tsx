import type { Meta, StoryFn } from '@storybook/react';

import { Chip, ChipColor } from './Chip';

export default {
  title: 'Elements/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Chip>;

const colors: ChipColor[] = [
  'primary',
  'green',
  'amber',
  'orange',
  'red',
  'turquoise',
  'blue',
  'violet',
  'jazzberry',
  'gray',
  'disabled',
  'white',
];

const Template: StoryFn<typeof Chip> = ({ children, ...rest }) => (
  <div className="flex flex-wrap gap-4">
    {colors.map((color) => (
      <Chip key={color} {...rest} color={color}>
        {children}
      </Chip>
    ))}
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: 'Chip',
};

export const StartIcon = Template.bind({});
StartIcon.args = {
  children: 'Chip',
  startIcon: 'search',
};

export const OnClick = Template.bind({});
OnClick.args = {
  children: 'Click',
  onClick: (children, id) => console.log(children, id),
};

export const IsBorder = Template.bind({});
IsBorder.args = {
  children: 'Chip',
  isBorder: true,
  endIcon: 'close',
};

export const EndIcon = Template.bind({});
EndIcon.args = {
  children: 'Chip',
  endIcon: 'close',
};
