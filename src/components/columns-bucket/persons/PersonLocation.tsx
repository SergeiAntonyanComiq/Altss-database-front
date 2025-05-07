import React from "react";

import { ColumnDef } from "@tanstack/react-table";
import { PersonType } from "@/types/person.ts";

export const PersonLocation: ColumnDef<PersonType> = {
  id: "location",
  accessorFn: (row) => row.location,
  header: "Location",
  meta: {
    maxWidth: 200,
  },
  cell: ({ row }) => (
    <div className="flex items-center">
      {row.original.location ? (
        <div className="flex items-center gap-1 px-2 truncate">
          <div className="bg-[rgba(0,126,96,0.1)] truncate whitespace-nowrap rounded-[4px] py-1 px-2">
            <span className="text-[#006C50]">{row.original.location}</span>
          </div>
        </div>
      ) : (
        <span className="text-gray-500 text-sm">-</span>
      )}
    </div>
  ),
};
