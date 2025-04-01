
import React, { useState, useCallback, memo, useEffect } from "react";
import { useContactsData } from "@/hooks/useContactsData";
import { ContactType } from "@/types/contact";
import PersonsListHeader from "./list/PersonsListHeader";
import PersonsListContent from "./list/PersonsListContent";
import PersonsListFooter from "./list/PersonsListFooter";
import { usePersonsSelection } from "./hooks/usePersonsSelection";
import PersonsSearchBar from "./PersonsSearchBar";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();
  
  // Update local state when prop changes
  useEffect(() => {
    console.log("Selected firm types updated:", selectedFirmTypes);
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

  // Convert contacts to persons format for the table
  const persons = contacts.map(contactToPerson);
  
  // Use the extracted selection logic
  const { 
    selectedPersons, 
    handleCheckboxChange, 
    handleSelectAll, 
    isPersonSelected 
  } = usePersonsSelection(persons);

  // Use callbacks for handlers to prevent unnecessary re-renders
  const handlePageChange = useCallback((page: number) => {
    console.log("Page changed to:", page);
    onPageChange(page);
    setContactsCurrentPage(page);
  }, [onPageChange, setContactsCurrentPage]);

  const handleItemsPerPageChange = useCallback((perPage: number) => {
    console.log("Items per page changed to:", perPage);
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
    console.log("Applying filters:", firmTypes);
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
  }, [handlePageChange, localSelectedFirmTypes, onFilterChange, toast]);

  // Calculate total pages based on filtered count
  const totalPages = Math.ceil(totalContacts / itemsPerPage) || 1;
  
  // Log pagination information for debugging
  useEffect(() => {
    console.log("Pagination info:");
    console.log("- Current page:", currentPage);
    console.log("- Items per page:", itemsPerPage);
    console.log("- Total contacts:", totalContacts);
    console.log("- Total pages:", totalPages);
    console.log("- Applied filters:", localSelectedFirmTypes);
  }, [currentPage, itemsPerPage, totalContacts, totalPages, localSelectedFirmTypes]);

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
