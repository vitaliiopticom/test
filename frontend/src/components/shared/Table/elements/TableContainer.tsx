import { ReactNode } from 'react';
import { Table } from '@tanstack/react-table';

import { useTranslation } from '@/i18n';
import { cx } from '@/utils/classNames';

import { DataView } from '../../DataView';

type Props<D> = {
  children: ReactNode;
  table: Table<D>;
  hasDataViewPagination?: boolean;
};

export const TableContainer = <D,>({
  table,
  children,
  hasDataViewPagination,
}: Props<D>) => {
  const { t } = useTranslation();

  const isEmpty = !table.getRowModel().rows?.length;

  return (
    <div
      className={cx(
        'relative block max-w-full overflow-y-hidden rounded-md border border-gray-40',
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full [caption-side:bottom]">
          {children}
          {isEmpty && (
            <caption className="bg-white p-6">
              {t('components.table.emptyRows')}
            </caption>
          )}
        </table>
      </div>
      {hasDataViewPagination && (
        <DataView.Pagination className="border-t border-gray-40 bg-white px-4" />
      )}
    </div>
  );
};
