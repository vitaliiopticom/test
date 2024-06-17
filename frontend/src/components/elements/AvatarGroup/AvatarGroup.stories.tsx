import type { Meta, StoryFn } from '@storybook/react';

import { AvatarGroup, AvatarType } from './AvatarGroup';

export default {
  title: 'Elements/AvatarGroup',
  component: AvatarGroup,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof AvatarGroup>;

const items: AvatarType[] = [
  {
    imgUrl: 'https://pbs.twimg.com/media/EiPOzFkXsAA13f0.jpg',
    name: 'Gandalf Grey',
  },
  {
    imgUrl: 'https://pbs.twimg.com/media/EiPOzFkXsAA13f0.jpg',
    name: 'Gandalf Grey',
  },
  {
    imgUrl: 'https://pbs.twimg.com/media/EiPOzFkXsAA13f0.jpg',
    name: 'Gandalf Grey',
  },
  {
    imgUrl: 'https://pbs.twimg.com/media/EiPOzFkXsAA13f0.jpg',
    name: 'Gandalf Grey',
  },
  {
    imgUrl: 'https://pbs.twimg.com/media/EiPOzFkXsAA13f0.jpg',
    name: 'Gandalf Grey',
  },
  {
    imgUrl: 'https://pbs.twimg.com/media/EiPOzFkXsAA13f0.jpg',
    name: 'Gandalf Grey',
  },
];

const Template: StoryFn<typeof AvatarGroup> = (args) => {
  return <AvatarGroup {...args} avatars={items} />;
};

export const Default = Template.bind({});
Default.args = {
  maxCount: 3,
};
