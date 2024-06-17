import type { Meta, StoryFn } from '@storybook/react';

import { Table } from './Table';
import { createTableColumns } from './utils';

export default {
  title: 'Shared/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    data: {
      table: {
        disable: true,
      },
    },
    columns: {
      table: {
        disable: true,
      },
    },
    onChange: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof Table>;

type Data = {
  name: string;
  surname: string;
  age: number;
  email: string;
};

const data: Data[] = [
  {
    name: 'Bob',
    surname: 'Bobek',
    age: 20,
    email: 'bob@bobek.com',
  },
  {
    name: 'John',
    surname: 'Smith',
    age: 42,
    email: 'john@smith.com',
  },
];

const columns = createTableColumns<Data>((clh) => [
  clh.accessor('name', {
    header: 'Name',
  }),
  clh.accessor('surname', {
    header: 'Surname',
    size: 200,
  }),
  clh.accessor('age', {
    header: 'Age',
  }),
  clh.accessor('email', {
    header: 'Email',
    cell: (props) => <span className="text-primary">{props.getValue()}</span>,
  }),
]);

const Template: StoryFn<typeof Table> = (args) => {
  return <Table {...args} columns={columns} data={data} />;
};

export const Default = Template.bind({});
Default.args = {
  hasRowSelection: true,
};
