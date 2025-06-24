import { Badge } from "@/components/ui/badge.tsx";
import { ColumnDef } from "@tanstack/react-table";
import { Deals } from "@/services/familyOfficesService.ts";

export const DealType: ColumnDef<Deals> = {
  id: "type",
  accessorFn: (row) => row.type?.split(","),
  header: "Deal Type",
  cell: ({ row }) => (
    <div className="flex gap-2.5 overflow-hidden text-ellipsis whitespace-nowrap">
      {(row.getValue("type") as string[])?.map((type, i) => (
        <Badge key={i}>{type}</Badge>
      ))}
    </div>
  ),
};
