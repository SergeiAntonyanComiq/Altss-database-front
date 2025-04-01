
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { fetchFirmTypes } from "@/services/firmTypesService";

export const useFilterModal = (selectedFirmTypes: string[]) => {
  const [step, setStep] = useState(1);
  const [firmTypes, setFirmTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(selectedFirmTypes);
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

  return {
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
  };
};
