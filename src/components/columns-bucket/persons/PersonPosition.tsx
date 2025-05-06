import React from "react";

import { Badge } from "@/components/ui/badge.tsx";
import { ColumnDef } from "@tanstack/react-table";
import { Investor } from "@/hooks/useInvestorsData.ts";
import { PersonType } from "@/types/person.ts";

export const PersonPosition: ColumnDef<PersonType> = {
  id: "currentPosition",
  accessorFn: (row) => row.currentPosition,
  header: "Position",
  meta: {
    cellClassName:
      "font-normal text-[#637381] truncate max-w-full overflow-hidden whitespace-nowrap",
    maxWidth: 200,
  },
  cell: ({ row }) => (
    <div className="flex items-center overflow-hidden">
      {row.original.currentPosition ? (
        <div
          className="bg-[rgba(219,229,254,1)] gap-2 px-3 py-1 rounded-[30px] flex items-center text-[rgba(1,69,199,1)] text-sm max-w-full"
          title={row.original.currentPosition}
        >
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            {row.original.currentPosition}
          </span>
        </div>
      ) : (
        <span className="text-gray-500 text-sm">-</span>
      )}
    </div>
  ),
};
