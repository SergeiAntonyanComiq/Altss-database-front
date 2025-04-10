import React from "react";

interface FoundedYearCellProps {
  year: number | null | undefined;
}

const FoundedYearCell = ({ year }: FoundedYearCellProps) => {
  // Format year: convert to integer if it's a decimal (like 2010.0)
  // and make sure it's displayed as a 4-digit number
  const formattedYear = year ? Math.floor(year).toString() : 'N/A';
  
  return (
    <div className="flex min-h-11 w-full items-center gap-2.5">
      <span className="text-sm text-gray-600">{formattedYear}</span>
    </div>
  );
};

export default FoundedYearCell;
