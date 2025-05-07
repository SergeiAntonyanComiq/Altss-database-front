import React from "react";

import { ColumnDef } from "@tanstack/react-table";
import { PersonType } from "@/types/person.ts";
import { Badge } from "@/components/ui/badge.tsx";

export const PersonResponsibilities: ColumnDef<PersonType> = {
  id: "responsibilities",
  accessorFn: (row) => row.shortBio,
  header: "Responsibilities",
  meta: {
    minWidth: 200,
    maxWidth: 300,
  },
  cell: ({ row }) => {
    const responsibilities = row.original.responsibilities || [];
    const maxVisible = 2;
    const visible = responsibilities.slice(0, maxVisible);
    const remaining = responsibilities.length - maxVisible;

    return (
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-wrap gap-1">
          {visible.map((resp, index) => (
            <Badge
              key={index}
              variant="outline"
              className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md text-xs border-blue-100"
            >
              {resp}
            </Badge>
          ))}
          {responsibilities.length === 0 && (
            <span className="text-gray-500 text-sm">-</span>
          )}
        </div>
        {remaining > 0 && (
          <div className="ml-2 flex-shrink-0">
            <Badge
              variant="outline"
              className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md text-xs border-gray-200"
            >
              +{remaining} more
            </Badge>
          </div>
        )}
      </div>
    );
  },
};
