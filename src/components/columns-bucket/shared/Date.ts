import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const Date = <T extends Record<K, Date>, K extends keyof T & string>(
  field: K,
  header: string
): ColumnDef<T> => ({
  id: field,
  header,
  accessorFn: (row) => (row[field] ? format(row[field], "dd.MM.yyyy") : "--"),
  meta: {
    cellClassName:
      "font-medium text-[#1F2A37] truncate max-w-full overflow-hidden whitespace-nowrap",
  },
});
