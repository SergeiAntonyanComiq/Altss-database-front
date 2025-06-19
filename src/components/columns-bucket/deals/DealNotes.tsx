import { ColumnDef } from "@tanstack/react-table";
import { Deals } from "@/services/familyOfficesService.ts";
import React from "react";
import { withTooltipRenderer } from "@/components/ui/withTooltipRenderer.tsx";

export const DealNotes: ColumnDef<Deals> = {
  id: "note",
  accessorFn: (row) => row.notes,
  meta: {
    maxWidth: 240,
    cellClassName:
      "font-normal text-[#637381] truncate max-w-full overflow-hidden whitespace-nowrap",
  },
  header: "Notes",
  cell: ({ row }) =>
    withTooltipRenderer(
      <span className="truncate max-w-full overflow-hidden whitespace-nowrap">
        {row.original.notes}
      </span>,
      row.original.notes
    ),
};
