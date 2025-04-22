import React from "react";

export interface Column {
  id: "name" | "type" | "location" | "aum" | "founded" | "funds";
  width: number;
  minWidth: number;
}

interface InvestorsTableHeaderProps {
  columns: Column[];
}

const InvestorsTableHeader: React.FC<InvestorsTableHeaderProps> = ({ columns }) => {
  const totalMinWidth = (columns || []).reduce((sum, col) => sum + col.minWidth, 0);

  const getColumnTitle = (id: string) => {
    switch (id) {
      case "name":
        return "Name";
      case "type":
        return "Type";
      case "location":
        return "Location";
      case "aum":
        return "AUM";
      case "founded":
        return "Founded";
      case "funds":
        return "Funds";
      default:
        return "";
    }
  };

  return (
    <div
      className="bg-gray-100 flex h-12 w-full select-none rounded-t-lg"
      style={{ minWidth: `${totalMinWidth}px` }}
    >
      {columns.map((column, index) => (
        <div
          key={column.id}
          className={`relative px-4 py-3 text-[18px] text-[#637381] font-medium flex items-center ${
            index === columns.length - 1 ? "rounded-tr-lg" : "border-r border-[rgba(223,228,234,1)]"
          }`}
          style={{ width: column.width, minWidth: column.minWidth }}
        >
          {getColumnTitle(column.id)}
        </div>
      ))}
    </div>
  );
};

export default InvestorsTableHeader; 