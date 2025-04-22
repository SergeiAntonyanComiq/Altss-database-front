import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { fetchFirmTypes } from "@/services/firmTypesService";
import { getSavedFilters, saveFilter, deleteSavedFilter, SavedSearchType } from "@/services/savedFiltersService";

export interface SavedFilterType {
  id: string;
  name: string;
  type: 'company' | 'person';
  firmTypes: string[];
  companyName?: string;
  position?: string;
  location?: string;
  responsibilities?: string;
  bio?: string;
  createdAt: number;
}

export function useFilterModal(initialSelectedTypes: string[] = []) {
  const [firmTypes, setFirmTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    Array.isArray(initialSelectedTypes) ? initialSelectedTypes : []
  );
  const [savedFilters, setSavedFilters] = useState<SavedFilterType[]>([]);
  const [filterName, setFilterName] = useState("");
  const [showSaveFilterInput, setShowSaveFilterInput] = useState(false);
  
  // New filter states
  const [companyNameFilter, setCompanyNameFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [responsibilitiesFilter, setResponsibilitiesFilter] = useState("");
  const [bioFilter, setBioFilter] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    // Load saved filters from localStorage
    const loadSavedFilters = async () => {
      try {
        const filters = await getSavedFilters();
        setSavedFilters(filters);
      } catch (error) {
        console.error("Error loading saved filters:", error);
        setSavedFilters([]);
      }
    };
    
    loadSavedFilters();
    
    // Load firm types (mock data for now)
    setFirmTypes([
      'Family Office',
      'Family Office - Single',
      'Family Office - Multi',
      'Investment Bank',
      'Private Equity',
      'Venture Capital',
      'Hedge Fund',
      'Asset Management',
      'Insurance',
      'Real Estate'
    ]);
  }, []);

  useEffect(() => {
    if (initialSelectedTypes !== undefined) {
      setSelectedTypes(Array.isArray(initialSelectedTypes) ? initialSelectedTypes : []);
    }
  }, [initialSelectedTypes]);

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
    setCompanyNameFilter("");
    setPositionFilter("");
    setLocationFilter("");
    setResponsibilitiesFilter("");
    setBioFilter("");
    setSearchTerm("");
  };

  const handleSaveFilter = async () => {
    if (!filterName) return;

    try {
      const newFilter = await saveFilter(
        filterName,
        window.location.pathname.includes('/companies') ? 'company' : 'person',
        selectedTypes,
        companyNameFilter,
        positionFilter,
        locationFilter,
        responsibilitiesFilter,
        bioFilter
      );

      // Reload saved filters to ensure we have the latest from the server
      const filters = await getSavedFilters();
      setSavedFilters(filters);
      
      setFilterName('');
      setShowSaveFilterInput(false);

      // Trigger update for sidebar
      const event = new CustomEvent('savedFiltersUpdated');
      window.dispatchEvent(event);

      toast({
        title: "Filter Saved",
        description: `"${newFilter.name}" has been saved.`,
      });
    } catch (error) {
      console.error("Error saving filter:", error);
      toast({
        title: "Error Saving Filter",
        description: "Failed to save filter. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteFilter = async (filterId: string) => {
    try {
      const success = await deleteSavedFilter(filterId);
      
      if (success) {
        // Reload saved filters to ensure we have the latest from the server
        const filters = await getSavedFilters();
        setSavedFilters(filters);
        
        // Trigger update for sidebar
        const event = new CustomEvent('savedFiltersUpdated');
        window.dispatchEvent(event);
        
        toast({
          title: "Filter Deleted",
          description: "Filter has been removed from your saved filters",
        });
      } else {
        throw new Error("Failed to delete filter");
      }
    } catch (error) {
      console.error("Error deleting filter:", error);
      toast({
        title: "Error Deleting Filter",
        description: "Failed to delete filter. Please try again.",
        variant: "destructive"
      });
    }
  };

  const applyFilter = (filter: SavedFilterType) => {
    if (!filter) return;
    
    setSelectedTypes(Array.isArray(filter.firmTypes) ? filter.firmTypes : []);
    setCompanyNameFilter(filter.companyName || "");
    setPositionFilter(filter.position || "");
    setLocationFilter(filter.location || "");
    setResponsibilitiesFilter(filter.responsibilities || "");
    setBioFilter(filter.bio || "");

    toast({
      title: "Saved Filter Applied",
      description: `Showing results for "${filter.name}".`,
    });
  };

  return {
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
  };
}
