import { Badge } from "@/components/ui/badge.tsx";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { FamilyOffice } from "@/services/familyOfficesService.ts";

export const FamilyOfficeType: ColumnDef<FamilyOffice, string[]> = {
  id: "firm_type",
  accessorFn: (row) => row.firm_type,
  header: "Type",
  meta: {
    cellClassName: "shadow-[inset_10px_0px_6px_-5px_rgba(0,0,0,0.1)]",
    headerClassName: "shadow-[inset_10px_0px_6px_-5px_rgba(0,0,0,0.1)]",
  },
  cell: ({ row }) => (
    <div className="flex gap-2.5 overflow-hidden text-ellipsis whitespace-nowrap">
      {(row.getValue("firm_type") as string[]).map((type, i) => (
        <Badge key={i}>{type}</Badge>
      ))}
    </div>
  ),
};
