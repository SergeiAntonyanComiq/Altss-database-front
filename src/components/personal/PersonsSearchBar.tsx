
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Filter, Tag } from "lucide-react";
import PersonsFilterModal from "./filters/PersonsFilterModal";

interface PersonsSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFirmTypes: string[];
  onFilterChange: (firmTypes: string[]) => void;
}

const PersonsSearchBar: React.FC<PersonsSearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedFirmTypes,
  onFilterChange,
}) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = React.useState(false);

  // Handle opening the filter modal
  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  // Handle clearing the search query
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <>
      <div className="my-6">
        <div className="relative mb-4">
          <Input
            type="text"
            className="w-full pl-10 pr-10 py-2 border rounded-[8px] focus:outline-blue-500 focus:ring-1"
            placeholder="Search persons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          {searchQuery && (
            <button
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={handleClearSearch}
            >
              <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={selectedFirmTypes.length > 0 ? "secondary" : "outline"}
            size="sm"
            className="gap-2"
            onClick={handleOpenFilterModal}
          >
            <Filter className="w-4 h-4" />
            Filter by company type
            {selectedFirmTypes.length > 0 && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium rounded-full px-2 py-0.5">
                {selectedFirmTypes.length}
              </span>
            )}
          </Button>
          
          {selectedFirmTypes.length > 0 && (
            <div className="flex flex-wrap gap-1 items-center">
              {selectedFirmTypes.map((type) => (
                <div
                  key={type}
                  className="flex items-center bg-blue-50 text-blue-700 text-sm rounded-full px-2 py-1"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  <span className="mr-1">{type}</span>
                  <button
                    onClick={() => onFilterChange(selectedFirmTypes.filter(t => t !== type))}
                    className="hover:text-blue-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => onFilterChange([])}
                className="text-sm text-gray-600 hover:text-gray-800 ml-1"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      <PersonsFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        selectedFirmTypes={selectedFirmTypes}
        onApplyFilters={onFilterChange}
      />
    </>
  );
};

export default PersonsSearchBar;
