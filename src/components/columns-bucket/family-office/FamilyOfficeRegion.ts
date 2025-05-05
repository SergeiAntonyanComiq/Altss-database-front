import { ColumnDef } from "@tanstack/react-table";
import { FamilyOffice } from "@/services/familyOfficesService.ts";

export const FamilyOfficeRegion: ColumnDef<FamilyOffice, string> = {
  id: "region",
  accessorFn: (row) => row.region,
  header: "Region",
};
