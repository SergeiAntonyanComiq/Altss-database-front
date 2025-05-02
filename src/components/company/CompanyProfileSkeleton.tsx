import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CompanyProfileSkeleton: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header skeleton */}
      <div className="mb-6">
        <Skeleton className="h-5 w-36 mb-2" />
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-8 w-64" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
      
      {/* Tabs skeleton */}
      <div className="mb-6">
        <div className="flex gap-4 border-b border-[#DFE4EA]">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="space-y-8">
        <div>
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col">
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-5 w-full" />
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center">
                <Skeleton className="h-8 w-8 rounded-full mr-3" />
                <Skeleton className="h-5 w-64" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileSkeleton;
