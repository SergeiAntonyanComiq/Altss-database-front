
import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookmarkPlus } from "lucide-react";
import StepIndicator from "./StepIndicator";
import FilterTypeStep from "./steps/FilterTypeStep";
import CompanyTypeStep from "./steps/CompanyTypeStep";
import SavedFilters from "./components/SavedFilters";
import { useFilterModal } from "./hooks/useFilterModal";

interface PersonsFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFirmTypes: string[];
  onApplyFilters: (firmTypes: string[]) => void;
}

const PersonsFilterModal = ({
  isOpen,
  onClose,
  selectedFirmTypes,
  onApplyFilters,
}: PersonsFilterModalProps) => {
  const {
    step,
    firmTypes,
    loading,
    error,
    searchTerm,
    selectedTypes,
    savedFilters,
    filterName,
    showSaveFilterInput,
    goToNextStep,
    goToPrevStep,
    setSearchTerm,
    toggleFirmType,
    removeSelectedType,
    clearAllFilters,
    setFilterName,
    setShowSaveFilterInput,
    handleSaveFilter,
    handleDeleteFilter,
    applyFilter
  } = useFilterModal(selectedFirmTypes);

  const handleApply = () => {
    console.log("Applying filters in modal:", selectedTypes);
    onApplyFilters(selectedTypes);
    onClose();
  };

  const handleCancel = () => {
    // Reset to previously selected filters
    onClose();
  };

  const totalSteps = 2;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Filter Persons</DialogTitle>
        </DialogHeader>
        
        {/* Tabs for Filter/Saved */}
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="create" className="flex-1">Create Filter</TabsTrigger>
            <TabsTrigger value="saved" className="flex-1">Saved Filters</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="mt-2">
            {/* Step indicator */}
            <StepIndicator currentStep={step} totalSteps={totalSteps} />
            
            {/* Step contents */}
            {step === 1 ? (
              <FilterTypeStep onSelectFilterType={goToNextStep} />
            ) : (
              <CompanyTypeStep 
                onBackClick={goToPrevStep}
                selectedTypes={selectedTypes}
                onToggleType={toggleFirmType}
                onRemoveType={removeSelectedType}
                onClearAll={clearAllFilters}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                firmTypes={firmTypes}
                loading={loading}
                error={error}
              />
            )}
            
            {/* Save Filter UI */}
            {step === 2 && selectedTypes.length > 0 && (
              <div className="mt-4">
                {showSaveFilterInput ? (
                  <div className="flex items-center gap-2 mt-2">
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
          </TabsContent>
          
          <TabsContent value="saved" className="mt-2">
            <SavedFilters 
              savedFilters={savedFilters}
              onApplyFilter={(filter) => {
                console.log("Applying saved filter:", filter);
                applyFilter(filter);
              }}
              onDeleteFilter={handleDeleteFilter}
              currentActiveFilter={selectedTypes}
            />
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleApply} disabled={loading}>
            Apply Filters
            {selectedTypes.length > 0 && ` (${selectedTypes.length})`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PersonsFilterModal;
