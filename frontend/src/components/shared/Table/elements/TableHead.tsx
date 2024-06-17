import { flexRender, Table } from '@tanstack/react-table';

type Props<D> = {
  table: Table<D>;
};

export const TableHead = <D,>({ table }: Props<D>) => {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} className="border-b border-gray-40 bg-gray-30">
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className="truncate p-4 text-start text-sm font-semibold text-primary"
              colSpan={header.colSpan}
              style={{
                maxWidth: header.column.getSize(),
              }}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};
