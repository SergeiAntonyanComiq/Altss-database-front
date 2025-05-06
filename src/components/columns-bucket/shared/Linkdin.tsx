import React from "react";
import { ColumnDef } from "@tanstack/react-table";

export const Linkdin = {
  accessorKey: "linkedin",
  header: "LinkedIn",
  meta: {
    headerClassName: "bg-[#F8FAFC]",
  },
  cell: ({ row }) => {
    const value = row.getValue("linkedin") as string;

    return value ? (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline truncate"
      >
        {value}
      </a>
    ) : null;
  },
};
