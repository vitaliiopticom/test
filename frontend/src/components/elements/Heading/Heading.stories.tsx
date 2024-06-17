import type { ComponentStoryFn, Meta } from '@storybook/react';

import { Heading } from './Heading';

export default {
  title: 'Elements/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Heading>;

const Template: ComponentStoryFn<typeof Heading> = () => {
  return (
    <div className="space-y-6">
      <Heading variant="h1">Headline 1</Heading>
      <Heading variant="h2">Headline 2</Heading>
      <Heading variant="h3">Headline 3</Heading>
      <Heading variant="h4">Headline 4</Heading>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
