
import { useState, useCallback } from 'react';

export function usePersonsFilters() {
  const [selectedFirmTypes, setSelectedFirmTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleFilterChange = useCallback((firmTypes: string[]) => {
    setSelectedFirmTypes(firmTypes);
  }, []);
  
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);
  
  const resetFilters = useCallback(() => {
    setSelectedFirmTypes([]);
    setSearchQuery('');
  }, []);
  
  const filterPerson = useCallback((person: any) => {
    // If no firm types selected, show all persons
    if (selectedFirmTypes.length === 0) {
      return true;
    }
    
    // For each person, check if their associated company's firm_type is in the selected types
    // This assumes that the contact's company type info is available in the data
    // We may need to adjust this based on actual data structure
    const personCompanyType = person.companies && person.companies[0]?.firm_type;
    return selectedFirmTypes.includes(personCompanyType);
  }, [selectedFirmTypes]);
  
  return {
    selectedFirmTypes,
    searchQuery,
    handleFilterChange,
    handleSearchChange,
    resetFilters,
    filterPerson,
    hasFilters: selectedFirmTypes.length > 0 || searchQuery.trim() !== ''
  };
}
