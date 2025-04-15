import React, { useState, useCallback, memo, useEffect, useMemo } from "react";
import { useContactsData } from "@/hooks/useContactsData";
import { ContactType } from "@/types/contact";
import { PersonType } from "@/types/person";
import PersonsListHeader from "./list/PersonsListHeader";
import PersonsListContent from "./list/PersonsListContent";
import PersonsListFooter from "./list/PersonsListFooter";
import { usePersonsSelection } from "./hooks/usePersonsSelection";
import PersonsSearchBar from "./PersonsSearchBar";
import { toast } from "@/components/ui/use-toast";
import { searchContactsByName } from "@/services/contactsService";
import PersonTableSkeleton from "./PersonTableSkeleton";
import PersonsPagination from "./PersonsPagination";
import PersonsTable2 from "./PersonsTable2";
import {
  isPersonInFavorites,
  addPersonToFavorites,
  removePersonFromFavorites,
} from "@/services/savedFiltersService";

const contactToPerson = (contact: ContactType): PersonType | null => {
  // Проверяем наличие обязательных полей
  if (!contact || !contact.contact_id || !contact.firm_id) {
    console.warn('Missing required fields in contact:', contact);
    return null;
  }

  try {
    const person: PersonType = {
      id: String(contact.contact_id), // Используем contact_id вместо id
      name: contact.name?.trim() || "Unnamed Contact",
      favorite: Boolean(contact.favorite),
      responsibilities: contact.asset_class ? 
        contact.asset_class.split(',').map(s => s.trim()).filter(Boolean) : 
        [],
      linkedin: contact.linkedin || "",
      location: [
        contact.city,
        contact.state,
        contact.country_territory
      ].filter(Boolean).join(", "),
      companies: [contact.investor].filter(Boolean),
      currentPosition: contact.job_title || "",
      shortBio: contact.role || "",
      email: contact.email || "",
      phone: contact.tel || undefined,
      linkedinHandle: undefined,
      profileImage: undefined,
      jobHistory: undefined,
      news: undefined,
      lastUpdate: undefined
    };

    return person;
  } catch (error) {
    console.error('Error converting contact to person:', error, contact);
    return null;
  }
};

interface PersonsList2Props {
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (perPage: number) => void;
  selectedFirmTypes?: string[];
  companyNameFilter?: string;
  positionFilter?: string;
  locationFilter?: string;
  responsibilitiesFilter?: string;
  bioFilter?: string;
  onFilterChange?: (filters: {
    firmTypes: string[];
    companyName: string;
    position: string;
    location: string;
    responsibilities: string;
    bio: string;
  }) => void;
}

const PersonsList2 = ({
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  selectedFirmTypes = [],
  companyNameFilter = "",
  positionFilter = "",
  locationFilter = "",
  responsibilitiesFilter = "",
  bioFilter = "",
  onFilterChange
}: PersonsList2Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [localSelectedFirmTypes, setLocalSelectedFirmTypes] = useState<string[]>(selectedFirmTypes);
  const [localCompanyNameFilter, setCompanyNameFilter] = useState(companyNameFilter);
  const [localPositionFilter, setPositionFilter] = useState(positionFilter);
  const [localLocationFilter, setLocationFilter] = useState(locationFilter);
  const [localResponsibilitiesFilter, setResponsibilitiesFilter] = useState(responsibilitiesFilter);
  const [localBioFilter, setBioFilter] = useState(bioFilter);
  const [searchResults, setSearchResults] = useState<ContactType[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [totalContacts, setTotalContacts] = useState(0);
  
  const {
    contacts,
    isLoading,
    totalContacts: originalTotalContacts,
    setCurrentPage: setContactsCurrentPage,
    setItemsPerPage: setContactsItemsPerPage
  } = useContactsData({
    initialPage: currentPage,
    initialItemsPerPage: itemsPerPage,
    firmTypes: localSelectedFirmTypes,
    companyName: localCompanyNameFilter,
    position: localPositionFilter,
    location: localLocationFilter,
    responsibilities: localResponsibilitiesFilter,
    bio: localBioFilter
  });

  const displayedContacts = isSearchActive ? searchResults : contacts;
  console.log('Displayed contacts:', displayedContacts); // Debug log
  
  const personsFromHook: PersonType[] = useMemo(() => {
    console.log("Recalculating personsFromHook..."); // Для отладки
    return displayedContacts
      .filter((contact): contact is ContactType => Boolean(contact))
      .map(contact => contactToPerson(contact))
      .filter((person): person is PersonType => Boolean(person));
  }, [displayedContacts]); // Зависимость от displayedContacts

  const [localPersons, setLocalPersons] = useState<PersonType[]>([]); 
  
  useEffect(() => {
    console.log("Syncing localPersons with personsFromHook..."); // Для отладки
    setLocalPersons(personsFromHook);
  }, [personsFromHook]); 

  console.log('Final localPersons array:', localPersons); // Debug log
  
  useEffect(() => {
    // Reset search state when filters change
    if (localSelectedFirmTypes.length > 0 || 
        localCompanyNameFilter || 
        localPositionFilter || 
        localLocationFilter || 
        localResponsibilitiesFilter || 
        localBioFilter) {
      // If we have filters active, we want to show filtered results, not search
      if (isSearchActive) {
        setIsSearchActive(false);
        setSearchQuery("");
      }
    }
  }, [localSelectedFirmTypes, localCompanyNameFilter, localPositionFilter, localLocationFilter, localResponsibilitiesFilter, localBioFilter]);
  
  const handleSearch = useCallback(async (query: string) => {
    if (!query) {
      setIsSearchActive(false);
      setSearchResults([]);
      setTotalContacts(0);
      return;
    }

    // Clear any active filters when searching
    setLocalSelectedFirmTypes([]);
    setCompanyNameFilter("");
    setPositionFilter("");
    setLocationFilter("");
    setResponsibilitiesFilter("");
    setBioFilter("");

    setIsSearching(true);
    try {
      const { data, total } = await searchContactsByName(
        query,
        currentPage,
        itemsPerPage
      );
      
      setSearchResults(data);
      setTotalContacts(total);
      setIsSearchActive(true);
      
      toast({
        title: data.length > 0 ? "Search Results" : "No Results",
        description: data.length > 0 ? 
          `Found ${total} results for "${query}"` : 
          `No results found for "${query}"`,
      });
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search Error",
        description: "Failed to perform search. Please try again.",
        variant: "destructive",
      });
      setSearchResults([]);
      setTotalContacts(0);
    } finally {
      setIsSearching(false);
    }
  }, [currentPage, itemsPerPage, toast]);
  
  const { 
    selectedPersons, 
    handleCheckboxChange, 
    handleSelectAll, 
    isPersonSelected 
  } = usePersonsSelection(localPersons);

  const handlePageChange = useCallback((page: number) => {
      onPageChange(page);
      setContactsCurrentPage(page);
    
    if (isSearchActive && searchQuery) {
      handleSearch(searchQuery);
    }
  }, [onPageChange, setContactsCurrentPage, isSearchActive, searchQuery, handleSearch]);

  const handleItemsPerPageChange = useCallback((perPage: number) => {
    if (!isSearchActive) {
      onItemsPerPageChange(perPage);
      setContactsItemsPerPage(perPage);
    }
  }, [onItemsPerPageChange, setContactsItemsPerPage, isSearchActive]);

  const toggleFavorite = useCallback(async (id: string) => {
    // Используем localPersons для поиска и обновления
    const originalPersons = [...localPersons]; 
    const personIndex = localPersons.findIndex(p => p.id === id);
    if (personIndex === -1) return; 

    const person = localPersons[personIndex];
    const isCurrentlyFavorite = person.favorite;

    // Оптимистичное обновление UI с использованием setLocalPersons
    const updatedPersons = localPersons.map((p, index) => 
      index === personIndex ? { ...p, favorite: !isCurrentlyFavorite } : p
    );
    setLocalPersons(updatedPersons);

    try {
      if (isCurrentlyFavorite) {
        await removePersonFromFavorites(id);
        toast({ 
          title: "Removed from favorites",
          description: `${person.name} has been removed from your favorites`,
         });
      } else {
        await addPersonToFavorites(
          id,
          person.name,
          person.currentPosition,
          person.companies?.[0] || ""
        );
        toast({ 
          title: "Added to favorites",
          description: `${person.name} has been added to your favorites`,
         });
      }
      // Если успешно, отправляем событие для обновления сайдбара
      const event = new CustomEvent('favoritesUpdated');
      window.dispatchEvent(event);
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast({ 
        title: "Error",
        description: "There was a problem updating your favorites",
        variant: "destructive",
       });
      // Откат UI в случае ошибки с использованием setLocalPersons
      setLocalPersons(originalPersons); 
    }
  }, [localPersons, toast]); // Зависимость от localPersons
  
  const handleFilterChange = useCallback((filters: {
    firmTypes: string[];
    companyName: string;
    position: string;
    location: string;
    responsibilities: string;
    bio: string;
  }) => {
    setLocalSelectedFirmTypes(filters.firmTypes);
    setCompanyNameFilter(filters.companyName);
    setPositionFilter(filters.position);
    setLocationFilter(filters.location);
    setResponsibilitiesFilter(filters.responsibilities);
    setBioFilter(filters.bio);
    
    // When applying filters, reset to page 1
    handlePageChange(1);
    
    // Let parent component know about filter change
    if (onFilterChange) {
      onFilterChange(filters);
    }
  }, [onFilterChange, handlePageChange]);

  const effectiveTotal = isSearchActive ? totalContacts : originalTotalContacts;
  const totalPages = Math.max(Math.ceil(effectiveTotal / itemsPerPage) || 1, 1);
  
  const hasActiveFilters = Boolean(
    localSelectedFirmTypes.length > 0 || 
    localCompanyNameFilter || 
    localPositionFilter || 
    localLocationFilter || 
    localResponsibilitiesFilter || 
    localBioFilter || 
    isSearchActive
  );

  return (
    <>
      {isLoading ? (
        <div className="w-full py-8 px-4 md:px-6 lg:px-8">
          <div className="flex gap-4 items-center mt-10">
            <div className="w-full h-11 bg-gray-100 animate-pulse rounded-full"></div>
          </div>
          <PersonTableSkeleton />
      </div>
      ) : (
        <div className="w-full py-8 px-4 md:px-6 lg:px-8">
      <PersonsSearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedFirmTypes={localSelectedFirmTypes}
        companyNameFilter={localCompanyNameFilter}
            positionFilter={localPositionFilter}
            locationFilter={localLocationFilter}
            responsibilitiesFilter={localResponsibilitiesFilter}
            bioFilter={localBioFilter}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
            selectedPersons={selectedPersons}
            persons={localPersons}
      />
      
          <div className="mt-6"></div>
          
          <PersonsTable2 
        persons={localPersons}
            isLoading={isLoading || isSearching}
        selectedPersons={selectedPersons}
        handleCheckboxChange={handleCheckboxChange}
        handleSelectAll={handleSelectAll}
            isPersonSelected={isPersonSelected}
        toggleFavorite={toggleFavorite}
      />
      {localPersons.length === 0 && !isLoading && (
        <div className="text-center mt-4">
          <p className="text-gray-500">No contacts found with the applied filters.</p>
        </div>
      )}
          <div className="flex w-full gap-[40px_100px] justify-between flex-wrap mt-6">
            <PersonsPagination 
        currentPage={currentPage}
        onPageChange={handlePageChange}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
        totalItems={effectiveTotal}
      />
    </div>
        </div>
      )}
    </>
  );
};

export default memo(PersonsList2);
