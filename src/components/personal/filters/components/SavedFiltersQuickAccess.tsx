
import React from "react";
import { Button } from "@/components/ui/button";
import { Tag, Star } from "lucide-react";
import { SavedFilterType } from "../hooks/useFilterModal";
import { cn } from "@/lib/utils";

interface SavedFiltersQuickAccessProps {
  savedFilters: SavedFilterType[];
  onApplyFilter: (filter: SavedFilterType) => void;
  currentActiveFilter: string[];
}

const SavedFiltersQuickAccess: React.FC<SavedFiltersQuickAccessProps> = ({ 
  savedFilters,
  onApplyFilter,
  currentActiveFilter
}) => {
  // Only show if we have saved filters
  if (savedFilters.length === 0) {
    return null;
  }

  // Check if current selection matches a saved filter
  const isFilterActive = (filter: SavedFilterType) => {
    if (currentActiveFilter.length !== filter.firmTypes.length) return false;
    return filter.firmTypes.every(type => currentActiveFilter.includes(type));
  };

  // Limit to showing maximum 3 saved filters
  const displayFilters = savedFilters.slice(0, 3);

  return (
    <div className="flex items-center space-x-2 mt-2">
      <span className="text-sm text-muted-foreground">
        <Tag size={14} className="inline mr-1 opacity-70" />
        Saved:
      </span>
      {displayFilters.map(filter => (
        <Button
          key={filter.id}
          size="sm"
          variant={isFilterActive(filter) ? "default" : "outline"}
          className={cn(
            "h-7 text-xs",
            isFilterActive(filter) && "bg-primary/90 text-primary-foreground"
          )}
          onClick={() => onApplyFilter(filter)}
        >
          {isFilterActive(filter) && <Star size={12} className="mr-1" />}
          {filter.name}
        </Button>
      ))}
      {savedFilters.length > 3 && (
        <span className="text-xs text-muted-foreground">
          +{savedFilters.length - 3} more
        </span>
      )}
    </div>
  );
};

export default SavedFiltersQuickAccess;
