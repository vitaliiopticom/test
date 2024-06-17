import { createColumnHelper } from '@tanstack/react-table';

import type { TableColumn, TableColumnHelper } from './types';

export const createTableColumns = <D>(
  def: (helper: TableColumnHelper<D>) => any[],
) => {
  const columnHelper = createColumnHelper<D>();

  return def(columnHelper) as TableColumn<D>[];
};
