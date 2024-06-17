import { DataView } from '../DataView';

import type { TableColumn } from './types';

export const createSelectionColumn = <D,>(): TableColumn<D> => {
  return {
    id: '_selection',
    header: () => <DataView.SelectionCheckbox className="-mt-1" />,
    cell: ({ row }) => (
      <DataView.SelectionCheckbox className="-mt-1" item={row.original} />
    ),
  };
};
