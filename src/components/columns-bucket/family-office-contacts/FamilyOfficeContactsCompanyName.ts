import { ColumnDef } from "@tanstack/react-table";
import { FamilyOfficeContact } from "@/services/familyOfficeContactsService.ts";

export const FamilyOfficeContactsCompanyName: ColumnDef<
  FamilyOfficeContact,
  string
> = {
  accessorKey: "company_id",
  header: "Company Name",
  meta: {
    headerClassName: "bg-[#F8FAFC]",
  },
  cell: ({ row }) => {
    const value = row.getValue("company_id") as string;
    return value?.replace(/_/g, " ");
  },
};
