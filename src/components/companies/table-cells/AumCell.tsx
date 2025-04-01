
import React from "react";

interface AumCellProps {
  aumFormatted: string;
}

const AumCell = ({ aumFormatted }: AumCellProps) => (
  <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
    {aumFormatted}
  </div>
);

export default AumCell;
