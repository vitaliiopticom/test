import type { Meta } from '@storybook/react';
import { StoryFn } from '@storybook/react';

import { ImageCard } from './ImageCard';

export default {
  title: 'Shared/ImageCard',
  component: ImageCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: { onClick: { action: 'clicked' } },
} as Meta<typeof ImageCard>;

const Template: StoryFn<typeof ImageCard> = ({ children, ...rest }) => {
  return <ImageCard {...rest}>{children}</ImageCard>;
};

export const Default = Template.bind({});
Default.args = {
  children: 'Image card content',
};
