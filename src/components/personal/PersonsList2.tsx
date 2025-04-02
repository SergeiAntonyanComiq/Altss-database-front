
import React, { useState, useCallback, memo, useEffect } from "react";
import { useContactsData } from "@/hooks/useContactsData";
import { ContactType } from "@/types/contact";
import PersonsListHeader from "./list/PersonsListHeader";
import PersonsListContent from "./list/PersonsListContent";
import PersonsListFooter from "./list/PersonsListFooter";
import { usePersonsSelection } from "./hooks/usePersonsSelection";
import PersonsSearchBar from "./PersonsSearchBar";
import { toast } from "@/components/ui/use-toast";
import { searchContactsByName } from "@/services/contactsService";

interface PersonsList2Props {
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (perPage: number) => void;
  selectedFirmTypes?: string[];
  onFilterChange?: (firmTypes: string[]) => void;
}

// Helper function to convert Contact to Person type
const contactToPerson = (contact: ContactType) => {
  return {
    id: contact.id.toString(),
    name: contact.name,
    favorite: contact.favorite || false,
    responsibilities: contact.asset_class ? contact.asset_class.split(',') : [],
    linkedin: contact.linkedin || "",
    location: `${contact.city}${contact.state ? `, ${contact.state}` : ""}${contact.country_territory ? `, ${contact.country_territory}` : ""}`,
    companies: [contact.investor || ""],
    currentPosition: contact.job_title || "",
    shortBio: contact.role || "",
    email: contact.email
  };
};

const PersonsList2 = ({
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  selectedFirmTypes = [],
  onFilterChange
}: PersonsList2Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [localSelectedFirmTypes, setLocalSelectedFirmTypes] = useState<string[]>(selectedFirmTypes);
  const [searchResults, setSearchResults] = useState<ContactType[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  // Update local state when prop changes
  useEffect(() => {
    setLocalSelectedFirmTypes(selectedFirmTypes);
  }, [selectedFirmTypes]);
  
  const {
    contacts,
    isLoading,
    totalContacts,
    setCurrentPage: setContactsCurrentPage,
    setItemsPerPage: setContactsItemsPerPage
  } = useContactsData({
    initialPage: currentPage,
    initialItemsPerPage: itemsPerPage,
    firmTypes: localSelectedFirmTypes
  });

  // Get contacts to display - either search results or regular contacts
  const displayedContacts = isSearchActive ? searchResults : contacts;
  
  // Convert contacts to persons format for the table
  const persons = displayedContacts.map(contactToPerson);
  
  // Handle search
  const handleSearch = useCallback(async (query: string) => {
    if (!query) {
      setIsSearchActive(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchContactsByName(query);
      setSearchResults(results);
      setIsSearchActive(true);
      
      toast({
        title: results.length > 0 ? "Search Results" : "No Results",
        description: results.length > 0 ? 
          `Found ${results.length} results for "${query}"` : 
          `No results found for "${query}"`,
      });
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search Error",
        description: "Failed to perform search. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  }, [toast]);
  
  // Use the extracted selection logic
  const { 
    selectedPersons, 
    handleCheckboxChange, 
    handleSelectAll, 
    isPersonSelected 
  } = usePersonsSelection(persons);

  // Use callbacks for handlers to prevent unnecessary re-renders
  const handlePageChange = useCallback((page: number) => {
    // Only change page if not in search mode
    if (!isSearchActive) {
      onPageChange(page);
      setContactsCurrentPage(page);
    }
  }, [onPageChange, setContactsCurrentPage, isSearchActive]);

  const handleItemsPerPageChange = useCallback((perPage: number) => {
    // Only change page size if not in search mode
    if (!isSearchActive) {
      onItemsPerPageChange(perPage);
      setContactsItemsPerPage(perPage);
    }
  }, [onItemsPerPageChange, setContactsItemsPerPage, isSearchActive]);

  const toggleFavorite = useCallback((id: string) => {
    // In a real application, this would be an API call to change the favorite status
    console.log(`Toggle favorite for person with ID: ${id}`);
  }, []);
  
  // Handle firm type filter changes
  const handleFilterChange = useCallback((firmTypes: string[]) => {
    // Clear search when applying filters
    if (isSearchActive) {
      setIsSearchActive(false);
      setSearchQuery('');
    }
    
    setLocalSelectedFirmTypes(firmTypes);
    // Call parent handler if provided
    if (onFilterChange) {
      onFilterChange(firmTypes);
    }
    
    // Reset to first page when applying filters
    handlePageChange(1);
    
    if (firmTypes.length > 0) {
      toast({
        title: "Filters Applied",
        description: `Showing contacts filtered by ${firmTypes.join(', ')}`,
      });
    } else if (localSelectedFirmTypes.length > 0 && firmTypes.length === 0) {
      toast({
        title: "Filters Cleared",
        description: "Showing all contacts",
      });
    }
  }, [handlePageChange, localSelectedFirmTypes, onFilterChange, toast, isSearchActive]);

  const totalPages = Math.ceil(totalContacts / itemsPerPage) || 1;
  const effectiveTotal = isSearchActive ? searchResults.length : totalContacts;

  return (
    <div className="bg-[#FEFEFE] w-full py-8 px-4 md:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-[#111928] text-2xl font-semibold leading-none">Persons</h1>
        
        <PersonsListHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          totalContacts={effectiveTotal}
          isLoading={isLoading || isSearching}
          hasActiveFilters={localSelectedFirmTypes.length > 0 || isSearchActive}
        />
      </div>
      
      <PersonsSearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedFirmTypes={localSelectedFirmTypes}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />
      
      <PersonsListContent 
        persons={persons}
        selectedPersons={selectedPersons}
        handleCheckboxChange={handleCheckboxChange}
        handleSelectAll={handleSelectAll}
        toggleFavorite={toggleFavorite}
        isPersonSelected={isPersonSelected}
        isLoading={isLoading || isSearching}
      />
      
      <PersonsListFooter 
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={isSearchActive ? 1 : totalPages}
        totalItems={effectiveTotal}
        itemsPerPage={isSearchActive ? searchResults.length : itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        disablePagination={isSearchActive}
      />
    </div>
  );
};

export default memo(PersonsList2);
