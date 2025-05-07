import { ColumnDef } from "@tanstack/react-table";

export const FoundedYear = <T, K extends keyof T & string>(
  field: K,
): ColumnDef<T> => ({
  id: field,
  accessorFn: (row) => row[field],
  header: "Founded year",
  meta: {
    cellClassName:
      "font-normal text-[#637381] truncate max-w-full overflow-hidden whitespace-nowrap",
  },
  cell: ({ row }) => {
    const value = row.getValue(field);
    return value ? `${value} y.` : "";
  },
});
