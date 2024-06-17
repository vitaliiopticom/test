import type { Meta, StoryFn } from '@storybook/react';

import { Image } from './Image';

export default {
  title: 'Elements/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Image>;

const Template: StoryFn<typeof Image> = (args) => {
  return <Image {...args} alt="login" src="/images/background-login.webp" />;
};

export const Default = Template.bind({});
Default.args = {
  width: 400,
};
