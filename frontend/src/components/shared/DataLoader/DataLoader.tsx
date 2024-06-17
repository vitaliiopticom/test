import { ReactNode } from 'react';

import { Spinner } from '@/components/elements';

import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

export type DataLoaderArgs<D, E = Error, C extends boolean = false> = {
  data: C extends true ? D | undefined : D;
  isLoading: boolean;
  isRefetching?: boolean;
  error?: E;
};

export type DataLoaderBaseProps<D, E = Error, C extends boolean = false> = {
  children: ((args: DataLoaderArgs<D, E, C>) => ReactNode) | ReactNode;
  loader?: ReactNode;
  errorFallback?: (error: E) => ReactNode;
  errorBoundaryFallback?: ReactNode;
  useCustomLoading?: C;
  keepPreviousData?: boolean;
};

type Props<D, E = Error, C extends boolean = false> = DataLoaderBaseProps<
  D,
  E,
  C
> &
  Partial<DataLoaderArgs<D, E, C>>;

export const DataLoader = <D, E, C extends boolean = false>({
  children,
  data,
  isLoading = false,
  isRefetching,
  error,
  loader,
  errorFallback,
  errorBoundaryFallback,
  useCustomLoading,
}: Props<D, E, C>) => {
  if (isLoading && !useCustomLoading) {
    return loader ? (
      <>{loader}</>
    ) : (
      <Spinner className="mx-auto w-full text-primary" size="lg" />
    );
  }

  if (!!error) {
    return errorFallback ? <>{errorFallback(error)}</> : null;
  }

  if (!data && !useCustomLoading) {
    return null;
  }

  return (
    <ErrorBoundary fallback={errorBoundaryFallback}>
      {typeof children === 'function'
        ? children({
            data: data as DataLoaderArgs<D, E, C>['data'],
            isLoading,
            error,
            isRefetching,
          })
        : children}
    </ErrorBoundary>
  );
};
