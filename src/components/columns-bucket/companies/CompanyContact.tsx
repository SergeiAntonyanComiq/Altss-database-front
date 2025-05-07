import { ColumnDef } from "@tanstack/react-table";
import { CompanyType } from "@/types/company.ts";
import React from "react";

export const CompanyContact: ColumnDef<CompanyType, string> = {
  id: "contact",
  header: "Company Contact",
  meta: {
    cellClassName:
      "text-sm font-normal text-[#637381] truncate max-w-full overflow-hidden whitespace-nowrap",
    maxWidth: 300,
  },
  cell: ({ row }) => {
    const email = row.original["email"];
    const tel = row.original["tel"];
    const fax = row.original["fax"];

    return (
      <div className="text-sm text-[#637381] space-y-1 w-full overflow-hidden">
        {email && (
          <div className="truncate w-full">
            <span className="font-medium">Email:</span> {email}
          </div>
        )}
        {tel && (
          <div className="truncate w-full">
            <span className="font-medium">Tel:</span> {tel}
          </div>
        )}
        {fax && (
          <div className="truncate w-full">
            <span className="font-medium">Fax:</span> {fax}
          </div>
        )}
        {!email && !tel && !fax && <div className="truncate w-full">N/A</div>}
      </div>
    );
  },
};
