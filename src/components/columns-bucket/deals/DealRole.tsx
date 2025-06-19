import { Badge } from "@/components/ui/badge.tsx";
import { ColumnDef } from "@tanstack/react-table";
import { Deals } from "@/services/familyOfficesService.ts";

export const DealRole: ColumnDef<Deals> = {
  id: "role",
  accessorFn: (row) => row.role.split(","),
  header: "Role",
  cell: ({ row }) => (
    <div className="flex gap-2.5 overflow-hidden text-ellipsis whitespace-nowrap">
      {(row.getValue("role") as string[])?.map((type, i) => (
        <Badge key={i}>{type}</Badge>
      ))}
    </div>
  ),
};
