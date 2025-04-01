
import React from "react";

interface EmptyStateProps {
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = "No persons found for the current page" 
}) => {
  return (
    <div className="bg-white rounded-lg p-6 text-center">
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default EmptyState;
