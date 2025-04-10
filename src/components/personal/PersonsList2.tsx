import React, { useState, useCallback, memo, useEffect } from "react";
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

const contactToPerson = (contact: ContactType): PersonType | null => {
  // Проверяем наличие обязательных полей
  if (!contact || !contact.contact_id || !contact.firm_id) {
    console.warn('Missing required fields in contact:', contact);
    return null;
  }

  try {
    const person: PersonType = {
      id: String(contact.contact_id), // Используем contact_id вместо id
      name: [contact.title, contact.name]
        .filter(Boolean)
        .join(' ')
        .trim() || "Unnamed Contact",
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
      // Optional fields
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
  onFilterChange
}: PersonsList2Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [localSelectedFirmTypes, setLocalSelectedFirmTypes] = useState<string[]>(selectedFirmTypes);
  const [companyNameFilter, setCompanyNameFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [responsibilitiesFilter, setResponsibilitiesFilter] = useState("");
  const [bioFilter, setBioFilter] = useState("");
  const [searchResults, setSearchResults] = useState<ContactType[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [totalContacts, setTotalContacts] = useState(0);
  
  useEffect(() => {
    setLocalSelectedFirmTypes(selectedFirmTypes);
  }, [selectedFirmTypes]);
  
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
    companyName: companyNameFilter,
    position: positionFilter,
    location: locationFilter,
    responsibilities: responsibilitiesFilter,
    bio: bioFilter
  });

  const displayedContacts = isSearchActive ? searchResults : contacts;
  console.log('Displayed contacts:', displayedContacts); // Debug log
  
  const persons: PersonType[] = displayedContacts
    .filter((contact): contact is ContactType => Boolean(contact))
    .map(contact => {
      const person = contactToPerson(contact);
      return person;
    })
    .filter((person): person is PersonType => Boolean(person));

  console.log('Final persons array:', persons); // Debug log
  
  useEffect(() => {
    // Reset search state when filters change
    if (localSelectedFirmTypes.length > 0 || 
        companyNameFilter || 
        positionFilter || 
        locationFilter || 
        responsibilitiesFilter || 
        bioFilter) {
      // If we have filters active, we want to show filtered results, not search
      if (isSearchActive) {
        setIsSearchActive(false);
        setSearchQuery("");
      }
    }
  }, [localSelectedFirmTypes, companyNameFilter, positionFilter, locationFilter, responsibilitiesFilter, bioFilter]);

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
  } = usePersonsSelection(persons);

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

  const toggleFavorite = useCallback((id: string) => {
    console.log(`Toggle favorite for person with ID: ${id}`);
  }, []);
  
  const handleFilterChange = (filters: {
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
  };

  const effectiveTotal = isSearchActive ? totalContacts : originalTotalContacts;
  const totalPages = Math.max(Math.ceil(effectiveTotal / itemsPerPage) || 1, 1);
  
  const hasActiveFilters = Boolean(
    localSelectedFirmTypes.length > 0 || 
    companyNameFilter || 
    positionFilter || 
    locationFilter || 
    responsibilitiesFilter || 
    bioFilter || 
    isSearchActive
  );

  return (
    <div className="bg-[#FEFEFE] w-full py-8 px-4 md:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-[#111928] text-2xl font-semibold leading-none">Persons</h1>
        
        <PersonsListHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          totalContacts={effectiveTotal}
          isLoading={isLoading || isSearching}
          hasActiveFilters={hasActiveFilters}
        />
      </div>
      
      <PersonsSearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedFirmTypes={localSelectedFirmTypes}
        companyNameFilter={companyNameFilter}
        positionFilter={positionFilter}
        locationFilter={locationFilter}
        responsibilitiesFilter={responsibilitiesFilter}
        bioFilter={bioFilter}
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
        totalPages={totalPages}
        totalItems={effectiveTotal}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        disablePagination={false}
      />
    </div>
  );
};

export default memo(PersonsList2);
