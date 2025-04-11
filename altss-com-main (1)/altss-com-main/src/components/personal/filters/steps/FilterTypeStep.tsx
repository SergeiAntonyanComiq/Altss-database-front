
import React from "react";
import { ChevronRight } from "lucide-react";

interface FilterTypeStepProps {
  onSelectFilterType: () => void;
}

const FilterTypeStep: React.FC<FilterTypeStepProps> = ({ onSelectFilterType }) => {
  return (
    <div className="py-4">
      <h3 className="font-medium mb-3">Choose filter type</h3>
      <div 
        className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-accent"
        onClick={onSelectFilterType}
      >
        <div className="flex-1">
          <p className="font-medium">Company type</p>
          <p className="text-sm text-muted-foreground">Filter by company type</p>
        </div>
        <ChevronRight className="h-5 w-5" />
      </div>
      
      {/* Placeholder for future filter types */}
      <div className="mt-2 p-3 border rounded-md bg-muted/50">
        <p className="font-medium text-muted-foreground">More filters</p>
        <p className="text-sm text-muted-foreground">Coming soon</p>
      </div>
    </div>
  );
};

export default FilterTypeStep;
