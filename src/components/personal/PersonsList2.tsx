
import React, { useState, useCallback, memo } from "react";
import { useContactsData } from "@/hooks/useContactsData";
import { ContactType } from "@/types/contact";
import { usePersonsSelection } from "./hooks/usePersonsSelection";
import { usePersonsFilters } from "./hooks/usePersonsFilters";
import PersonsSearchBar from "./PersonsSearchBar";
import PersonsListHeader from "./list/PersonsListHeader";
import PersonsListContent from "./list/PersonsListContent";
import PersonsListFooter from "./list/PersonsListFooter";
import SavedSearchDialog from "./filters/SavedSearchDialog";
import { Button } from "@/components/ui/button";
import { BookmarkIcon } from "lucide-react";

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
  const { searchQuery, selectedFirmTypes, handleSearchChange, handleFilterChange } = usePersonsFilters();
  const [showSavedSearches, setShowSavedSearches] = useState(false);

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

  // Setup for selecting and managing persons
  const {
    selectedPersons,
    handleCheckboxChange,
    handleSelectAll,
    isPersonSelected,
  } = usePersonsSelection(contacts as any);

  // Convert contacts to any for compatibility with existing components
  const personsData: any[] = contacts.map(contact => ({
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
    setCurrentPage(page);
    onPageChange(page);
  }, [onPageChange, setCurrentPage]);

  // Handle items per page change
  const handleItemsPerPageChange = useCallback((perPage: number) => {
    setItemsPerPage(perPage);
    onItemsPerPageChange(perPage);
  }, [onItemsPerPageChange, setItemsPerPage]);

  // Toggle favorite status for a person
  const toggleFavorite = (id: string) => {
    console.log(`Toggle favorite for person with ID: ${id}`);
    // In real app this would call an API
  };

  return (
    <div className="bg-[#FEFEFE] w-full py-8 px-4 md:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-[#111928] text-2xl font-semibold leading-none">Persons</h1>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSavedSearches(true)}
            className="flex items-center gap-1"
          >
            <BookmarkIcon size={16} />
            Saved Searches
          </Button>
          
          <PersonsListHeader 
            searchQuery={searchQuery}
            setSearchQuery={handleSearchChange}
            totalContacts={totalContacts}
            isLoading={isLoading}
            hasActiveFilters={selectedFirmTypes.length > 0}
          />
        </div>
      </div>
      
      <PersonsSearchBar 
        searchQuery={searchQuery}
        setSearchQuery={handleSearchChange}
        selectedFirmTypes={selectedFirmTypes}
        onFilterChange={handleFilterChange}
        currentSearchQuery={searchQuery}
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
      
      <SavedSearchDialog
        isOpen={showSavedSearches}
        onClose={() => setShowSavedSearches(false)}
        onApply={(search) => {
          handleFilterChange(search.filter_data.firmTypes);
          handleSearchChange(search.filter_data.searchQuery || '');
        }}
        currentFirmTypes={selectedFirmTypes}
        currentSearchQuery={searchQuery}
      />
    </div>
  );
};

export default memo(PersonsList2);
