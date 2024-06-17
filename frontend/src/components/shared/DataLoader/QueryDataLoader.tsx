import type { ApolloError, OperationVariables, QueryResult } from '@/api';
import { NetworkStatus } from '@/api';
import { usePreviousNonNullish } from '@/hooks';

import { DataLoader, DataLoaderBaseProps } from './DataLoader';

type Props<D, P extends OperationVariables, C extends boolean = false> = {
  query: QueryResult<D, P>;
} & DataLoaderBaseProps<D, ApolloError, C>;

export const QueryDataLoader = <
  D,
  P extends OperationVariables,
  C extends boolean = false,
>({
  children,
  query,
  useCustomLoading,
  keepPreviousData,
  ...rest
}: Props<D, P, C>) => {
  const { data: currentData, loading, error, networkStatus } = query;
  const prevData = usePreviousNonNullish(
    keepPreviousData ? currentData : undefined,
  );

  const isRefetching =
    networkStatus === NetworkStatus.setVariables ||
    networkStatus === NetworkStatus.refetch;
  const data = keepPreviousData ? currentData ?? prevData : currentData;

  return (
    <DataLoader
      data={data}
      error={error}
      isLoading={loading && !data}
      isRefetching={isRefetching}
      useCustomLoading={useCustomLoading}
      {...rest}
    >
      {({ data, isLoading, error, isRefetching }) =>
        typeof children === 'function'
          ? children({
              data,
              isLoading,
              error,
              isRefetching,
            })
          : children
      }
    </DataLoader>
  );
};
