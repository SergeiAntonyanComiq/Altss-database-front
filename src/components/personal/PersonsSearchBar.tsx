
import React, { useState, useEffect } from "react";
import { Search, Filter, Save, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import PersonsFilterModal from "./filters/PersonsFilterModal";
import { Badge } from "@/components/ui/badge";
import SavedFiltersQuickAccess from "./filters/components/SavedFiltersQuickAccess";
import { getSavedFilters, saveFilter, saveSearchToDatabase } from "@/services/savedSearchesService";
import { SavedFilterType } from "./filters/hooks/useFilterModal";
import { useToast } from "@/components/ui/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

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
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [searchName, setSearchName] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();

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
    if (!searchName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for your search",
        variant: "destructive",
      });
      return;
    }

    if (selectedFirmTypes.length === 0 && !searchQuery) {
      toast({
        title: "Error",
        description: "Please select at least one filter or enter a search query",
        variant: "destructive",
      });
      return;
    }

    try {
      // First save locally for backward compatibility
      const newFilter = saveFilter(searchName, selectedFirmTypes);
      
      // Then save to database if user is logged in
      if (user) {
        const savedSearch = await saveSearchToDatabase(searchName, {
          firmTypes: selectedFirmTypes,
          searchQuery: searchQuery || undefined
        });
        
        if (savedSearch) {
          toast({
            title: "Success",
            description: `Search "${searchName}" has been saved`,
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to save search to your account",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Success",
          description: `Search "${searchName}" has been saved locally. Log in to save it to your account.`,
        });
      }
      
      setIsSaveDialogOpen(false);
      setSearchName("");
      setSavedFilters([...savedFilters, newFilter]);
      
    } catch (err) {
      console.error("Error saving search:", err);
      toast({
        title: "Error",
        description: "Failed to save search",
        variant: "destructive",
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
        onClick={() => setIsSaveDialogOpen(true)}
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
      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Save Search</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right col-span-1">
                Name
              </label>
              <Input
                id="name"
                placeholder="My search"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="col-span-3"
              />
            </div>
            {selectedFirmTypes.length > 0 && (
              <div className="col-span-4 mt-2">
                <div className="text-muted-foreground text-sm">
                  Filters: {selectedFirmTypes.join(', ')}
                </div>
              </div>
            )}
            {searchQuery && (
              <div className="col-span-4 mt-2">
                <div className="text-muted-foreground text-sm">
                  Search term: "{searchQuery}"
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSearch}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PersonsSearchBar;
