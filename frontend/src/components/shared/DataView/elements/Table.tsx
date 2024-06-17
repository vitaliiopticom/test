import React from 'react';

import { DisplayComponent } from '@/components/elements';

import {
  Table as TableComponent,
  TableProps as TableDefaultProps,
} from '../../Table';
import { LAYOUT_MODE } from '../constants';
import { useDataViewContext } from '../hooks/useDataViewContext';
import { useLayoutMode } from '../hooks/useDataViewStore';

export type TableProps<D> = Omit<TableDefaultProps<D>, 'isLoading' | 'data'>;

const TableInner = <D,>(props: TableProps<D>) => {
  const { isLoading, data } = useDataViewContext();

  return <TableComponent {...props} data={data} isLoading={isLoading} />;
};

export const Table = <D,>({
  hasDataViewPagination = true,
  ...rest
}: TableProps<D>) => {
  const { id } = useDataViewContext();
  const layoutMode = useLayoutMode(id);

  return (
    <DisplayComponent shouldDisplay={layoutMode === LAYOUT_MODE.list}>
      <TableInner {...rest} hasDataViewPagination={hasDataViewPagination} />
    </DisplayComponent>
  );
};
