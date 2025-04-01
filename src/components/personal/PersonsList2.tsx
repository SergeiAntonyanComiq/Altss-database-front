
import React, { useState, useCallback, memo, useEffect } from "react";
import { useContactsData } from "@/hooks/useContactsData";
import { ContactType } from "@/types/contact";
import PersonsListHeader from "./list/PersonsListHeader";
import PersonsListContent from "./list/PersonsListContent";
import PersonsListFooter from "./list/PersonsListFooter";
import { usePersonsSelection } from "./hooks/usePersonsSelection";
import PersonsSearchBar from "./PersonsSearchBar";
import { toast } from "@/components/ui/use-toast";

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
  
  // Update local state when prop changes
  useEffect(() => {
    console.log("Selected firm types updated from props:", selectedFirmTypes);
    setLocalSelectedFirmTypes(selectedFirmTypes);
  }, [selectedFirmTypes]);
  
  const {
    contacts,
    isLoading,
    totalContacts,
    setCurrentPage: setContactsCurrentPage,
    setItemsPerPage: setContactsItemsPerPage,
    resetToFirstPage
  } = useContactsData({
    initialPage: currentPage,
    initialItemsPerPage: itemsPerPage,
    firmTypes: localSelectedFirmTypes
  });

  console.log("PersonsList2 - Current contacts:", contacts);

  // Convert contacts to persons format for the table
  const persons = contacts.map(contactToPerson);
  console.log("PersonsList2 - Converted persons:", persons);
  
  // Use the extracted selection logic
  const { 
    selectedPersons, 
    handleCheckboxChange, 
    handleSelectAll, 
    isPersonSelected 
  } = usePersonsSelection(persons);

  // Use callbacks for handlers to prevent unnecessary re-renders
  const handlePageChange = useCallback((page: number) => {
    console.log(`Changing page to: ${page}`);
    onPageChange(page);
    setContactsCurrentPage(page);
  }, [onPageChange, setContactsCurrentPage]);

  const handleItemsPerPageChange = useCallback((perPage: number) => {
    console.log(`Changing items per page to: ${perPage}`);
    onItemsPerPageChange(perPage);
    setContactsItemsPerPage(perPage);
    // Reset to first page when changing items per page
    handlePageChange(1);
  }, [onItemsPerPageChange, setContactsItemsPerPage, handlePageChange]);

  const toggleFavorite = useCallback((id: string) => {
    // In a real application, this would be an API call to change the favorite status
    console.log(`Toggle favorite for person with ID: ${id}`);
  }, []);
  
  // Handle firm type filter changes
  const handleFilterChange = useCallback((firmTypes: string[]) => {
    console.log(`Applying filter with firm types:`, firmTypes);
    setLocalSelectedFirmTypes(firmTypes);
    
    // Call parent handler if provided
    if (onFilterChange) {
      onFilterChange(firmTypes);
    }
    
    // Reset to first page when applying filters
    if (currentPage !== 1) {
      handlePageChange(1);
    } else {
      // If already on page 1, manually trigger the reset
      resetToFirstPage();
    }
    
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
  }, [handlePageChange, localSelectedFirmTypes, onFilterChange, currentPage, resetToFirstPage]);

  // Calculate total pages based on totalContacts and itemsPerPage
  const totalPages = Math.ceil(totalContacts / itemsPerPage) || 1;
  
  // Debug logs
  console.log(`PersonsList2 render - Current page: ${currentPage}, Total pages: ${totalPages}`);
  console.log(`PersonsList2 render - Items per page: ${itemsPerPage}, Total contacts: ${totalContacts}`);
  console.log(`PersonsList2 render - Selected firm types:`, localSelectedFirmTypes);
  console.log(`PersonsList2 render - Displaying ${persons.length} contacts`);

  return (
    <div className="bg-[#FEFEFE] w-full py-8 px-4 md:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-[#111928] text-2xl font-semibold leading-none">Persons</h1>
        
        <PersonsListHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          totalContacts={totalContacts}
          isLoading={isLoading}
          hasActiveFilters={localSelectedFirmTypes.length > 0}
        />
      </div>
      
      <PersonsSearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedFirmTypes={localSelectedFirmTypes}
        onFilterChange={handleFilterChange}
      />
      
      <PersonsListContent 
        persons={persons}
        selectedPersons={selectedPersons}
        handleCheckboxChange={handleCheckboxChange}
        handleSelectAll={handleSelectAll}
        toggleFavorite={toggleFavorite}
        isPersonSelected={isPersonSelected}
        isLoading={isLoading}
      />
      
      <PersonsListFooter 
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
        totalItems={totalContacts || 0}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

export default memo(PersonsList2);
