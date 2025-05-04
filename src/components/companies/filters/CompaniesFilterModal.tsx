import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookmarkPlus, Search, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import SavedFiltersGroup from "../../filters/SavedFiltersGroup";
import { useFilterModal } from "../../personal/filters/hooks/useFilterModal";

interface CompaniesFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFirmTypes: string[];
  onApplyFilters: (filters: {
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
}

const FilterInput = ({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
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

const CompaniesFilterModal = ({
  isOpen,
  onClose,
  selectedFirmTypes,
  onApplyFilters,
}: CompaniesFilterModalProps) => {
  const {
    firmTypes,
    loading,
    error,
    searchTerm,
    selectedTypes,
    savedFilters,
    filterName,
    showSaveFilterInput,
    setSearchTerm,
    toggleFirmType,
    clearAllFilters,
    setFilterName,
    setShowSaveFilterInput,
    handleSaveFilter,
    handleDeleteFilter,
    applyFilter,
  } = useFilterModal(selectedFirmTypes);

  const [firmNameFilter, setFirmNameFilter] = React.useState("");
  const [cityFilter, setCityFilter] = React.useState("");
  const [countryFilter, setCountryFilter] = React.useState("");
  const [regionFilter, setRegionFilter] = React.useState("");
  const [backgroundFilter, setBackgroundFilter] = React.useState("");
  const [yearEstFilter, setYearEstFilter] = React.useState("");
  const [totalStaffFilter, setTotalStaffFilter] = React.useState("");
  const [peMainFirmStrategyFilter, setPeMainFirmStrategyFilter] =
    React.useState("");
  const [peGeographicExposureFilter, setPeGeographicExposureFilter] =
    React.useState("");

  const handleApply = () => {
    onApplyFilters({
      firmTypes: Array.isArray(selectedTypes) ? selectedTypes : [],
      firmName: firmNameFilter.trim(),
      city: cityFilter.trim(),
      country: countryFilter.trim(),
      region: regionFilter.trim(),
      background: backgroundFilter.trim(),
      yearEst: yearEstFilter.trim(),
      totalStaff: totalStaffFilter.trim(),
      peMainFirmStrategy: peMainFirmStrategyFilter.trim(),
      peGeographicExposure: peGeographicExposureFilter.trim(),
    });
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleClearFilters = () => {
    clearAllFilters();
    setFirmNameFilter("");
    setCityFilter("");
    setCountryFilter("");
    setRegionFilter("");
    setBackgroundFilter("");
    setYearEstFilter("");
    setTotalStaffFilter("");
    setPeMainFirmStrategyFilter("");
    setPeGeographicExposureFilter("");
    onApplyFilters({
      firmTypes: [],
      firmName: "",
      city: "",
      country: "",
      region: "",
      background: "",
      yearEst: "",
      totalStaff: "",
      peMainFirmStrategy: "",
      peGeographicExposure: "",
    });
    onClose();
  };

  const hasActiveFilters =
    (Array.isArray(selectedTypes) && selectedTypes.length > 0) ||
    firmNameFilter ||
    cityFilter ||
    countryFilter ||
    regionFilter ||
    backgroundFilter ||
    yearEstFilter ||
    totalStaffFilter ||
    peMainFirmStrategyFilter ||
    peGeographicExposureFilter;

  const activeFiltersCount = [
    Array.isArray(selectedTypes) && selectedTypes.length > 0,
    firmNameFilter,
    cityFilter,
    countryFilter,
    regionFilter,
    backgroundFilter,
    yearEstFilter,
    totalStaffFilter,
    peMainFirmStrategyFilter,
    peGeographicExposureFilter,
  ].filter(Boolean).length;

  const filteredFirmTypes = firmTypes.filter((type) =>
    type.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-white sm:max-w-[600px] max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Filter Companies
          </DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue="create"
          className="flex-1 overflow-hidden flex flex-col"
        >
          <TabsList className="w-full">
            <TabsTrigger value="create" className="flex-1">
              Create Filter
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex-1">
              Saved Filters
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="create"
            className="flex-1 overflow-auto flex flex-col mt-4"
          >
            <ScrollArea className="flex-1 px-1 pr-4 max-h-[calc(85vh-180px)] overflow-y-auto overflow-x-hidden">
              <div className="space-y-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <FilterInput
                    id="firmName"
                    label="Filter by Company Name"
                    value={firmNameFilter}
                    onChange={setFirmNameFilter}
                    placeholder="Search by company name..."
                  />
                  <FilterInput
                    id="city"
                    label="Filter by City"
                    value={cityFilter}
                    onChange={setCityFilter}
                    placeholder="Search by city..."
                  />
                  <FilterInput
                    id="country"
                    label="Filter by Country"
                    value={countryFilter}
                    onChange={setCountryFilter}
                    placeholder="Search by country..."
                  />
                  <FilterInput
                    id="region"
                    label="Filter by Region"
                    value={regionFilter}
                    onChange={setRegionFilter}
                    placeholder="Search by region..."
                  />
                  <FilterInput
                    id="background"
                    label="Filter by Background"
                    value={backgroundFilter}
                    onChange={setBackgroundFilter}
                    placeholder="Search in background..."
                  />
                  <FilterInput
                    id="yearEst"
                    label="Filter by Year Established"
                    value={yearEstFilter}
                    onChange={setYearEstFilter}
                    placeholder="Enter year..."
                  />
                  <FilterInput
                    id="totalStaff"
                    label="Filter by Total Staff"
                    value={totalStaffFilter}
                    onChange={setTotalStaffFilter}
                    placeholder="Enter staff count..."
                  />
                  <FilterInput
                    id="peMainFirmStrategy"
                    label="Filter by Main Strategy"
                    value={peMainFirmStrategyFilter}
                    onChange={setPeMainFirmStrategyFilter}
                    placeholder="Search by strategy..."
                  />
                  <FilterInput
                    id="peGeographicExposure"
                    label="Filter by Geographic Exposure"
                    value={peGeographicExposureFilter}
                    onChange={setPeGeographicExposureFilter}
                    placeholder="Search by geographic exposure..."
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">
                      Filter by Company Type
                    </h3>
                    {selectedTypes.length > 0 && (
                      <span className="text-xs text-gray-500">
                        {selectedTypes.length} selected
                      </span>
                    )}
                  </div>
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

                  {!loading && !error && (
                    <ScrollArea className="h-[150px] border rounded-md p-2 overflow-y-auto overflow-x-hidden">
                      <div className="space-y-2">
                        {filteredFirmTypes.length > 0 ? (
                          filteredFirmTypes.map((type) => (
                            <div
                              key={type}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`type-${type}`}
                                checked={selectedTypes.includes(type)}
                                onCheckedChange={() => toggleFirmType(type)}
                              />
                              <label
                                htmlFor={`type-${type}`}
                                className="text-sm font-medium leading-none"
                              >
                                {type}
                              </label>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500 text-center py-4">
                            No types match your search.
                          </p>
                        )}
                      </div>
                      <Scrollbar orientation="vertical" />
                    </ScrollArea>
                  )}

                  {selectedTypes.length > 0 && (
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
                            setFilterName("");
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
            <ScrollArea className="flex-1 pr-4 max-h-[calc(85vh-180px)] overflow-y-auto overflow-x-hidden">
              <div className="pb-6">
                <SavedFiltersGroup
                  filters={savedFilters}
                  onApplyFilter={applyFilter}
                  onDeleteFilter={handleDeleteFilter}
                  currentActiveFilter={selectedTypes}
                  onClearFilter={handleClearFilters}
                />
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <DialogFooter className="pt-4 sm:justify-between">
          <Button variant="outline" onClick={handleClearFilters}>
            Clear All
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleApply}>
              Apply Filters
              {hasActiveFilters && (
                <Badge
                  variant="secondary"
                  className="ml-2 bg-white text-primary"
                >
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

export default CompaniesFilterModal;
