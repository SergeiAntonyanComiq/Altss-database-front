import { ColumnDef } from "@tanstack/react-table";
import { Deals } from "@/services/familyOfficesService.ts";
import { format } from "date-fns";

export const DealDate: ColumnDef<Deals> = {
  id: "investment_date",
  accessorFn: (row) => format(row.investment_date, "dd.MM.yyyy"),
  meta: {
    maxWidth: 160,
    cellClassName:
      "font-medium text-[#1F2A37] truncate overflow-hidden whitespace-nowrap text-center",
  },
  header: "Investments & Deals",
};
