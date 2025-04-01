
import React, { useState, useCallback, memo } from "react";
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
  onItemsPerPageChange
}: PersonsList2Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFirmTypes, setSelectedFirmTypes] = useState<string[]>([]);
  
  const {
    contacts,
    isLoading,
    totalContacts,
    setCurrentPage: setContactsCurrentPage,
    setItemsPerPage: setContactsItemsPerPage
  } = useContactsData({
    initialPage: currentPage,
    initialItemsPerPage: itemsPerPage,
    firmTypes: selectedFirmTypes
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
    onPageChange(page);
    setContactsCurrentPage(page);
  }, [onPageChange, setContactsCurrentPage]);

  const handleItemsPerPageChange = useCallback((perPage: number) => {
    onItemsPerPageChange(perPage);
    setContactsItemsPerPage(perPage);
  }, [onItemsPerPageChange, setContactsItemsPerPage]);

  const toggleFavorite = useCallback((id: string) => {
    // In a real application, this would be an API call to change the favorite status
    console.log(`Toggle favorite for person with ID: ${id}`);
  }, []);
  
  // Handle firm type filter changes
  const handleFilterChange = useCallback((firmTypes: string[]) => {
    setSelectedFirmTypes(firmTypes);
    // Reset to first page when applying filters
    handlePageChange(1);
    
    if (firmTypes.length > 0) {
      toast({
        title: "Filters Applied",
        description: `Showing contacts filtered by ${firmTypes.join(', ')}`,
      });
    } else if (selectedFirmTypes.length > 0 && firmTypes.length === 0) {
      toast({
        title: "Filters Cleared",
        description: "Showing all contacts",
      });
    }
  }, [handlePageChange, selectedFirmTypes]);

  const totalPages = Math.ceil(totalContacts / itemsPerPage) || 1;

  return (
    <div className="bg-[#FEFEFE] w-full py-8 px-4 md:px-6 lg:px-8">
      <h1 className="text-[#111928] text-2xl font-semibold leading-none">Persons</h1>
      
      <PersonsSearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedFirmTypes={selectedFirmTypes}
        onFilterChange={handleFilterChange}
      />
      
      <PersonsListHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalContacts={totalContacts}
        isLoading={isLoading}
        hasActiveFilters={selectedFirmTypes.length > 0}
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
