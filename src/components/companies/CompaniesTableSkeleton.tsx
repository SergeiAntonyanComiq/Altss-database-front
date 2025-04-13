import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CompaniesTableSkeleton = () => {
  const columnWidths = [
    { w: "w-12 min-w-[48px]", mw: 48 }, // Checkbox
    { w: "w-[250px] min-w-[250px]", mw: 250 }, // Company Name
    { w: "w-[180px] min-w-[180px]", mw: 180 }, // Company Type
    { w: "w-[150px] min-w-[150px]", mw: 150 }, // AUM
    { w: "w-[150px] min-w-[150px]", mw: 150 }, // Founded year
    { w: "w-[150px] min-w-[150px]", mw: 150 }, // Known Team
    { w: "w-12 min-w-[48px]", mw: 48 }  // Favorite
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
                className={`flex items-center px-4 py-3 ${index < columnWidths.length - 1 ? 'border-r border-[rgba(223,228,234,1)]' : ''} ${col.w}`}
              >
                <Skeleton className="h-5 w-20" />
              </div>
            ))}
          </div>
          
          {/* Table rows skeleton */}
          <div className="w-full">
            {Array(5).fill(0).map((_, rowIndex) => (
              <div 
                key={`row-${rowIndex}`} 
                className="flex w-full border-b border-[rgba(223,228,234,1)]"
                style={{ minWidth: `${totalMinWidth}px` }}
              >
                {columnWidths.map((col, colIndex) => (
                  <div 
                    key={`cell-${rowIndex}-${colIndex}`} 
                    className={`flex items-center px-4 py-3 ${colIndex < columnWidths.length - 1 ? 'border-r border-[rgba(223,228,234,1)]' : ''} ${col.w}`}
                  >
                    {/* Placeholder content for each column */}
                    {colIndex === 0 && <Skeleton className="h-4 w-4 rounded" />} {/* Checkbox */}
                    {colIndex === 1 && <Skeleton className="h-6 w-32" />} {/* Company Name */}
                    {colIndex === 2 && <Skeleton className="h-6 w-24 rounded-md" />} {/* Type Badge */}
                    {colIndex === 3 && <Skeleton className="h-4 w-16" />} {/* AUM */}
                    {colIndex === 4 && <Skeleton className="h-4 w-16" />} {/* Founded */}
                    {colIndex === 5 && <Skeleton className="h-4 w-16" />} {/* Team */}
                    {colIndex === 6 && <Skeleton className="h-6 w-6 rounded" />} {/* Favorite */}
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

export default CompaniesTableSkeleton;
