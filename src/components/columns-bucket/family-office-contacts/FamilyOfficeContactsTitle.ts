import { ColumnDef } from "@tanstack/react-table";
import { FamilyOfficeContact } from "@/services/familyOfficeContactsService.ts";

export const FamilyOfficeContactsTitle: ColumnDef<FamilyOfficeContact, string> =
  {
    accessorKey: "title",
    header: "Title",
  };
