import React from "react";
import { columnLabelsMap } from "./../contants.ts";

export interface Column {
  id: "name" | "type" | "location" | "aum" | "founded" | "funds";
  width: number;
  minWidth: number;
}

interface InvestorsTableHeaderProps {
  columns: Column[];
}

const InvestorsTableHeader: React.FC<InvestorsTableHeaderProps> = ({
  columns,
}) => {
  const totalMinWidth = columns.reduce((sum, col) => sum + col.minWidth, 0);

  return (
    <div
      className="bg-gray-100 flex h-12 max-h-[44px] w-full select-none rounded-t-lg"
      style={{ minWidth: `${totalMinWidth}px` }}
    >
      {columns.map((column, index) => (
        <div
          key={column.id}
          className={`relative px-4 py-3 text-[18px] text-[#637381] font-medium flex items-center ${
            index === columns.length - 1
              ? "rounded-tr-lg"
              : "border-r border-[rgba(223,228,234,1)]"
          }`}
          style={{ width: column.width, minWidth: column.minWidth }}
        >
          {columnLabelsMap[column.id]}
        </div>
      ))}
    </div>
  );
};

export default InvestorsTableHeader;
