import { ColumnDef } from "@tanstack/react-table";
import { PersonType } from "@/types/person.ts";

export const PersonCompanyName: ColumnDef<PersonType, string> = {
  accessorKey: "companies",
  header: "Company",
  meta: {
    maxWidth: 200,
    cellClassName:
      "text-sm font-normal text-[#637381] max-w-full truncate overflow-hidden whitespace-nowrap",
  },
};
