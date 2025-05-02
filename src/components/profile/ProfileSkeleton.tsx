import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex items-center">
        <Skeleton className="h-4 w-24 mr-2" />
        <Skeleton className="h-4 w-4 mx-2" />
        <Skeleton className="h-4 w-32" />
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-8 w-48" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        
        <div className="flex gap-2 mb-6">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="border-b border-[#DFE4EA] mb-6">
            <div className="flex space-x-8">
              <div className="h-10 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <Skeleton className="h-6 w-24 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
            
            <div>
              <Skeleton className="h-6 w-24 mb-4" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
