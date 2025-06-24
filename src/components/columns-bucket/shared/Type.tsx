import { Badge } from "@/components/ui/badge.tsx";
import { ColumnDef } from "@tanstack/react-table";

export const Type = <T extends { firm_type?: string[] }>(
  header: string = "Type"
): ColumnDef<T> => ({
  id: "firm_type",
  accessorFn: (row) => row.firm_type,
  header,
  cell: ({ row }) => (
    <div className="flex gap-2.5 overflow-hidden text-ellipsis whitespace-nowrap">
      {(row.getValue("firm_type") as string[]).map((type, i) =>
        type ? <Badge key={i}>{type}</Badge> : null
      )}
    </div>
  ),
});
