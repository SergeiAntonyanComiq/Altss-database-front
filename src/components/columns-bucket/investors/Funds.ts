import { ColumnDef } from "@tanstack/react-table";
import { Investor } from "@/hooks/useInvestorsData.ts";

export const Funds: ColumnDef<Investor, string> = {
  accessorKey: "funds_count",
  header: "Funds",
  meta: {
    maxWidth: 200,
    cellClassName:
      "text-sm font-normal text-[#637381] max-w-full truncate overflow-hidden whitespace-nowrap",
  },
};
