
import React from "react";
import { FileX } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = "No persons found for the current page",
  icon = <FileX className="h-12 w-12 text-gray-300" />
}) => {
  return (
    <div className="bg-white rounded-lg border border-dashed border-gray-300 p-10 text-center">
      <div className="flex flex-col items-center justify-center gap-3">
        {icon}
        <p className="text-gray-500 mt-2">{message}</p>
      </div>
    </div>
  );
};

export default EmptyState;
