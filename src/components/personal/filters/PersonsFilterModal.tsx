import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookmarkPlus, Search, X } from "lucide-react";
import SavedFilters from "./components/SavedFilters";
import { useFilterModal } from "./hooks/useFilterModal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Scrollbar } from "@radix-ui/react-scroll-area";

interface PersonsFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFirmTypes: string[];
  onApplyFilters: (filters: {
    firmTypes: string[];
    companyName: string;
    position: string;
    location: string;
    responsibilities: string;
    bio: string;
  }) => void;
}

const FilterInput = ({ id, label, value, onChange, placeholder }: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="text-sm font-medium">
      {label}
    </Label>
    <div className="relative">
      <Input 
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-10"
      />
      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  </div>
);

const PersonsFilterModal = ({
  isOpen,
  onClose,
  selectedFirmTypes,
  onApplyFilters,
}: PersonsFilterModalProps) => {
  const {
    firmTypes,
    loading,
    error,
    searchTerm,
    selectedTypes,
    savedFilters,
    filterName,
    showSaveFilterInput,
    companyNameFilter,
    positionFilter,
    locationFilter,
    responsibilitiesFilter,
    bioFilter,
    setSearchTerm,
    toggleFirmType,
    removeSelectedType,
    clearAllFilters,
    setFilterName,
    setShowSaveFilterInput,
    handleSaveFilter,
    handleDeleteFilter,
    applyFilter,
    setCompanyNameFilter,
    setPositionFilter,
    setLocationFilter,
    setResponsibilitiesFilter,
    setBioFilter
  } = useFilterModal(selectedFirmTypes);

  const handleApply = () => {
    onApplyFilters({
      firmTypes: Array.isArray(selectedTypes) ? selectedTypes : [],
      companyName: companyNameFilter.trim(),
      position: positionFilter.trim(),
      location: locationFilter.trim(),
      responsibilities: responsibilitiesFilter.trim(),
      bio: bioFilter.trim()
    });
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleClearFilters = () => {
    clearAllFilters();
    onApplyFilters({
      firmTypes: [],
      companyName: "",
      position: "",
      location: "",
      responsibilities: "",
      bio: ""
    });
    onClose();
  };

  const hasActiveFilters = (Array.isArray(selectedTypes) && selectedTypes.length > 0) || 
    companyNameFilter || 
    positionFilter || 
    locationFilter || 
    responsibilitiesFilter || 
    bioFilter;

  const activeFiltersCount = [
    Array.isArray(selectedTypes) && selectedTypes.length > 0,
    companyNameFilter,
    positionFilter,
    locationFilter,
    responsibilitiesFilter,
    bioFilter
  ].filter(Boolean).length;

  // Filter firm types based on search term
  const filteredFirmTypes = firmTypes.filter(type => 
    type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Filter Persons</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="create" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="w-full">
            <TabsTrigger value="create" className="flex-1">Create Filter</TabsTrigger>
            <TabsTrigger value="saved" className="flex-1">Saved Filters</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="flex-1 overflow-hidden flex flex-col mt-4">
            <ScrollArea className="flex-1 px-1">
              <div className="space-y-6">
                {/* Input Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <FilterInput
                    id="bio"
                    label="Filter by Bio/About"
                    value={bioFilter}
                    onChange={setBioFilter}
                    placeholder="Search in bio..."
                  />
                  <FilterInput
                    id="position"
                    label="Filter by Position"
                    value={positionFilter}
                    onChange={setPositionFilter}
                    placeholder="Search by position..."
                  />
                  <FilterInput
                    id="location"
                    label="Filter by Location"
                    value={locationFilter}
                    onChange={setLocationFilter}
                    placeholder="Search by location..."
                  />
                  <FilterInput
                    id="responsibilities"
                    label="Filter by Responsibilities"
                    value={responsibilitiesFilter}
                    onChange={setResponsibilitiesFilter}
                    placeholder="Search in responsibilities..."
                  />
                  <FilterInput
                      id="companyName"
                    label="Filter by Company Name"
                    value={companyNameFilter}
                    onChange={setCompanyNameFilter}
                      placeholder="Enter company name..."
                    />
                </div>

                {/* Firm Types Filter (Simplified) */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Filter by Company Type</h3>
                    {selectedTypes.length > 0 && (
                      <span className="text-xs text-gray-500">
                        {selectedTypes.length} selected
                      </span>
                    )}
                  </div>
                  
                  {/* Search for firm types */}
                  <div className="relative">
                    <Input
                      placeholder="Search company types..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-10"
                    />
                     <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  {/* List of firm types */}
                  {loading && <p className="text-sm text-gray-500">Loading types...</p>}
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  {!loading && !error && (
                    <ScrollArea className="h-[150px] border rounded-md p-2">
                      <div className="space-y-2">
                        {filteredFirmTypes.length > 0 ? (
                          filteredFirmTypes.map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`type-${type}`}
                                checked={Array.isArray(selectedTypes) && selectedTypes.includes(type)}
                                onCheckedChange={() => toggleFirmType(type)}
                              />
                              <label 
                                htmlFor={`type-${type}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {type}
                              </label>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500 text-center py-4">No types match your search.</p>
                        )}
                      </div>
                      <Scrollbar orientation="vertical" />
                    </ScrollArea>
                  )}
                  
                  {Array.isArray(selectedTypes) && selectedTypes.length > 0 && (
                     <Button 
                       variant="link" 
                       size="sm" 
                       onClick={clearAllFilters} 
                       className="text-red-500 p-0 h-auto"
                     >
                       Clear selected types
                     </Button>
                  )}
                </div>

                {/* Save Filter UI */}
                {hasActiveFilters && (
                  <div className="mt-4">
                    {showSaveFilterInput ? (
                      <div className="flex items-center gap-2">
                        <Input 
                          placeholder="Enter filter name" 
                          value={filterName}
                          onChange={(e) => setFilterName(e.target.value)}
                          className="flex-1"
                        />
                        <Button 
                          onClick={handleSaveFilter}
                          variant="outline"
                          size="sm"
                          disabled={!filterName}
                        >
                          Save
                        </Button>
                        <Button
                          onClick={() => {
                            setShowSaveFilterInput(false);
                            setFilterName('');
                          }}
                          variant="ghost"
                          size="sm"
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowSaveFilterInput(true)}
                        className="w-full"
                      >
                        <BookmarkPlus className="mr-2 h-4 w-4" />
                        Save this filter combination
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="saved" className="flex-1 overflow-auto">
            <SavedFilters 
              savedFilters={savedFilters}
              onApplyFilter={applyFilter}
              onDeleteFilter={handleDeleteFilter}
              currentActiveFilter={selectedTypes}
              onClearFilter={handleClearFilters}
            />
          </TabsContent>
        </Tabs>

        <DialogFooter className="pt-4 sm:justify-between">
          <Button variant="outline" onClick={handleClearFilters}>
            Clear All
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleApply}>
              Apply Filters
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2 bg-white text-primary">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PersonsFilterModal;
