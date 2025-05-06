import React from "react";

import { Badge } from "@/components/ui/badge.tsx";
import { ColumnDef } from "@tanstack/react-table";
import { Investor } from "@/hooks/useInvestorsData.ts";

export const InvestorName: ColumnDef<Investor> = {
  id: "firm_name",
  accessorFn: (row) => row.firm_name,
  header: "Name",
  cell: ({ row }) => (
    <a
      href={`/investorprofile/${row.original.firm_id}`}
      className="truncate text-inherit hover:underline cursor-pointer"
    >
      {row.original.firm_name}
    </a>
  ),
};
