import { flexRender, Table } from '@tanstack/react-table';

import { Skeleton } from '@/components/elements';
import { cx } from '@/utils/classNames';

type Props<D> = {
  table: Table<D>;
  isLoading?: boolean;
};

export const TableBody = <D,>({ table, isLoading }: Props<D>) => {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr
          key={row.id}
          className={cx(
            'border-b border-gray-40 bg-white last:border-none',
            row.getIsSelected() && 'bg-primary-tint-90',
          )}
        >
          {row.getVisibleCells().map((cell) => (
            <td
              key={cell.id}
              className="truncate p-4 py-3 text-start text-secondary"
              style={{
                maxWidth: cell.column.getSize(),
              }}
            >
              {isLoading ? (
                <Skeleton className="h-4" />
              ) : (
                flexRender(cell.column.columnDef.cell, cell.getContext())
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
