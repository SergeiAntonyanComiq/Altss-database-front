import React from "react";
import InvestorsTableHeader, { Column } from "./table-parts/InvestorsTableHeader";
import { InvestorType } from "@/types/investor";

interface InvestorsTableProps {
  investors: InvestorType[];
  columns: Column[];
  onViewInvestor?: (id: string) => void;
}

const InvestorsTable: React.FC<InvestorsTableProps> = ({ investors, columns, onViewInvestor }) => {
  const totalMinWidth = (columns || []).reduce((sum, col) => sum + col.minWidth, 0);

  const getCellContent = (investor: InvestorType, columnId: Column["id"]) => {
    switch (columnId) {
      case "name":
        return (
          <button
            onClick={() => onViewInvestor && onViewInvestor(investor.firm_id)}
            className="text-blue-600 hover:underline truncate"
          >
            {investor.firm_name}
          </button>
        );
      case "type":
        return investor.firm_type;
      case "location":
        return [investor.city, investor.country].filter(Boolean).join(", ");
      case "aum":
        return investor.aum || "-";
      case "founded":
        return investor.year_est || "-";
      case "funds":
        return investor.funds_count || "-";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm w-full">
      <div className="w-full border border-[rgba(223,228,234,1)] rounded-lg overflow-hidden">
        <div className="overflow-x-auto thin-scrollbar">
          <InvestorsTableHeader columns={columns} />
          <div className="w-full">
            {investors.map((inv, rowIndex) => (
              <div
                key={`${inv.firm_id}-${rowIndex}`}
                className="flex w-full border-b border-[rgba(223,228,234,1)]"
                style={{ minWidth: `${totalMinWidth}px` }}
              >
                {columns.map((col, idx) => (
                  <div
                    key={col.id}
                    className={`px-4 py-3 flex items-center text-[rgba(17,25,40,1)] text-sm ${
                      idx < columns.length - 1 ? "border-r border-[rgba(223,228,234,1)]" : ""
                    }`}
                    style={{ width: col.width, minWidth: col.minWidth }}
                  >
                    {getCellContent(inv, col.id)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorsTable; 