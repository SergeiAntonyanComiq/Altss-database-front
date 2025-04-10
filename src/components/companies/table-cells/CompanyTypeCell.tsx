import React from "react";

interface CompanyTypeCellProps {
  type: string;
}

const CompanyTypeCell = ({ type }: CompanyTypeCellProps) => (
  <div className="flex min-h-11 w-full items-center gap-2.5">
    {type ? (
      <div className="bg-[rgba(219,229,254,1)] gap-2 px-3 py-1 rounded-[30px] flex items-center overflow-hidden text-[rgba(1,69,199,1)] text-sm">
        <span className="truncate block w-full">{type}</span>
      </div>
    ) : (
      <span className="text-gray-500 text-sm">-</span>
    )}
  </div>
);

export default CompanyTypeCell;
