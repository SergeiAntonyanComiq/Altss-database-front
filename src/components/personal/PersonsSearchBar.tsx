
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Bookmark, Heart, Search, X, Loader2 } from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";

interface SearchParams {
  name: string;
  investor: string;
  firm_type: string;
}

interface PersonsSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch?: () => void;
  onClear?: () => void;
  isLoading?: boolean;
  searchParams?: SearchParams;
  setSearchParams?: (params: SearchParams) => void;
}

const PersonsSearchBar = ({ 
  searchQuery, 
  setSearchQuery,
  onSearch,
  onClear,
  isLoading = false,
  searchParams = { name: "", investor: "", firm_type: "" },
  setSearchParams = () => {}
}: PersonsSearchBarProps) => {
  // Local state to track filter values before submitting
  const [localFilters, setLocalFilters] = useState<SearchParams>(searchParams);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      e.preventDefault();
      onSearch();
    }
  };

  const handleFilterChange = (param: keyof SearchParams, value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      [param]: value
    }));
  };

  const handleApplyFilters = () => {
    // First update the parent component's search params with our local filter values
    setSearchParams(localFilters);
    
    // Set search query to match the name filter for consistency
    if (localFilters.name) {
      setSearchQuery(localFilters.name);
    }
    
    // Close the popover
    setIsPopoverOpen(false);
    
    // Trigger the search to apply filters
    if (onSearch) {
      onSearch();
    }
  };

  const handleClearFilters = () => {
    const emptyFilters = { name: "", investor: "", firm_type: "" };
    setLocalFilters(emptyFilters);
    setSearchParams(emptyFilters);
  };

  // Initialize localFilters with searchParams only when component mounts
  useEffect(() => {
    // Only run this effect on initial mount to prevent update loops
    if (searchParams) {
      setLocalFilters(searchParams);
    }
  }, []); // Empty dependency array - only run on mount

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="relative grow">
        <Input
          type="text"
          placeholder="Search person"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-3 pr-10"
        />
        {searchQuery && (
          <button
            onClick={onClear}
            className="absolute inset-y-0 right-10 flex items-center pr-2"
            type="button"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>
      
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={onSearch}
        disabled={isLoading}
      >
        <Search className="h-4 w-4" />
        Search
      </Button>
      
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-4">
            <h4 className="font-medium">Filter Contacts</h4>
            
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="name">
                Name
              </label>
              <Input
                id="name"
                placeholder="Contact name"
                value={localFilters.name}
                onChange={(e) => handleFilterChange('name', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="investor">
                Investor
              </label>
              <Input
                id="investor"
                placeholder="Investor name"
                value={localFilters.investor}
                onChange={(e) => handleFilterChange('investor', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="firm_type">
                Firm Type
              </label>
              <Input
                id="firm_type"
                placeholder="Firm type"
                value={localFilters.firm_type}
                onChange={(e) => handleFilterChange('firm_type', e.target.value)}
              />
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <Button variant="outline" size="sm" onClick={handleClearFilters}>
                Clear
              </Button>
              <Button size="sm" onClick={handleApplyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      <Button variant="outline" className="flex items-center gap-2">
        <Bookmark className="h-4 w-4" />
        Save this Search
      </Button>
      
      <Button variant="outline" className="flex items-center gap-2">
        <Heart className="h-4 w-4" />
        Add to Favorites
      </Button>
    </div>
  );
};

export default PersonsSearchBar;
