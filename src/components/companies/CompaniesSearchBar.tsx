import React, { useState, useEffect } from "react";
import { Search, Filter, Save, Heart, Settings, X } from "lucide-react";
import CompaniesFilterModal from "./filters/CompaniesFilterModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { addCompanyToFavorites, isCompanyInFavorites, saveFilter } from "@/services/savedFiltersService";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface CompanyFilters {
  firmTypes: string[];
  firmName: string;
  city: string;
  country: string;
  region: string;
  background: string;
  yearEst: string;
  totalStaff: string;
  peMainFirmStrategy: string;
  peGeographicExposure: string;
}

interface CompaniesSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch?: (query: string) => void;
  selectedFirmTypes?: string[];
  activeFilters?: CompanyFilters;
  onFilterChange?: (filters: {
    firmTypes: string[];
    firmName: string;
    city: string;
    country: string;
    region: string;
    background: string;
    yearEst: string;
    totalStaff: string;
    peMainFirmStrategy: string;
    peGeographicExposure: string;
  }) => void;
  selectedCompanies: string[];
  companies: CompanyType[];
  toggleFavorite: (id: string, event: React.MouseEvent) => void;
  onColumnsClick: () => void;
}

import { CompanyType } from "@/types/company";

const CompaniesSearchBar = ({ 
  searchQuery, 
  setSearchQuery,
  onSearch,
  selectedFirmTypes = [],
  activeFilters = {
    firmTypes: [],
    firmName: "",
    city: "",
    country: "",
    region: "",
    background: "",
    yearEst: "",
    totalStaff: "",
    peMainFirmStrategy: "",
    peGeographicExposure: ""
  },
  onFilterChange = () => {
    // Default empty filter object
    return {
      firmTypes: [],
      firmName: "",
      city: "",
      country: "",
      region: "",
      background: "",
      yearEst: "",
      totalStaff: "",
      peMainFirmStrategy: "",
      peGeographicExposure: ""
    };
  },
  selectedCompanies,
  companies,
  toggleFavorite,
  onColumnsClick
}: CompaniesSearchBarProps) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [filterName, setFilterName] = useState("");
  const { toast } = useToast();

  // Implement search-as-you-type functionality
  useEffect(() => {
    // Only trigger search when query has at least 3 characters
    if (searchQuery.length >= 3 && onSearch) {
      // Add a small delay to avoid too many API calls while typing
      const timer = setTimeout(() => {
        onSearch(searchQuery);
      }, 300);
      
      // Clean up the timer
      return () => clearTimeout(timer);
    } else if (searchQuery.length === 0 && onSearch) {
      // Clear search when query is empty
      onSearch('');
    }
  }, [searchQuery, onSearch]);

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
        'company', // Explicitly set type for companies section
        selectedFirmTypes,
        activeFilters.firmName,
        activeFilters.city,
        activeFilters.country,
        activeFilters.region,
        activeFilters.background
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
    if (selectedCompanies.length === 0) {
      toast({
        title: "No companies selected",
        description: "Please select at least one company to add to favorites",
        variant: "destructive"
      });
      return;
    }

    try {
      const selectedCompaniesDetails = companies.filter(company => 
        selectedCompanies.includes(company.id || '')
      );
      
      let addedCount = 0;
      await Promise.all(selectedCompaniesDetails.map(async (company) => {
        const isFavorite = await isCompanyInFavorites(company.id || '');
        if (!isFavorite) {
          await addCompanyToFavorites(
            company.id || '',
            company.name || '',
            company.type || '',
            company.location || ''
          );
          addedCount++;
        }
      }));
      
      if (addedCount > 0) {
        toast({
          title: "Added to favorites",
          description: `${addedCount} ${addedCount === 1 ? "company has" : "companies have"} been added to your favorites`,
        });
        const event = new CustomEvent('favoritesUpdated');
        window.dispatchEvent(event);
      } else {
        toast({
          title: "Already in favorites",
          description: "The selected companies are already in your favorites",
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

  const openFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const hasActiveFilters = selectedFirmTypes.length > 0 || 
    activeFilters?.firmName || 
    activeFilters?.city || 
    activeFilters?.country || 
    activeFilters?.region || 
    activeFilters?.background || 
    activeFilters?.yearEst || 
    activeFilters?.totalStaff || 
    activeFilters?.peMainFirmStrategy || 
    activeFilters?.peGeographicExposure;

  const activeFiltersCount = [
    selectedFirmTypes.length > 0,
    activeFilters?.firmName,
    activeFilters?.city,
    activeFilters?.country,
    activeFilters?.region,
    activeFilters?.background,
    activeFilters?.yearEst,
    activeFilters?.totalStaff,
    activeFilters?.peMainFirmStrategy,
    activeFilters?.peGeographicExposure
  ].filter(Boolean).length;

  return (
    <>
      <div className="flex min-h-11 gap-4 text-base text-[rgba(99,115,129,1)] font-medium flex-wrap mt-10 w-full">
        <div className="min-w-60 min-h-11 text-gray-400 font-normal w-[363px]">
          <div className="w-full flex-1">
            <div className="justify-between items-center border border-[#DFE4EA] bg-white flex w-full gap-2 flex-1 h-full pl-5 pr-4 py-3 rounded-[50px]">
              <input 
                type="text"
                placeholder="Search the company"
                className="self-stretch my-auto bg-transparent outline-none flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && onSearch) {
                    e.preventDefault();
                    onSearch(searchQuery);
                  }
                }}
              />
              <button 
                onClick={searchQuery ? () => {
                  setSearchQuery('');
                  if (onSearch) onSearch('');
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
        
        <button 
          className={`justify-center items-center border ${hasActiveFilters ? 'bg-primary text-white border-primary hover:bg-primary/90' : 'border-[#DFE4EA] bg-white hover:bg-gray-50'} flex gap-2 whitespace-nowrap px-4 py-2.5 rounded-[50px] transition-colors`}
          onClick={openFilterModal}
        >
          <Filter className="h-[18px] w-[18px]" />
          <span>Filters</span>
          {hasActiveFilters && (
            <Badge variant="secondary" className="bg-white text-primary ml-1 h-5 px-1.5">
              {activeFiltersCount}
            </Badge>
          )}
        </button>
        
        <button 
          className="justify-center items-center border border-[#DFE4EA] bg-white hover:bg-gray-50 flex gap-2 px-4 py-2.5 rounded-[50px] transition-colors"
          onClick={handleSaveSearchClick}
        >
          <Save className="h-[18px] w-[18px]" />
          <span>Save this Search</span>
        </button>
        
        <button 
          className={`justify-center items-center border ${selectedCompanies.length > 0 ? 'bg-primary text-white border-primary hover:bg-primary/90' : 'border-[#DFE4EA] bg-white hover:bg-gray-50'} flex gap-2 px-4 py-2.5 rounded-[50px] transition-colors`}
          onClick={handleAddToFavorites}
        >
          <Heart className="h-[18px] w-[18px]" />
          <span>Add to Favorites</span>
          {selectedCompanies.length > 0 && (
            <Badge variant="secondary" className="bg-white text-primary ml-1 h-5 px-1.5">
              {selectedCompanies.length}
            </Badge>
          )}
        </button>

        <button 
          className="justify-center items-center border border-[#DFE4EA] bg-white flex gap-2 text-[#637381] px-[15px] py-2.5 rounded-[50px]"
          onClick={onColumnsClick}
        >
          <Settings className="h-[18px] w-[18px]" />
          <span>Columns</span>
        </button>
      </div>
      
      <CompaniesFilterModal
        isOpen={isFilterModalOpen}
        onClose={closeFilterModal}
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
    </>
  );
};

export default CompaniesSearchBar;
