import React from "react";

import { ColumnDef } from "@tanstack/react-table";
import { CompanyType } from "@/types/company.ts";

export const KnownTeam: ColumnDef<CompanyType, string> = {
  id: "location",
  header: "Company Contact",
  meta: {
    cellClassName:
      "text-sm font-normal text-[#637381] truncate max-w-full overflow-hidden whitespace-nowrap",
    maxWidth: 300,
  },
  cell: ({ row }) => {
    const staffCount = row.original["total_staff"];

    return (
      <div className="flex min-h-11 w-full items-center gap-2.5">
        {staffCount ? (
          <div className="bg-[rgba(0,126,96,0.1)] gap-2 px-3 py-1 rounded-[30px] flex items-center overflow-hidden text-[rgba(0,126,96,1)] text-sm">
            <span className="truncate block w-full">{staffCount}</span>
          </div>
        ) : (
          <span className="text-gray-500 text-sm">N/A</span>
        )}
      </div>
    );
  },
};
