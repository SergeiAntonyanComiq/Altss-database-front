
import React, { useState, useCallback, memo, useEffect } from "react";
import { useContactsData } from "@/hooks/useContactsData";
import { ContactType } from "@/types/contact";
import { usePersonsSelection } from "./hooks/usePersonsSelection";
import { usePersonsFilters } from "./hooks/usePersonsFilters";
import PersonsSearchBar from "./PersonsSearchBar";
import PersonsListHeader from "./list/PersonsListHeader";
import PersonsListContent from "./list/PersonsListContent";
import PersonsListFooter from "./list/PersonsListFooter";
import { toast } from "sonner";

interface PersonsList2Props {
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (perPage: number) => void;
}

const PersonsList2: React.FC<PersonsList2Props> = ({
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}) => {
  const { selectedFirmTypes, searchQuery, handleFilterChange, handleSearchChange } = usePersonsFilters();

  // Log initial props for debugging
  useEffect(() => {
    console.log("PersonsList2 initialized with:", {
      currentPage,
      itemsPerPage,
      selectedFirmTypes,
      searchQuery
    });
  }, []);

  // Fetch contacts data with filtering and pagination
  const { 
    contacts, 
    totalContacts, 
    isLoading,
    setCurrentPage,
    setItemsPerPage,
  } = useContactsData({
    initialPage: currentPage,
    initialItemsPerPage: itemsPerPage,
    firmTypes: selectedFirmTypes,
    searchQuery: searchQuery,
  });

  // Debug logging when contacts change
  useEffect(() => {
    console.log("Contacts data updated:", {
      count: contacts.length,
      totalContacts,
      isLoading
    });
  }, [contacts, totalContacts, isLoading]);

  // Setup for selecting and managing persons
  const {
    selectedPersons,
    handleCheckboxChange,
    handleSelectAll,
    isPersonSelected,
  } = usePersonsSelection(contacts as any);

  // Convert contacts to any for compatibility with existing components
  const personsData = contacts.map(contact => ({
    id: contact.id.toString(),
    name: contact.name,
    favorite: contact.favorite || false,
    responsibilities: contact.asset_class?.split(',') || [],
    linkedin: contact.linkedin,
    location: `${contact.city}${contact.state ? `, ${contact.state}` : ''}, ${contact.country_territory}`,
    companies: [contact.investor],
    currentPosition: contact.job_title,
    shortBio: `${contact.job_title} at ${contact.investor}`,
    email: contact.email
  }));

  // Handle page change with debounce
  const handlePageChangeDebounced = useCallback((page: number) => {
    console.log("Page changed to:", page);
    setCurrentPage(page);
    onPageChange(page);
  }, [onPageChange, setCurrentPage]);

  // Handle items per page change
  const handleItemsPerPageChange = useCallback((perPage: number) => {
    console.log("Items per page changed to:", perPage);
    setItemsPerPage(perPage);
    onItemsPerPageChange(perPage);
  }, [onItemsPerPageChange, setItemsPerPage]);

  // Toggle favorite status for a person
  const toggleFavorite = (id: string) => {
    console.log(`Toggle favorite for person with ID: ${id}`);
    toast.success(`Favorite status toggled for contact ${id}`);
    // In real app this would call an API
  };

  return (
    <div className="bg-[#FEFEFE] w-full py-8 px-4 md:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-[#111928] text-2xl font-semibold leading-none">Persons</h1>
        
        <PersonsListHeader 
          searchQuery={searchQuery}
          setSearchQuery={handleSearchChange}
          totalContacts={totalContacts}
          isLoading={isLoading}
          hasActiveFilters={selectedFirmTypes.length > 0 || searchQuery.trim() !== ''}
        />
      </div>
      
      <PersonsSearchBar 
        searchQuery={searchQuery}
        setSearchQuery={handleSearchChange}
        selectedFirmTypes={selectedFirmTypes}
        onFilterChange={handleFilterChange}
      />
      
      <PersonsListContent 
        persons={personsData}
        selectedPersons={selectedPersons}
        handleCheckboxChange={handleCheckboxChange}
        handleSelectAll={handleSelectAll}
        toggleFavorite={toggleFavorite}
        isPersonSelected={isPersonSelected}
        isLoading={isLoading}
      />
      
      <PersonsListFooter
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalContacts}
        onPageChange={handlePageChangeDebounced}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

export default memo(PersonsList2);
