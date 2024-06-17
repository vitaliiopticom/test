import type { Meta, StoryObj } from '@storybook/react';

import { VideoPlayer } from './VideoPlayer';

export default {
  title: 'Elements/VideoPlayer',
  component: VideoPlayer,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof VideoPlayer>;

type Story = StoryObj<typeof VideoPlayer>;

export const Default: Story = {
  args: {
    sources: [
      {
        src: 'https://www.notvalidlink.sk/ssss',
        type: 'mp4',
      },
    ],
    fallbackMessage: (
      <span className="text-cerise">Video file cannot be loaded!</span>
    ),
    controls: true,
  },
};
