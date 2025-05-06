import { ColumnDef } from "@tanstack/react-table";
import { FamilyOfficeContact } from "@/services/familyOfficeContactsService.ts";

export const CompanyId: ColumnDef<FamilyOfficeContact, string> = {
  accessorKey: "company_id",
  header: "Company ID",
  meta: {
    headerClassName: "bg-[#F8FAFC]",
  },
  cell: ({ row }) => {
    const value = row.getValue("company_id") as string;
    return value?.replace(/_/g, " ");
  },
};
