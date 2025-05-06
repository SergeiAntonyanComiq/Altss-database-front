import { ColumnDef } from "@tanstack/react-table";
import { CompanyType } from "@/types/company.ts";

export const Background: ColumnDef<CompanyType, string> = {
  id: "background",
  accessorFn: (row) => row.background,
  header: "Background",
  meta: {
    maxWidth: 300,
    cellClassName:
      "text-sm font-normal text-[#637381] max-w-full truncate overflow-hidden whitespace-nowrap",
  },
};
