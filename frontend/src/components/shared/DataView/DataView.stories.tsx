import React, { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { createTableColumns } from '../Table';

import { LAYOUT_MODE } from './constants';
import { DataView } from './DataView';
import { PaginationType } from './types';

export default {
  title: 'Shared/DataView',
  component: DataView,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof DataView>;

type User = {
  firstName: string;
  lastName: string;
  age: string;
};

const columns = createTableColumns<User>((ch) => [
  ch.accessor('firstName', {
    header: () => 'First name',
  }),
  ch.accessor('lastName', {
    header: () => 'Last name',
  }),
  ch.accessor('age', {
    header: () => 'Age',
  }),
]);

const STORYBOOK_DATA_VIEW_ID = 'storybook_data_view';

const data: User[] = new Array(25).fill(0).map((_, index) => ({
  id: `${index}`,
  firstName: 'John',
  lastName: `Doe ${index}`,
  age: '30',
}));

const Template: StoryFn<typeof DataView> = (args) => {
  const [isLoading, setLoading] = useState(false);
  const [pageData, setPageData] = useState<User[]>(data.slice(0, 10));

  const handlePageChange = async (pagination: PaginationType) => {
    setLoading(true);

    const timeout = setTimeout(() => {
      const { page = 0, pageSize = 10 } = pagination;
      const pageIndex = (page - 1) * pageSize;
      const pageData = data.slice(pageIndex, pageIndex + pageSize);

      setPageData(pageData);
      setLoading(false);
      clearTimeout(timeout);
    }, 1000);
  };

  return (
    <DataView
      {...args}
      data={pageData}
      id={STORYBOOK_DATA_VIEW_ID}
      isLoading={isLoading}
      recordsCount={data.length}
      onPageChange={handlePageChange}
      onSelectionChange={(items) => console.log(items)}
    >
      <div className="mb-4 flex items-center justify-end gap-4">
        Switch layout (List/Grid): <DataView.Toggle />
      </div>
      <DataView.Table columns={columns} hasRowSelection />
      <DataView.Grid<User>>
        {({ data }) => (
          <div className="flex w-[500px] flex-row flex-wrap gap-4">
            {data.map((item) => (
              <div
                key={item.lastName}
                className="flex w-[150px] items-center justify-center bg-primary-tint-10 p-5 text-white"
              >
                {`${item.firstName} ${item.lastName}`}
              </div>
            ))}
            <DataView.Pagination />
          </div>
        )}
      </DataView.Grid>
      <DataView.SelectionActionsPopup<User>>
        {({ selectedItems }) => (
          <div>{`Selected items length: ${selectedItems?.length}`}</div>
        )}
      </DataView.SelectionActionsPopup>
    </DataView>
  );
};

export const Default = Template.bind({});
Default.args = {
  defaultLayoutMode: LAYOUT_MODE.list,
};
