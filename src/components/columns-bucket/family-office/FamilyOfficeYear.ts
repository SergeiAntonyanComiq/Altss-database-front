import { ColumnDef } from "@tanstack/react-table";
import { FamilyOffice } from "@/services/familyOfficesService.ts";

export const FamilyOfficeYear: ColumnDef<FamilyOffice, string> = {
  id: "year_founded",
  accessorFn: (row) => row.year_founded,
  header: "Founded year",
  cell: ({ row }) => `${row.getValue("year_founded")} y.`,
};
