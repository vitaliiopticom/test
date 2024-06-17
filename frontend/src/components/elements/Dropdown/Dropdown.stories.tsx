import type { ComponentStoryFn, Meta } from '@storybook/react';

import { Button } from '../Button/Button';

import { Dropdown } from './Dropdown';

export default {
  title: 'Elements/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Dropdown>;

const items = [
  {
    label: 'Option 1',
  },
  {
    label: 'Option 2',
  },
  {
    label: 'Option 3',
  },
];

const Template: ComponentStoryFn<typeof Dropdown> = () => {
  return (
    <Dropdown
      items={items}
      render={({ defaultClassName, item }) => (
        <button className={defaultClassName}>{item.label}</button>
      )}
    >
      <Button variant="secondary">•••</Button>
    </Dropdown>
  );
};

export const Default = Template.bind({});
Default.args = {};
