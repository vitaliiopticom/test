import { ReactElement, useMemo } from 'react';

import { usePagination } from '../hooks/useDataViewStore';

type Props<D> = {
  id: string;
  data: D[];
  children: (data: D[]) => ReactElement;
};

// FE pagination adapter until BE implementation ready in certain views.
// Please do NOT use it anywhere else!
export const PaginationAdapter = <D,>({ id, data, children }: Props<D>) => {
  const { page, pageSize } = usePagination(id) || {};
  const pageIndex = (page - 1) * pageSize;
  const pageData = useMemo(
    () => data.slice(pageIndex, pageIndex + pageSize),
    [data, pageIndex, pageSize],
  );

  return children(pageData);
};
