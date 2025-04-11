import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const PersonTableSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm w-full mt-6">
      <div className="w-full border border-[rgba(223,228,234,1)] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          {/* Header skeleton */}
          <div className="bg-gray-100 flex h-12 w-full select-none rounded-t-lg">
            <div className="w-11 min-w-[44px] border-r border-[rgba(223,228,234,1)] flex items-center justify-center"></div>
            <div className="border-r border-[rgba(223,228,234,1)] px-4 py-3 w-[250px] min-w-[250px]">
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="border-r border-[rgba(223,228,234,1)] px-4 py-3 w-[200px] min-w-[180px]">
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="border-r border-[rgba(223,228,234,1)] px-4 py-3 w-[280px] min-w-[250px]">
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="border-r border-[rgba(223,228,234,1)] px-4 py-3 w-[170px] min-w-[170px]">
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="border-r border-[rgba(223,228,234,1)] px-4 py-3 w-[250px] min-w-[250px]">
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="border-r border-[rgba(223,228,234,1)] px-4 py-3 w-[150px] min-w-[150px]">
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="px-4 py-3 w-[170px] min-w-[170px]">
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
          
          {/* Table rows skeleton */}
          <div className="w-full">
            {Array(5).fill(0).map((_, index) => (
              <div 
                key={index} 
                className="flex w-full border-b border-[rgba(223,228,234,1)]"
                style={{ minWidth: "1280px" }}
              >
                <div className="w-11 min-w-[44px] border-r border-[rgba(223,228,234,1)] flex items-center justify-center py-3">
                  <Skeleton className="h-4 w-4 rounded" />
                </div>
                
                <div className="border-r border-[rgba(223,228,234,1)] px-4 py-3 flex items-center gap-2.5 w-[250px] min-w-[250px]">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-[120px]" />
                </div>
                
                <div className="border-r border-[rgba(223,228,234,1)] px-4 py-3 w-[200px] min-w-[180px]">
                  <Skeleton className="h-4 w-[140px]" />
                </div>
                
                <div className="border-r border-[rgba(223,228,234,1)] px-4 py-3 w-[280px] min-w-[250px]">
                  <Skeleton className="h-4 w-[200px]" />
                </div>
                
                <div className="border-r border-[rgba(223,228,234,1)] px-4 py-3 w-[170px] min-w-[170px]">
                  <Skeleton className="h-6 w-[100px] rounded-full" />
                </div>
                
                <div className="border-r border-[rgba(223,228,234,1)] px-4 py-3 w-[250px] min-w-[250px]">
                  <div className="flex flex-wrap gap-1">
                    <Skeleton className="h-5 w-16 rounded-md" />
                    <Skeleton className="h-5 w-20 rounded-md" />
                  </div>
                </div>
                
                <div className="border-r border-[rgba(223,228,234,1)] px-4 py-3 flex items-center gap-2 w-[150px] min-w-[150px]">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-4 rounded" />
                </div>
                
                <div className="px-4 py-3 w-[170px] min-w-[170px]">
                  <Skeleton className="h-6 w-[100px] rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonTableSkeleton; 