
import React from "react";

interface CompanyTypeCellProps {
  type: string;
}

const CompanyTypeCell = ({ type }: CompanyTypeCellProps) => (
  <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
    <div className="bg-[rgba(219,229,254,1)] gap-2 px-3 py-1.5 rounded-[30px] flex items-center overflow-hidden">
      <span className="truncate block w-full text-sm">
        {type}
      </span>
    </div>
  </div>
);

export default CompanyTypeCell;
