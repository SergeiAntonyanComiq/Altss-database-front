
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import PersonsFilterModal from "./filters/PersonsFilterModal";
import SavedFiltersQuickAccess from "./filters/components/SavedFiltersQuickAccess";
import { getSavedFilters } from "@/services/savedFiltersService";
import { SavedFilterType } from "./filters/hooks/useFilterModal";

interface PersonsSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFirmTypes?: string[];
  onFilterChange?: (firmTypes: string[]) => void;
}

const PersonsSearchBar = ({ 
  searchQuery, 
  setSearchQuery,
  selectedFirmTypes = [], 
  onFilterChange
}: PersonsSearchBarProps) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [savedFilters, setSavedFilters] = useState<SavedFilterType[]>([]);

  // Load saved filters on component mount
  useEffect(() => {
    setSavedFilters(getSavedFilters());
  }, []);

  const handleFilterChange = (firmTypes: string[]) => {
    if (onFilterChange) {
      onFilterChange(firmTypes);
    }
    // Refresh saved filters after changes
    setSavedFilters(getSavedFilters());
  };

  const handleApplySavedFilter = (filter: SavedFilterType) => {
    if (onFilterChange) {
      onFilterChange(filter.firmTypes);
    }
  };

  return (
    <div className="mt-6">
      <div className="flex space-x-4">
        <div className="relative w-full">
          <Input
            placeholder="Search persons..."
            className="w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setIsFilterModalOpen(true)}
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {selectedFirmTypes.length > 0 && (
            <span className="bg-primary/15 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {selectedFirmTypes.length}
            </span>
          )}
        </Button>
      </div>

      {/* Show saved filters quick access if we have filters and filter capability */}
      {onFilterChange && (
        <SavedFiltersQuickAccess
          savedFilters={savedFilters}
          onApplyFilter={handleApplySavedFilter}
          currentActiveFilter={selectedFirmTypes}
        />
      )}

      {/* Filter Modal */}
      {onFilterChange && (
        <PersonsFilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          selectedFirmTypes={selectedFirmTypes}
          onApplyFilters={handleFilterChange}
        />
      )}
    </div>
  );
};

export default PersonsSearchBar;
