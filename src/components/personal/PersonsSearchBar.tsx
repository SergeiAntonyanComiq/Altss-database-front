import React, { useState, useEffect, KeyboardEvent } from "react";
import { Search, Filter, Save, Heart, X, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import PersonsFilterModal from "./filters/PersonsFilterModal";
import { Badge } from "@/components/ui/badge";
import { getSavedFilters, saveFilter, addPersonToFavorites, isPersonInFavorites } from "@/services/savedFiltersService";
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
  selectedPersons?: string[];
  persons?: Array<{id: string, name: string, currentPosition?: string, companies?: string[]}>;
  onColumnsClick?: () => void; // Add this prop
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
  onSearch,
  selectedPersons = [],
  persons = [],
  onColumnsClick
}: PersonsSearchBarProps) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [savedFilters, setSavedFilters] = useState<SavedFilterType[]>([]);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [filterName, setFilterName] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Асинхронная загрузка сохраненных фильтров
    const loadFilters = async () => {
      try {
        const filters = await getSavedFilters();
        setSavedFilters(filters);
      } catch (error) {
        console.error("Error loading saved filters:", error);
        setSavedFilters([]);
      }
    };
    
    loadFilters();
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

  const handleSaveSearchClick = () => {
    setFilterName("");
    setIsSaveDialogOpen(true);
  };

  const handleSaveFilter = async () => {
    if (!filterName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for your filter",
        variant: "destructive"
      });
      return;
    }

    try {
      await saveFilter(
        filterName.trim(),
        'person', // Explicitly set type for persons section
        selectedFirmTypes,
        companyNameFilter,
        positionFilter,
        locationFilter,
        responsibilitiesFilter,
        bioFilter
      );

      setIsSaveDialogOpen(false);
      toast({
        title: "Filter Saved",
        description: `Filter "${filterName}" has been saved successfully`,
      });
    } catch (error) {
      console.error("Error saving filter:", error);
      toast({
        title: "Error",
        description: "There was an error saving your filter",
        variant: "destructive"
      });
    }
  };

  const handleAddToFavorites = async () => {
    // Check if any persons are selected
    if (selectedPersons.length === 0) {
      toast({
        title: "No persons selected",
        description: "Please select at least one person to add to favorites",
        variant: "destructive"
      });
      return;
    }

    try {
      // Get the selected persons' details
      const selectedPersonsDetails = persons.filter(person => 
        selectedPersons.includes(person.id)
      );
      
      let addedCount = 0;
      // Use Promise.all to handle multiple async operations concurrently
      await Promise.all(selectedPersonsDetails.map(async (person) => {
        const isFavorite = await isPersonInFavorites(person.id);
        if (!isFavorite) {
          await addPersonToFavorites(
            person.id,
            person.name,
            person.currentPosition || "",
            person.companies?.[0] || ""
          );
          addedCount++;
        }
      }));
      
      // Show success message
      if (addedCount > 0) {
        toast({
          title: "Added to favorites",
          description: `${addedCount} ${addedCount === 1 ? "person has" : "persons have"} been added to your favorites`,
        });
        // Trigger update for sidebar
        const event = new CustomEvent('favoritesUpdated');
        window.dispatchEvent(event);
      } else {
        toast({
          title: "Already in favorites",
          description: "The selected persons are already in your favorites",
        });
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      toast({
        title: "Error",
        description: "There was a problem adding to your favorites",
        variant: "destructive"
      });
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
      
      {/* Save Search Button */}
      <button 
        className="justify-center items-center border border-[#DFE4EA] bg-white hover:bg-gray-50 flex gap-2 px-4 py-2.5 rounded-[50px] transition-colors"
        onClick={handleSaveSearchClick}
      >
        <Save className="h-[18px] w-[18px]" />
        <span>Save this Search</span>
      </button>
      
      {/* Add to Favorites Button */}
      <button 
        className="justify-center items-center border border-[#DFE4EA] bg-white hover:bg-gray-50 flex gap-2 px-4 py-2.5 rounded-[50px] transition-colors"
        onClick={handleAddToFavorites}
      >
        <Heart className="h-[18px] w-[18px]" />
        <span>Add to Favorites</span>
        {selectedPersons.length > 0 && (
          <Badge variant="secondary" className="bg-primary text-white ml-1 h-5 px-1.5">
            {selectedPersons.length}
          </Badge>
        )}
      </button>

      {/* Columns Button */}
      <button 
        className="justify-center items-center border border-[#DFE4EA] bg-white flex gap-2 text-[#637381] px-[15px] py-2.5 rounded-[50px]"
        onClick={onColumnsClick}
      >
        <Settings className="h-[18px] w-[18px]" />
        <span>Columns</span>
      </button>

      {/* Filter Modal */}
      <PersonsFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        selectedFirmTypes={selectedFirmTypes}
        onApplyFilters={onFilterChange}
      />

      {/* Save Filter Dialog */}
      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Search Filter</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Enter a name for this search filter to save it for future use.
            </p>
            <Input
              placeholder="Filter name"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="w-full"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveFilter}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PersonsSearchBar;
