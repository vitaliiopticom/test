import type { Meta, StoryFn } from '@storybook/react';

import { Status, StatusType } from './Status';

export default {
  title: 'Elements/Status',
  component: Status,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Status>;

const statuses = [
  'success',
  'warning',
  'danger',
  'neutral',
  'clickable',
  'default',
  'critical',
  'empty',
];

const Template: StoryFn<typeof Status> = ({
  children,
  className,
  onClick,
  ...rest
}) => (
  <div className="flex flex-wrap gap-4">
    {statuses.map((status) => (
      <Status
        key={status}
        {...rest}
        className={className}
        status={status as StatusType}
        onClick={onClick}
      >
        {children}
      </Status>
    ))}
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: 'Status',
};

export const OnClick = Template.bind({});
OnClick.args = {
  children: 'Click',
  onClick: (children, id) => console.log(children, id),
};
