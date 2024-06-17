import type { Meta, StoryFn } from '@storybook/react';

import { StarRating } from './StarRating';

export default {
  title: 'Elements/StarRating',
  component: StarRating,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof StarRating>;

const ratings = [undefined, 0.2, 0.4, 0.9, 1.6, 1.9, 2.3, 3, 3.4, 4.1, 4, 5.0];

const Template: StoryFn<typeof StarRating> = ({ iconSize }) => {
  return (
    <div className="flex flex-col gap-4">
      {ratings.map((rating) => (
        <StarRating key={`${rating}`} iconSize={iconSize} rating={rating} />
      ))}
    </div>
  );
};

export const Default = Template.bind({});

export const IconSizeSm = Template.bind({});
IconSizeSm.args = {
  iconSize: 'sm',
};

export const IconSizeMd = Template.bind({});
IconSizeMd.args = {
  iconSize: 'md',
};
