
import React from "react";
import { SavedFilterType } from "../hooks/useFilterModal";
import { Button } from "@/components/ui/button";
import { Check, Trash2, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

interface SavedFiltersProps {
  savedFilters: SavedFilterType[];
  onApplyFilter: (filter: SavedFilterType) => void;
  onDeleteFilter: (id: string, name: string) => void;
  currentActiveFilter: string[];
}

const SavedFilters: React.FC<SavedFiltersProps> = ({ 
  savedFilters, 
  onApplyFilter, 
  onDeleteFilter,
  currentActiveFilter
}) => {
  if (savedFilters.length === 0) {
    return (
      <div className="text-center py-4 text-sm text-muted-foreground">
        You don't have any saved filters yet.
        Save your current filter selection to quickly apply it later.
      </div>
    );
  }

  // Check if current selection matches a saved filter
  const isFilterActive = (filter: SavedFilterType) => {
    if (currentActiveFilter.length !== filter.firmTypes.length) return false;
    return filter.firmTypes.every(type => currentActiveFilter.includes(type));
  };

  return (
    <div className="space-y-2">
      <h4 className="font-medium mb-2">Saved Filters</h4>
      {savedFilters.map((filter) => (
        <div 
          key={filter.id}
          className={cn(
            "flex items-center justify-between p-2 rounded-md border", 
            isFilterActive(filter) ? "border-primary bg-primary/5" : "border-border"
          )}
        >
          <div className="flex items-center gap-2">
            <Tag size={16} className="text-muted-foreground" />
            <span className="font-medium">{filter.name}</span>
            <span className="text-xs text-muted-foreground">
              ({filter.firmTypes.length} {filter.firmTypes.length === 1 ? 'filter' : 'filters'})
            </span>
          </div>
          <div className="flex gap-1">
            <Button 
              variant={isFilterActive(filter) ? "default" : "outline"} 
              size="sm" 
              onClick={() => onApplyFilter(filter)}
              className="h-7"
            >
              {isFilterActive(filter) ? (
                <>
                  <Check size={14} className="mr-1" /> Applied
                </>
              ) : (
                "Apply"
              )}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onDeleteFilter(filter.id, filter.name)}
              className="h-7"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedFilters;
