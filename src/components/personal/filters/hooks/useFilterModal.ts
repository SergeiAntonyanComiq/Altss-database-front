
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { fetchFirmTypes } from "@/services/firmTypesService";
import { getSavedFilters, saveFilter, deleteSavedFilterLocal } from "@/services/savedSearchesService";

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

  useEffect(() => {
    const loadFirmTypes = async () => {
      try {
        setLoading(true);
        setError(null);
        const types = await fetchFirmTypes();
        setFirmTypes(types.sort());
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
    setSavedFilters(getSavedFilters());
  }, [toast]);

  useEffect(() => {
    setStep(1);
    setSelectedTypes(selectedFirmTypes);
    console.log("useFilterModal: Updated selected types from props:", selectedFirmTypes);
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
    deleteSavedFilterLocal(id);
    setSavedFilters(prev => prev.filter(filter => filter.id !== id));
    
    toast({
      title: "Filter Deleted",
      description: `"${name}" has been removed from your filters`,
    });
  };

  const applyFilter = (filter: SavedFilterType) => {
    console.log("Applying saved filter:", filter);
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
