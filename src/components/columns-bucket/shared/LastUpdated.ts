import { ColumnDef } from "@tanstack/react-table";

export const LastUpdated = <T extends { last_updated: string }>(): ColumnDef<
  T,
  string
> => ({
  id: "last_updated",
  accessorFn: (row) => row.last_updated,
  header: "Last Updated",
});
