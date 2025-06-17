import { ColumnDef } from "@tanstack/react-table";
import { FamilyOfficeContact } from "@/services/familyOfficeContactsService.ts";
import { Link } from "react-router-dom";

export const FamilyOfficeContactsCompanyName: ColumnDef<
  FamilyOfficeContact,
  string
> = {
  accessorFn: (row) =>
    row.other_fields?.family_office ||
    row.experience_data?.[0]?.company_name ||
    "",
  id: "family_office",
  header: "Company Name",
  meta: {
    headerClassName: "bg-[#F8FAFC]",
  },
  cell: ({ row }) => {
    const name = row.getValue("family_office") as string;
    const fallbackCompanyId = row.original.experience_data?.[0]?.company_id;
    const id = row.original.company_id || fallbackCompanyId;

    return id ? (
      <Link
        to={`/familyoffices/${id}?from=${encodeURIComponent(
          window.location.pathname
        )}`}
      >
        {name}
      </Link>
    ) : (
      <span className="text-gray-400 italic">No company</span>
    );
  },
};
