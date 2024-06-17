import type { ComponentStoryFn, Meta } from '@storybook/react';

import { Text } from './Text';

export default {
  title: 'Elements/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Text>;

const Template: ComponentStoryFn<typeof Text> = () => {
  return (
    <div className="space-y-6">
      <Text size="lg" variant="bold">
        Text - bold - large
      </Text>
      <Text size="lg" variant="medium">
        Text - semibold - large
      </Text>
      <Text size="lg" variant="normal">
        Text - normal - large
      </Text>

      <Text size="md" variant="bold">
        Text - bold - medium
      </Text>
      <Text size="md" variant="medium">
        Text - semibold - medium
      </Text>
      <Text size="md" variant="normal">
        Text - normal - medium
      </Text>

      <Text size="sm" variant="bold">
        Text - bold - small
      </Text>
      <Text size="sm" variant="medium">
        Text - semibold - small
      </Text>
      <Text size="sm" variant="normal">
        Text - normal - small
      </Text>

      <Text size="xs" variant="normal">
        Text - normal - x-small
      </Text>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
