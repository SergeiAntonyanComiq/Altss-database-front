
import React, { useState, useEffect } from "react";
import { Search, Filter, Save, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import PersonsFilterModal from "./filters/PersonsFilterModal";
import { Badge } from "@/components/ui/badge";
import SavedFiltersQuickAccess from "./filters/components/SavedFiltersQuickAccess";
import { getSavedFilters } from "@/services/savedFiltersService";
import { SavedFilterType } from "./filters/hooks/useFilterModal";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

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

  const handleClearFilters = () => {
    if (onFilterChange) {
      onFilterChange([]);
      toast({
        title: "Filters Cleared",
        description: "Showing all contacts",
      });
    }
  };

  const hasActiveFilters = selectedFirmTypes.length > 0;

  return (
    <div className="flex min-h-11 gap-4 text-base text-[rgba(99,115,129,1)] font-medium flex-wrap mt-10 w-full">
      <div className="min-w-60 min-h-11 text-gray-400 font-normal w-[363px]">
        <div className="w-full flex-1">
          <div className="justify-between items-center border border-[#DFE4EA] bg-white flex w-full gap-[40px_100px] flex-1 h-full pl-5 pr-4 py-3 rounded-[50px]">
            <input 
              type="text"
              placeholder="Search the person"
              className="self-stretch my-auto bg-transparent outline-none flex-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
      
      <button 
        className={`justify-center items-center border ${hasActiveFilters ? 'bg-primary text-white border-primary' : 'border-[#DFE4EA] bg-white'} flex gap-2 whitespace-nowrap px-[15px] py-2.5 rounded-[50px]`}
        onClick={() => setIsFilterModalOpen(true)}
      >
        <Filter className="h-[18px] w-[18px]" />
        <span>Filters</span>
        {hasActiveFilters && (
          <Badge variant="secondary" className="bg-white text-primary ml-1 h-5 px-1.5">
            {selectedFirmTypes.length}
          </Badge>
        )}
      </button>
      
      <button 
        className="justify-center items-center border border-[#DFE4EA] bg-white flex gap-2 text-[rgba(136,153,168,1)] px-[15px] py-2.5 rounded-[50px]"
      >
        <Save className="h-[18px] w-[18px]" />
        <span>Save this Search</span>
      </button>
      
      <button 
        className="justify-center items-center border border-[#DFE4EA] bg-white flex gap-2 px-[15px] py-2.5 rounded-[50px]"
      >
        <Heart className="h-[18px] w-[18px]" />
        <span>Add to Favorites</span>
      </button>

      {/* Show saved filters quick access if we have filters and filter capability */}
      {onFilterChange && savedFilters.length > 0 && (
        <SavedFiltersQuickAccess
          savedFilters={savedFilters}
          onApplyFilter={handleApplySavedFilter}
          onClearFilter={handleClearFilters}
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
