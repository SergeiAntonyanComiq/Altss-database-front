import { ColumnDef } from "@tanstack/react-table";
import { Deals } from "@/services/familyOfficesService.ts";
import { format } from "date-fns";
import { EMPTY_PLACEHOLDER } from "@/utils.tsx";

export const DealDate: ColumnDef<Deals> = {
  id: "investment_date",
  accessorFn: (row) =>
    row.investment_date
      ? format(row.investment_date, "dd.MM.yyyy")
      : EMPTY_PLACEHOLDER,
  meta: {
    maxWidth: 160,
    cellClassName:
      "font-medium text-[#1F2A37] truncate overflow-hidden whitespace-nowrap text-center",
  },
  header: "Date",
};
