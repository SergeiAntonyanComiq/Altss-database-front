import { ColumnDef } from "@tanstack/react-table";
import { FamilyOffice } from "@/services/familyOfficesService.ts";

export const FamilyOfficeAum: ColumnDef<FamilyOffice, string> = {
  id: "aum",
  accessorFn: (row) => row.aum,
  header: "AUM, $mln.",
};
