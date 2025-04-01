
import React, { useState, useCallback, memo } from "react";
import { useContactsData } from "@/hooks/useContactsData";
import { ContactType } from "@/types/contact";
import PersonsSearchBar from "./PersonsSearchBar";
import PersonsTable2 from "./PersonsTable2";
import PersonsPagination from "./PersonsPagination";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [selectedPersons, setSelectedPersons] = useState<string[]>([]);
  
  const {
    contacts,
    isLoading,
    totalContacts,
    setCurrentPage: setContactsCurrentPage,
    setItemsPerPage: setContactsItemsPerPage
  } = useContactsData({
    initialPage: currentPage,
    initialItemsPerPage: itemsPerPage
  });

  // Use callbacks for handlers to prevent unnecessary re-renders
  const handlePageChange = useCallback((page: number) => {
    onPageChange(page);
    setContactsCurrentPage(page);
  }, [onPageChange, setContactsCurrentPage]);

  const handleItemsPerPageChange = useCallback((perPage: number) => {
    onItemsPerPageChange(perPage);
    setContactsItemsPerPage(perPage);
  }, [onItemsPerPageChange, setContactsItemsPerPage]);

  const handleCheckboxChange = useCallback((personId: string) => {
    setSelectedPersons(prev => 
      prev.includes(personId) 
        ? prev.filter(id => id !== personId) 
        : [...prev, personId]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    const persons = contacts.map(contactToPerson);
    
    if (selectedPersons.length === persons.length) {
      setSelectedPersons([]);
    } else {
      setSelectedPersons(persons.map(person => person.id));
    }
  }, [contacts, selectedPersons]);

  const toggleFavorite = useCallback((id: string) => {
    // In a real application, this would be an API call to change the favorite status
    console.log(`Toggle favorite for person with ID: ${id}`);
  }, []);

  const isPersonSelected = useCallback((id: string | undefined) => {
    return id ? selectedPersons.includes(id) : false;
  }, [selectedPersons]);

  // Convert contacts to persons format for the table
  const persons = contacts.map(contactToPerson);

  return (
    <div className="px-6 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Persons</h1>
        <div className="flex gap-2">
          <span className="text-sm text-muted-foreground">
            Showing {isLoading ? "..." : persons.length} items of {totalContacts} total contacts
          </span>
        </div>
      </div>
      
      <PersonsSearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <div className="mt-4">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : (
          <PersonsTable2 
            persons={persons}
            selectedPersons={selectedPersons}
            handleCheckboxChange={handleCheckboxChange}
            handleSelectAll={handleSelectAll}
            toggleFavorite={toggleFavorite}
            isPersonSelected={isPersonSelected}
            isLoading={isLoading}
          />
        )}
      </div>
      
      <div className="flex justify-between items-center w-full mt-4">
        <PersonsPagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={Math.ceil(totalContacts / itemsPerPage) || 1}
          totalItems={totalContacts || 0}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
};

export default memo(PersonsList2);
