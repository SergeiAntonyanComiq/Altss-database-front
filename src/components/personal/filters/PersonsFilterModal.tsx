
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronLeft, ChevronRight, X } from "lucide-react";
import { fetchFirmTypes } from "@/services/firmTypesService";
import { useToast } from "@/components/ui/use-toast";

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
  const [step, setStep] = useState(1);
  const [firmTypes, setFirmTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(selectedFirmTypes);
  const { toast } = useToast();

  useEffect(() => {
    const loadFirmTypes = async () => {
      try {
        setLoading(true);
        setError(null);
        const types = await fetchFirmTypes();
        setFirmTypes(types.sort()); // Sort alphabetically
        setLoading(false);
      } catch (err) {
        setError("Failed to load company types");
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to load company types. Please try again.",
          variant: "destructive",
        });
      }
    };

    if (isOpen) {
      loadFirmTypes();
    }
  }, [isOpen, toast]);

  // Reset to first step when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedTypes(selectedFirmTypes);
    }
  }, [isOpen, selectedFirmTypes]);

  const filteredFirmTypes = firmTypes.filter(type => 
    type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFirmType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };
  
  const removeSelectedType = (type: string) => {
    setSelectedTypes(prev => prev.filter(t => t !== type));
  };

  const handleApply = () => {
    onApplyFilters(selectedTypes);
    onClose();
  };

  const handleCancel = () => {
    setSelectedTypes(selectedFirmTypes); // Reset to previously selected
    onClose();
  };
  
  const clearAllFilters = () => {
    setSelectedTypes([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Filter Persons</DialogTitle>
        </DialogHeader>
        
        {/* Step indicator */}
        <div className="flex items-center justify-center mt-2 mb-4">
          <div className="flex items-center space-x-2">
            <span className={`w-2.5 h-2.5 rounded-full ${step === 1 ? 'bg-primary' : 'bg-gray-300'}`}></span>
            <span className={`w-2.5 h-2.5 rounded-full ${step === 2 ? 'bg-primary' : 'bg-gray-300'}`}></span>
          </div>
          <div className="text-sm text-muted-foreground ml-2">
            Step {step} of 2
          </div>
        </div>
        
        {/* Step 1: Select filter type */}
        {step === 1 && (
          <div className="py-4">
            <h3 className="font-medium mb-3">Choose filter type</h3>
            <div 
              className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-accent"
              onClick={() => setStep(2)}
            >
              <div className="flex-1">
                <p className="font-medium">Company type</p>
                <p className="text-sm text-muted-foreground">Filter by company type</p>
              </div>
              <ChevronRight className="h-5 w-5" />
            </div>
            
            {/* Placeholder for future filter types */}
            <div className="mt-2 p-3 border rounded-md bg-muted/50">
              <p className="font-medium text-muted-foreground">More filters</p>
              <p className="text-sm text-muted-foreground">Coming soon</p>
            </div>
          </div>
        )}
        
        {/* Step 2: Company Type Filter */}
        {step === 2 && (
          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setStep(1)}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <h3 className="font-medium">Select company types</h3>
              {selectedTypes.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-primary"
                >
                  Clear all
                </Button>
              )}
            </div>
            
            <div className="relative mb-4">
              <Input
                type="text"
                placeholder="Search company types"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            {selectedTypes.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedTypes.map(type => (
                  <Badge key={type} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                    {type}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 w-5 p-0 hover:bg-transparent"
                      onClick={() => removeSelectedType(type)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
            
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <div className="h-6 w-6 border-2 border-t-primary rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 p-4">{error}</div>
            ) : (
              <div className="max-h-[300px] overflow-y-auto">
                {filteredFirmTypes.length === 0 ? (
                  <div className="text-center text-muted-foreground p-4">No company types found</div>
                ) : (
                  filteredFirmTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2 my-2">
                      <Checkbox 
                        id={`type-${type}`} 
                        checked={selectedTypes.includes(type)}
                        onCheckedChange={() => toggleFirmType(type)}
                      />
                      <label 
                        htmlFor={`type-${type}`}
                        className="text-sm cursor-pointer flex-1"
                      >
                        {type}
                      </label>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
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
