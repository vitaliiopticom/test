import { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { DndProvider } from './DndProvider';
import { DragDrop } from './DragDrop';

export default {
  title: 'Elements/DragDrop',
  component: DragDrop,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof DragDrop>;

const listItems = [
  {
    id: 'Write a',
    label: 'Write a cool JS library',
  },
  {
    id: 'Make it',
    label: 'Make it generic enough',
  },
  {
    id: 'README',
    label: 'README',
  },
  {
    id: 'aa',
    label: 'AAA0',
  },
];

const Template: StoryFn<typeof DragDrop> = () => {
  const [dragDropCards, setDragDropCards] = useState(listItems);

  return (
    <DndProvider>
      <DragDrop
        items={dragDropCards}
        renderItem={({ label }) => (
          <div className="border border-gray-40 px-4 py-2">{label}</div>
        )}
        setItems={setDragDropCards}
      />
    </DndProvider>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const ItemsLengthAfterSubtitle = Template.bind({});
ItemsLengthAfterSubtitle.args = {
  itemsLengthAfterSubtitle: 2,
};
