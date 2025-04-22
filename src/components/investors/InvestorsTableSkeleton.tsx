import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const InvestorsTableSkeleton = () => {
  const columnWidths = [
    { w: "w-[250px] min-w-[250px]", mw: 250 }, // Name
    { w: "w-[180px] min-w-[180px]", mw: 180 }, // Type
    { w: "w-[300px] min-w-[300px]", mw: 300 }, // Location
    { w: "w-[170px] min-w-[170px]", mw: 170 }, // AUM
    { w: "w-[150px] min-w-[150px]", mw: 150 }, // Founded
    { w: "w-[150px] min-w-[150px]", mw: 150 }, // Funds
  ];

  const totalMinWidth = columnWidths.reduce((sum, col) => sum + col.mw, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm w-full mt-8">
      <div className="w-full border border-[rgba(223,228,234,1)] rounded-lg overflow-hidden">
        <div className="overflow-x-auto thin-scrollbar">
          {/* Header skeleton */}
          <div
            className="bg-gray-100 flex h-12 w-full select-none rounded-t-lg border-b border-[rgba(223,228,234,1)]"
            style={{ minWidth: `${totalMinWidth}px` }}
          >
            {columnWidths.map((col, index) => (
              <div
                key={`header-${index}`}
                className={`flex items-center px-4 py-3 ${
                  index < columnWidths.length - 1 ? "border-r border-[rgba(223,228,234,1)]" : ""
                } ${col.w}`}
              >
                <Skeleton className="h-5 w-20" />
              </div>
            ))}
          </div>

          {/* Rows skeleton */}
          <div className="w-full">
            {Array(5)
              .fill(0)
              .map((_, rowIndex) => (
                <div
                  key={`row-${rowIndex}`}
                  className="flex w-full border-b border-[rgba(223,228,234,1)]"
                  style={{ minWidth: `${totalMinWidth}px` }}
                >
                  {columnWidths.map((col, colIndex) => (
                    <div
                      key={`cell-${rowIndex}-${colIndex}`}
                      className={`flex items-center px-4 py-3 ${
                        colIndex < columnWidths.length - 1 ? "border-r border-[rgba(223,228,234,1)]" : ""
                      } ${col.w}`}
                    >
                      <Skeleton className="h-4 w-24" />
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

export default InvestorsTableSkeleton; 