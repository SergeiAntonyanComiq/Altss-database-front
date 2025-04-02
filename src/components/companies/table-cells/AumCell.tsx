
import React from "react";

interface AumCellProps {
  aumValue: number | string | undefined | null;
  formatAum: (aumValue: number | string | undefined | null) => string;
}

const AumCell = ({ aumValue, formatAum }: AumCellProps) => (
  <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
    <span className="text-sm">{formatAum(aumValue)}</span>
  </div>
);

export default AumCell;
export type { AumCellProps };
