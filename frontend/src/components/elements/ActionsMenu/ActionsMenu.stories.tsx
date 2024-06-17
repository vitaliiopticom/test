import type { Meta, StoryFn } from '@storybook/react';

import { routes } from '@/router/routesList';

import { ActionMenuItemProps, ActionsMenu } from './ActionsMenu';

export default {
  title: 'Elements/ActionsMenu',
  component: ActionsMenu,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof ActionsMenu>;

const items: ActionMenuItemProps[] = [
  {
    label: 'onClick',
    onClick: () => console.log('action 1'),
  },
  {
    label: 'onClick disabled',
    onClick: () => console.log('action 2'),
    isDisabled: true,
  },
  {
    label: 'internal link - companies',
    to: routes.companies(),
  },
  {
    label: 'external link - google',
    to: 'https://www.google.com/',
    isExternal: true,
    isDisabled: true,
  },
];

const Template: StoryFn<typeof ActionsMenu> = () => {
  return <ActionsMenu items={items} />;
};

export const Default = Template.bind({});
Default.args = {};
