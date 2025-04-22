import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import InvestorsFilterModal from "./filters/InvestorsFilterModal";

interface InvestorsSearchBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSearch?: (q: string) => void;
  filters?: Record<string, any>;
  onFilterChange?: (filters: Record<string, any>) => void;
}

const InvestorsSearchBar: React.FC<InvestorsSearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  onSearch,
  filters = {},
  onFilterChange,
}) => {
  const hasActiveFilters = Object.keys(filters).filter((k) => {
    const v = filters[k];
    return Array.isArray(v) ? v.length > 0 : !!v;
  }).length > 0;
  const activeFiltersCount = Object.keys(filters).filter((k) => {
    const v = filters[k];
    return Array.isArray(v) ? v.length > 0 : !!v;
  }).length;

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  return (
    <>
      <div className="flex min-h-11 gap-4 text-base text-[rgba(99,115,129,1)] font-medium flex-wrap mt-10 w-full">
        <div className="min-w-60 min-h-11 text-gray-400 font-normal w-[363px]">
          <div className="w-full flex-1">
            <div className="justify-between items-center border border-[#DFE4EA] bg-white flex w-full gap-2 flex-1 h-full pl-5 pr-4 py-3 rounded-[50px]">
              <input
                type="text"
                placeholder="Search investor by name"
                className="self-stretch my-auto bg-transparent outline-none flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && onSearch) {
                    e.preventDefault();
                    onSearch(searchQuery);
                  }
                }}
              />
              <button
                onClick={searchQuery ? () => {
                  setSearchQuery("");
                  if (onSearch) onSearch("");
                } : () => onSearch && onSearch(searchQuery)}
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

        {/* Placeholder Filters button */}
        <button
          className={`justify-center items-center border ${hasActiveFilters ? 'bg-primary text-white border-primary hover:bg-primary/90' : 'border-[#DFE4EA] bg-white hover:bg-gray-50 text-[#637381]'} flex gap-2 whitespace-nowrap px-4 py-2.5 rounded-[50px] transition-colors`}
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
      </div>
      {onFilterChange && (
        <InvestorsFilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          selectedFirmTypes={filters.firmTypes || []}
          onApplyFilters={(newFilters) => {
            onFilterChange(newFilters);
          }}
        />
      )}
    </>
  );
};

export default InvestorsSearchBar; 