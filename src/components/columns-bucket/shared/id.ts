import { ColumnDef } from "@tanstack/react-table";

export function Id<T, K extends keyof T>(
  accessorKey: K,
  header: string = "ID"
): ColumnDef<T, T[K]> {
  return {
    id: "id",
    accessorFn: (row) => row[accessorKey],
    header,
  };
}
