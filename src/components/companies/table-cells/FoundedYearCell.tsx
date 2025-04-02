
import React from "react";

interface FoundedYearCellProps {
  foundedYear: string | number | null | undefined;
}

const FoundedYearCell = ({ foundedYear }: FoundedYearCellProps) => (
  <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
    <span className="text-sm">{foundedYear ? `${foundedYear} y.` : 'N/A'}</span>
  </div>
);

export default FoundedYearCell;
export type { FoundedYearCellProps };
