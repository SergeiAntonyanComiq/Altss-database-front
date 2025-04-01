
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Bookmark, Heart, Search } from "lucide-react";
import PersonsFilterModal from "./filters/PersonsFilterModal";
import { Badge } from "@/components/ui/badge";

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
  onFilterChange = () => {}
}: PersonsSearchBarProps) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const openFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const hasActiveFilters = selectedFirmTypes.length > 0;

  return (
    <>
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative grow">
          <Input
            type="text"
            placeholder="Search person"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-3 pr-10"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        
        <Button 
          variant={hasActiveFilters ? "default" : "outline"} 
          className={`flex items-center gap-2 ${hasActiveFilters ? "bg-primary text-primary-foreground" : ""}`}
          onClick={openFilterModal}
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="bg-white text-primary ml-1 h-5 px-1.5">
              {selectedFirmTypes.length}
            </Badge>
          )}
        </Button>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Bookmark className="h-4 w-4" />
          Save this Search
        </Button>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Heart className="h-4 w-4" />
          Add to Favorites
        </Button>
      </div>

      <PersonsFilterModal
        isOpen={isFilterModalOpen}
        onClose={closeFilterModal}
        selectedFirmTypes={selectedFirmTypes}
        onApplyFilters={onFilterChange}
      />
    </>
  );
};

export default PersonsSearchBar;
