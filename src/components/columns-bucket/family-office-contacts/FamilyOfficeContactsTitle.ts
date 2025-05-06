import { ColumnDef } from "@tanstack/react-table";
import { FamilyOffice } from "@/services/familyOfficesService.ts";
import { FamilyOfficeContact } from "@/services/familyOfficeContactsService.ts";

export const FamilyOfficeContactsTitle: ColumnDef<FamilyOfficeContact, string> =
  {
    accessorKey: "title",
    header: "Title",
    meta: {
      headerClassName:
        "bg-[#F8FAFC] shadow-[inset_10px_0px_6px_-5px_rgba(0,0,0,0.1)]",
      cellClassName: "shadow-[inset_10px_0px_6px_-5px_rgba(0,0,0,0.1)]",
    },
  };
