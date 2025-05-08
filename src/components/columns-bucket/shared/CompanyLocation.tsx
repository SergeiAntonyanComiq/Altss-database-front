import { ColumnDef } from "@tanstack/react-table";
import React from "react";

export const CompanyLocation = <
  T extends {
    address?: string;
    country?: string;
    state_county?: string;
  },
>(): ColumnDef<T> => ({
  id: "location",
  header: "Company Location",
  meta: {
    cellClassName:
      "text-sm font-normal text-[#637381] truncate max-w-full overflow-hidden whitespace-nowrap",
    maxWidth: 300,
  },
  cell: ({ row }) => {
    const address = row.original.address;
    const country = row.original.country;
    const state = row.original.state_county;

    return (
      <div className="text-sm text-[#637381] w-full overflow-hidden">
        {address && (
          <div className="truncate w-full">
            <span className="font-medium">Address:</span> {address}
          </div>
        )}
        <div className="flex flex-row">
          {country && (
            <div className="truncate w-full">
              <span className="font-medium">Country:</span> {country}
            </div>
          )}
          {state && (
            <div className="truncate w-full">
              <span className="font-medium">State/County:</span> {state}
            </div>
          )}
        </div>
        {!country && !address && !state && (
          <div className="truncate w-full">N/A</div>
        )}
      </div>
    );
  },
});
