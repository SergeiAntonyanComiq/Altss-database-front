
import React, { useState, useEffect } from "react";
import { Search, Filter, Save, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import PersonsFilterModal from "./filters/PersonsFilterModal";
import { Badge } from "@/components/ui/badge";
import SavedFiltersQuickAccess from "./filters/components/SavedFiltersQuickAccess";
import { getSavedFilters } from "@/services/savedFiltersService";
import { SavedFilterType } from "./filters/hooks/useFilterModal";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { saveSearch } from "@/services/savedSearchesService";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

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
  const [isSaveSearchOpen, setIsSaveSearchOpen] = useState(false);
  const [searchName, setSearchName] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const handleSaveSearch = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save searches",
        variant: "destructive",
      });
      return;
    }

    if (!searchName.trim()) {
      toast({
        title: "Search name required",
        description: "Please enter a name for your saved search",
        variant: "destructive",
      });
      return;
    }

    const result = await saveSearch(searchName, {
      firmTypes: selectedFirmTypes,
      searchQuery: searchQuery || undefined,
    });

    if (result) {
      setIsSaveSearchOpen(false);
      setSearchName("");
    }
  };

  const hasActiveFilters = selectedFirmTypes.length > 0;
  const hasActiveSearch = searchQuery.trim().length > 0;

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
        onClick={() => {
          if (user) {
            setIsSaveSearchOpen(true);
          } else {
            toast({
              title: "Authentication required",
              description: "Please sign in to save searches",
              variant: "destructive",
            });
          }
        }}
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

      {/* Save Search Dialog */}
      <Dialog open={isSaveSearchOpen} onOpenChange={setIsSaveSearchOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Save Search</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input 
                id="searchName" 
                placeholder="Enter search name"
                className="col-span-4" 
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                autoFocus
              />
            </div>
            {(hasActiveFilters || hasActiveSearch) && (
              <div className="text-sm text-muted-foreground">
                {hasActiveFilters && (
                  <div>
                    <span className="font-medium">Filters:</span> {selectedFirmTypes.join(', ')}
                  </div>
                )}
                {hasActiveSearch && (
                  <div>
                    <span className="font-medium">Search:</span> "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSaveSearchOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSearch}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PersonsSearchBar;
