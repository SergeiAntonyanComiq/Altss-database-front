
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { fetchFirmTypes } from "@/services/firmTypesService";
import { getSavedFilters, saveFilter, deleteSavedFilter } from "@/services/savedFiltersService";

export interface SavedFilterType {
  id: string;
  name: string;
  firmTypes: string[];
  createdAt: number;
}

export const useFilterModal = (selectedFirmTypes: string[]) => {
  const [step, setStep] = useState(1);
  const [firmTypes, setFirmTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(selectedFirmTypes);
  const [savedFilters, setSavedFilters] = useState<SavedFilterType[]>([]);
  const [showSaveFilterInput, setShowSaveFilterInput] = useState(false);
  const [filterName, setFilterName] = useState("");
  const { toast } = useToast();

  // Load firm types when the modal opens
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

    loadFirmTypes();
    // Load saved filters
    setSavedFilters(getSavedFilters());
  }, [toast]);

  // Reset to first step and selected types when the component mounts
  useEffect(() => {
    setStep(1);
    setSelectedTypes(selectedFirmTypes);
  }, [selectedFirmTypes]);

  const goToNextStep = () => setStep(step + 1);
  const goToPrevStep = () => setStep(step - 1);

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
  
  const clearAllFilters = () => {
    setSelectedTypes([]);
  };

  const handleSaveFilter = () => {
    if (!filterName.trim()) {
      toast({
        title: "Name Required",
        description: "Please provide a name for your filter",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedTypes.length === 0) {
      toast({
        title: "No Filters Selected",
        description: "Please select at least one filter to save",
        variant: "destructive",
      });
      return;
    }
    
    const newFilter = saveFilter(filterName.trim(), [...selectedTypes]);
    setSavedFilters(prevFilters => [...prevFilters, newFilter]);
    setFilterName("");
    setShowSaveFilterInput(false);
    
    toast({
      title: "Filter Saved",
      description: `"${filterName}" has been saved to your filters`,
    });
  };

  const handleDeleteFilter = (id: string, name: string) => {
    deleteSavedFilter(id);
    setSavedFilters(prev => prev.filter(filter => filter.id !== id));
    
    toast({
      title: "Filter Deleted",
      description: `"${name}" has been removed from your filters`,
    });
  };

  const applyFilter = (filter: SavedFilterType) => {
    setSelectedTypes(filter.firmTypes);
    
    toast({
      title: "Filter Applied",
      description: `Applied "${filter.name}" filter`,
    });
  };

  return {
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
  };
};
