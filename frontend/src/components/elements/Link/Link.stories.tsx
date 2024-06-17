import type { Meta, StoryFn } from '@storybook/react';

import { Link } from './Link';

export default {
  title: 'Elements/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Link>;

const Template: StoryFn<typeof Link> = (args) => {
  return <Link {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  children: 'Link',
  to: '#',
  isExternal: false,
  isDisabled: false,
};
