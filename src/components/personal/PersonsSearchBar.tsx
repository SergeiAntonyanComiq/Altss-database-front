import React, { useState, useEffect, KeyboardEvent } from "react";
import { Search, Filter, Save, Heart, X } from "lucide-react";
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
  companyNameFilter: string;
  positionFilter: string;
  locationFilter: string;
  responsibilitiesFilter: string;
  bioFilter: string;
  onFilterChange?: (filters: {
    firmTypes: string[];
    companyName: string;
    position: string;
    location: string;
    responsibilities: string;
    bio: string;
  }) => void;
  onSearch?: (query: string) => void;
}

const PersonsSearchBar = ({ 
  searchQuery, 
  setSearchQuery,
  selectedFirmTypes = [], 
  companyNameFilter,
  positionFilter,
  locationFilter,
  responsibilitiesFilter,
  bioFilter,
  onFilterChange,
  onSearch
}: PersonsSearchBarProps) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [savedFilters, setSavedFilters] = useState<SavedFilterType[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setSavedFilters(getSavedFilters());
  }, [isFilterModalOpen]); // Обновляем при закрытии/открытии модалки, если фильтры могли измениться

  // Применяем сохраненный фильтр
  const handleApplySavedFilter = (filter: SavedFilterType) => {
    if (onFilterChange) {
      onFilterChange({
        firmTypes: filter.firmTypes,
        companyName: filter.companyName || "",
        position: filter.position || "",
        location: filter.location || "",
        responsibilities: filter.responsibilities || "",
        bio: filter.bio || ""
      });
    }
  };

  // Очищаем все фильтры
  const handleClearFilters = () => {
    if (onFilterChange) {
      onFilterChange({
        firmTypes: [],
        companyName: "",
        position: "",
        location: "",
        responsibilities: "",
        bio: ""
      });
    }
    toast({
      title: "Filters Cleared",
      description: "Showing all contacts",
    });
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    
    // If search input is cleared, reset the search results
    if (newValue === '' && onSearch) {
      onSearch('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      e.preventDefault();
      onSearch(searchQuery);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  // Определяем активность фильтров на основе пропов
  const hasActiveFilters = selectedFirmTypes.length > 0 || 
    companyNameFilter || 
    positionFilter || 
    locationFilter || 
    responsibilitiesFilter || 
    bioFilter;

  const activeFiltersCount = [
    selectedFirmTypes.length > 0,
    companyNameFilter,
    positionFilter,
    locationFilter,
    responsibilitiesFilter,
    bioFilter
  ].filter(Boolean).length;

  return (
    <div className="flex min-h-11 gap-4 text-base text-[rgba(99,115,129,1)] font-medium flex-wrap mt-10 w-full">
      {/* Search Input */}
      <div className="min-w-60 min-h-11 text-gray-400 font-normal w-[363px]">
        <div className="w-full flex-1">
          <div className="justify-between items-center border border-[#DFE4EA] bg-white flex w-full gap-2 flex-1 h-full pl-5 pr-4 py-3 rounded-[50px]">
            <input 
              type="text"
              placeholder="Search the person"
              className="self-stretch my-auto bg-transparent outline-none flex-1"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyDown={handleKeyDown}
            />
            <button 
              onClick={searchQuery ? handleClearSearch : () => onSearch && onSearch(searchQuery)}
              className="cursor-pointer hover:text-gray-600 transition-colors p-1"
            >
              {searchQuery ? (
                <X className="h-4 w-4 text-gray-500" />
              ) : (
                <Search className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Filters Button */}
      <button 
        className={`justify-center items-center border ${hasActiveFilters ? 'bg-primary text-white border-primary hover:bg-primary/90' : 'border-[#DFE4EA] bg-white hover:bg-gray-50'} flex gap-2 whitespace-nowrap px-4 py-2.5 rounded-[50px] transition-colors`}
        onClick={() => setIsFilterModalOpen(true)}
      >
        <Filter className="h-[18px] w-[18px]" />
        <span>Filters</span>
        {hasActiveFilters && (
          <Badge variant="secondary" className="bg-white text-primary ml-1 h-5 px-1.5">
            {activeFiltersCount}
          </Badge>
        )}
      </button>
      
      {/* Save Search Button (Placeholder) */}
      {/* <button 
        className="justify-center items-center border border-[#DFE4EA] bg-white flex gap-2 text-[rgba(136,153,168,1)] px-[15px] py-2.5 rounded-[50px] hover:bg-gray-50 transition-colors"
      >
        <Save className="h-[18px] w-[18px]" />
        <span>Save this Search</span>
      </button> */}
      
      {/* Add to Favorites Button (Placeholder) */}
      {/* <button 
        className="justify-center items-center border border-[#DFE4EA] bg-white flex gap-2 px-[15px] py-2.5 rounded-[50px] hover:bg-gray-50 transition-colors"
      >
        <Heart className="h-[18px] w-[18px]" />
        <span>Add to Favorites</span>
      </button> */}

      {/* Saved Filters Quick Access */}
      {onFilterChange && savedFilters.length > 0 && (
        <SavedFiltersQuickAccess
          savedFilters={savedFilters}
          onApplyFilter={handleApplySavedFilter}
          onClearFilter={handleClearFilters}
          currentActiveFilter={selectedFirmTypes}
        />
      )}

      {/* Filter Modal */}
      <PersonsFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        selectedFirmTypes={selectedFirmTypes}
        onApplyFilters={onFilterChange}
      />
    </div>
  );
};

export default PersonsSearchBar;
