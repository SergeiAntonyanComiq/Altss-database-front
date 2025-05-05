import { ColumnDef } from "@tanstack/react-table";
import { FamilyOffice } from "@/services/familyOfficesService.ts";

export const FamilyOfficeCountry: ColumnDef<FamilyOffice, string> = {
  id: "country",
  accessorFn: (row) => row.country,
  header: "Country",
};
