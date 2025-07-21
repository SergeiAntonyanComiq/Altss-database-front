"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  fieldId?: string;
  selectedIds?: string[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  fieldId,
  selectedIds = [],
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row?.[fieldId],
    state: {
      rowSelection: Object.fromEntries(selectedIds?.map((id) => [id, true])),
    },
    onRowSelectionChange: () => {},
  });

  const stickyColumnId = ["select", "firm_name"];

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="h-[44px]">
            {headerGroup.headers.map((header) => (
              <TableHead
                style={{ width: header.getSize() }}
                key={header.id}
                className={cn(
                  "max-h-[44px] h-full font-medium text-lg px-2 py-0 align-middle overflow-hidden",
                  (header.column.columnDef.meta as { headerClassName?: string })
                    ?.headerClassName,
                  stickyColumnId.includes(header.column.id) &&
                    "sticky left-0 z-10 p-0!"
                )}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}

        <tr>
          <th colSpan={table.getAllLeafColumns().length} className="p-0">
            <div
              className="h-2 bg-white
           "
            />
          </th>
        </tr>
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow
            className="mt-[8px]"
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                className={cn(
                  "h-[44px] text-lg px-2 py-0 border-r align-middle overflow-hidden",
                  (cell.column.columnDef.meta as { cellClassName?: string })
                    ?.cellClassName,
                  stickyColumnId.includes(cell.column.id) &&
                    "sticky left-0 z-10 p-0!"
                )}
                style={{ ...cell.column.columnDef.meta }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
