import React from "react";

import { ColumnDef } from "@tanstack/react-table";
import { PersonType } from "@/types/person.ts";

export const PersonBio: ColumnDef<PersonType> = {
  id: "shortBio",
  accessorFn: (row) => row.shortBio,
  header: "Short Bio",
  meta: {
    maxWidth: 200,
    cellClassName:
      "font-normal text-[#637381] truncate max-w-full overflow-hidden whitespace-nowrap",
  },
  cell: ({ row }) => (
    <div className="px-4 py-3 flex items-center">
      <p className="text-sm text-gray-600 line-clamp-2">
        {row.original.shortBio || "-"}
      </p>
    </div>
  ),
};
