import type { ComponentStoryFn, Meta } from '@storybook/react';

import { Card } from './Card';

export default {
  title: 'Elements/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Card>;

const Template: ComponentStoryFn<typeof Card> = ({ children, ...rest }) => {
  return <Card {...rest}>{children}</Card>;
};

export const Default = Template.bind({});
Default.args = {
  children: 'Card content',
  isInactive: false,
  isSelected: false,
};
