import React from "react";
import InvestorsTableHeader, {
  Column,
} from "./table-parts/InvestorsTableHeader";
import { InvestorType } from "@/types/investor";

interface InvestorsTableProps {
  investors: InvestorType[];
  columns: Column[];
  onViewInvestor?: (id: string) => void;
}

const InvestorsTable: React.FC<InvestorsTableProps> = ({
  investors,
  columns,
  onViewInvestor,
}) => {
  const totalMinWidth = columns.reduce((sum, col) => sum + col.minWidth, 0);

  const cellRenderers: Record<
    Column["id"],
    (inv: InvestorType) => React.ReactNode
  > = {
    name: (inv) => (
      <button
        onClick={() => onViewInvestor?.(inv.firm_id)}
        className="text-blue-600 hover:underline truncate"
      >
        {inv.firm_name}
      </button>
    ),
    type: (inv) => inv.firm_type,
    location: (inv) => [inv.city, inv.country].filter(Boolean).join(", "),
    aum: (inv) => inv.aum || "-",
    founded: (inv) => inv.year_est || "-",
    funds: (inv) => inv.funds_count || "-",
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
                    className={`max-h-[44px] px-4 py-3 flex items-center text-[rgba(17,25,40,1)] text-sm ${
                      idx < columns.length - 1
                        ? "border-r border-[rgba(223,228,234,1)]"
                        : ""
                    }`}
                    style={{ width: col.width, minWidth: col.minWidth }}
                  >
                    {cellRenderers[col.id](inv)}
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
