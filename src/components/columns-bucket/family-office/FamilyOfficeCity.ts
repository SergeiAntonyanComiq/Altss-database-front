import { ColumnDef } from "@tanstack/react-table";
import { FamilyOffice } from "@/services/familyOfficesService.ts";

export const FamilyOfficeCity: ColumnDef<FamilyOffice, string> = {
  id: "city",
  accessorFn: (row) => row.city,
  header: "City",
};
