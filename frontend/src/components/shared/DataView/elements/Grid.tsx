import { ReactElement } from 'react';

import { DisplayComponent, Spinner } from '@/components/elements';

import { LAYOUT_MODE } from '../constants';
import { useDataViewContext } from '../hooks/useDataViewContext';
import { useLayoutMode, usePagination } from '../hooks/useDataViewStore';
import { PaginationType } from '../types';

type RenderGridParams<D> = PaginationType & {
  data: D[];
  recordsCount: number;
};

export type GridProps<D> = {
  children: (params: RenderGridParams<D>) => ReactElement;
  skeleton?: ReactElement;
};

const GridInner = <D,>({
  children,
  skeleton,
  data,
}: GridProps<D> & { data: D[] }) => {
  const { id, isLoading, recordsCount } = useDataViewContext();
  const pagination = usePagination(id);

  if (isLoading) {
    if (skeleton) {
      return skeleton;
    }

    return (
      <div className="flex h-[200px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return children({ ...pagination, recordsCount, data });
};

export const Grid = <D,>({ children, ...rest }: GridProps<D>) => {
  const { id, data } = useDataViewContext<D>();
  const layoutMode = useLayoutMode(id);

  return (
    <DisplayComponent shouldDisplay={layoutMode === LAYOUT_MODE.grid}>
      <GridInner {...rest} data={data}>
        {children}
      </GridInner>
    </DisplayComponent>
  );
};
