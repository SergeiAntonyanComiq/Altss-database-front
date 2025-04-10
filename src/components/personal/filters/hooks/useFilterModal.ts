import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { fetchFirmTypes } from "@/services/firmTypesService";
import { getSavedFilters, saveFilter, deleteSavedFilter } from "@/services/savedFiltersService";

export interface SavedFilterType {
  id: string;
  name: string;
  firmTypes: string[];
  companyName?: string;
  position?: string;
  location?: string;
  responsibilities?: string;
  bio?: string;
}

export function useFilterModal(initialSelectedTypes: string[] = []) {
  const [firmTypes, setFirmTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialSelectedTypes);
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
    const filters = localStorage.getItem('savedFilters');
    if (filters) {
      setSavedFilters(JSON.parse(filters));
    }
    
    // Load firm types (mock data for now)
    setFirmTypes([
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

  const handleSaveFilter = () => {
    if (!filterName) return;

    const newFilter: SavedFilterType = {
      id: Date.now().toString(),
      name: filterName,
      firmTypes: selectedTypes,
      companyName: companyNameFilter,
      position: positionFilter,
      location: locationFilter,
      responsibilities: responsibilitiesFilter,
      bio: bioFilter
    };

    const updatedFilters = [...savedFilters, newFilter];
    setSavedFilters(updatedFilters);
    localStorage.setItem('savedFilters', JSON.stringify(updatedFilters));
    
    setFilterName('');
    setShowSaveFilterInput(false);

    toast({
      title: "Filter Saved",
      description: `"${newFilter.name}" has been saved.`,
    });
  };

  const handleDeleteFilter = (filterId: string) => {
    const updatedFilters = savedFilters.filter(filter => filter.id !== filterId);
    setSavedFilters(updatedFilters);
    localStorage.setItem('savedFilters', JSON.stringify(updatedFilters));

    toast({
      title: "Filter Deleted",
      description: `"${filterName}" has been removed from your filters`,
    });
  };

  const applyFilter = (filter: SavedFilterType) => {
    setSelectedTypes(filter.firmTypes);
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
