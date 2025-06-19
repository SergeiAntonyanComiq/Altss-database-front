import { ColumnDef } from "@tanstack/react-table";
import { Deals } from "@/services/familyOfficesService.ts";

export const Partner: ColumnDef<Deals> = {
  id: "partner_name",
  accessorFn: (row) => row.partner_name,
  meta: {
    cellClassName:
      "font-medium text-[#1F2A37] truncate max-w-full overflow-hidden whitespace-nowrap",
  },
  header: "Investments & Deals",
};
