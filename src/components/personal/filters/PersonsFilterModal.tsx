
import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import StepIndicator from "./StepIndicator";
import FilterTypeStep from "./steps/FilterTypeStep";
import CompanyTypeStep from "./steps/CompanyTypeStep";
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
    goToNextStep,
    goToPrevStep,
    setSearchTerm,
    toggleFirmType,
    removeSelectedType,
    clearAllFilters
  } = useFilterModal(selectedFirmTypes);

  const handleApply = () => {
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
