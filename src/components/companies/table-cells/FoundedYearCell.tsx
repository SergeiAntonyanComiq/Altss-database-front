
import React from "react";

interface FoundedYearCellProps {
  year: number | null | undefined;
}

const FoundedYearCell = ({ year }: FoundedYearCellProps) => (
  <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
    <span className="text-sm">{year ? `${year} y.` : 'N/A'}</span>
  </div>
);

export default FoundedYearCell;
