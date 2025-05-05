import React, { useState, useCallback, memo, useEffect, useMemo } from "react";
import { useContactsData } from "@/hooks/useContactsData";
import { ContactType } from "@/types/contact";
import { PersonType } from "@/types/person";
import PersonsSearchBar from "./PersonsSearchBar";
import PersonTableSkeleton from "./PersonTableSkeleton";
import PersonsTable2 from "./PersonsTable2";
import PersonsColumnModal from "./PersonsColumnModal";
import { usePersistedPersonColumns } from "./hooks/usePersistedPersonColumns";
import { usePersonsSelection } from "./hooks/usePersonsSelection";
import { toast } from "@/components/ui/use-toast";
import { searchContactsByName } from "@/services/contactsService";
import {
  isPersonInFavorites,
  addPersonToFavorites,
  removePersonFromFavorites,
} from "@/services/savedFiltersService";
import CustomPagination from "../ui/CustomPagination.tsx";

const contactToPerson = (contact: ContactType): PersonType | null => {
  if (!contact || !contact.contact_id || !contact.firm_id) return null;
  try {
    return {
      id: String(contact.contact_id),
      name: contact.name?.trim() || "Unnamed Contact",
      favorite: Boolean(contact.favorite),
      responsibilities:
        contact.asset_class
          ?.split(",")
          .map((s) => s.trim())
          .filter(Boolean) || [],
      linkedin: contact.linkedin || "",
      location: [contact.city, contact.state, contact.country_territory]
        .filter(Boolean)
        .join(", "),
      companies: [contact.investor].filter(Boolean),
      currentPosition: contact.job_title || "",
      shortBio: contact.role || "",
      email: contact.email || "",
      phone: contact.tel || undefined,
      linkedinHandle: undefined,
      profileImage: undefined,
      jobHistory: undefined,
      news: undefined,
      lastUpdate: undefined,
    };
  } catch {
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
  onFilterChange,
}: PersonsList2Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const { visibleColumns, updateVisibleColumns, handleColumnResize } =
    usePersistedPersonColumns();
  const [localSelectedFirmTypes, setLocalSelectedFirmTypes] =
    useState<string[]>(selectedFirmTypes);
  const [localCompanyNameFilter, setCompanyNameFilter] =
    useState(companyNameFilter);
  const [localPositionFilter, setPositionFilter] = useState(positionFilter);
  const [localLocationFilter, setLocationFilter] = useState(locationFilter);
  const [localResponsibilitiesFilter, setResponsibilitiesFilter] = useState(
    responsibilitiesFilter,
  );
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
    setItemsPerPage: setContactsItemsPerPage,
  } = useContactsData({
    initialPage: currentPage,
    initialItemsPerPage: itemsPerPage,
    firmTypes: localSelectedFirmTypes,
    companyName: localCompanyNameFilter,
    position: localPositionFilter,
    location: localLocationFilter,
    responsibilities: localResponsibilitiesFilter,
    bio: localBioFilter,
  });

  const displayedContacts = isSearchActive ? searchResults : contacts;

  const personsFromHook: PersonType[] = useMemo(() => {
    return displayedContacts
      .filter(Boolean)
      .map((contact) => contactToPerson(contact))
      .filter((person): person is PersonType => Boolean(person));
  }, [displayedContacts]);

  const [localPersons, setLocalPersons] = useState<PersonType[]>([]);

  useEffect(() => {
    setLocalPersons(personsFromHook);
  }, [personsFromHook]);

  useEffect(() => {
    if (
      localSelectedFirmTypes.length > 0 ||
      localCompanyNameFilter ||
      localPositionFilter ||
      localLocationFilter ||
      localResponsibilitiesFilter ||
      localBioFilter
    ) {
      if (isSearchActive) {
        setIsSearchActive(false);
        setSearchQuery("");
      }
    }
  }, [
    localSelectedFirmTypes,
    localCompanyNameFilter,
    localPositionFilter,
    localLocationFilter,
    localResponsibilitiesFilter,
    localBioFilter,
  ]);

  const handleSearch = useCallback(
    async (query: string) => {
      if (!query) {
        setIsSearchActive(false);
        setSearchResults([]);
        setTotalContacts(0);
        return;
      }

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
          itemsPerPage,
        );
        setSearchResults(data);
        setTotalContacts(total);
        setIsSearchActive(true);
        toast({
          title: data.length > 0 ? "Search Results" : "No Results",
          description:
            data.length > 0
              ? `Found ${total} results for "${query}"`
              : `No results found for "${query}"`,
        });
      } catch {
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
    },
    [currentPage, itemsPerPage],
  );

  const {
    selectedPersons,
    handleCheckboxChange,
    handleSelectAll,
    isPersonSelected,
  } = usePersonsSelection(localPersons);

  const handlePageChange = useCallback(
    (page: number) => {
      onPageChange(page);
      setContactsCurrentPage(page);
      if (isSearchActive && searchQuery) {
        handleSearch(searchQuery);
      }
    },
    [
      onPageChange,
      setContactsCurrentPage,
      isSearchActive,
      searchQuery,
      handleSearch,
    ],
  );

  const handleItemsPerPageChange = useCallback(
    (perPage: number) => {
      if (!isSearchActive) {
        onItemsPerPageChange(perPage);
        setContactsItemsPerPage(perPage);
      }
    },
    [onItemsPerPageChange, setContactsItemsPerPage, isSearchActive],
  );

  const toggleFavorite = useCallback(
    async (id: string) => {
      const originalPersons = [...localPersons];
      const personIndex = localPersons.findIndex((p) => p.id === id);
      if (personIndex === -1) return;
      const person = localPersons[personIndex];
      const isFavorite = person.favorite;
      const updatedPersons = localPersons.map((p, idx) =>
        idx === personIndex ? { ...p, favorite: !isFavorite } : p,
      );
      setLocalPersons(updatedPersons);
      try {
        if (isFavorite) {
          await removePersonFromFavorites(id);
          toast({
            title: "Removed from favorites",
            description: `${person.name} has been removed.`,
          });
        } else {
          await addPersonToFavorites(
            id,
            person.name,
            person.currentPosition,
            person.companies?.[0] || "",
          );
          toast({
            title: "Added to favorites",
            description: `${person.name} has been added.`,
          });
        }
        window.dispatchEvent(new CustomEvent("favoritesUpdated"));
      } catch {
        toast({
          title: "Error",
          description: "Problem updating favorites",
          variant: "destructive",
        });
        setLocalPersons(originalPersons);
      }
    },
    [localPersons],
  );

  const handleFilterChange = useCallback(
    (filters: {
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
      handlePageChange(1);
      onFilterChange?.(filters);
    },
    [handlePageChange, onFilterChange],
  );

  const effectiveTotal = isSearchActive ? totalContacts : originalTotalContacts;
  const totalPages = Math.max(Math.ceil(effectiveTotal / itemsPerPage) || 1, 1);

  return (
    <div className="w-full min-h-screen flex flex-col py-8 px-4 md:px-6 lg:px-8">
      {isLoading ? (
        <>
          <div className="flex gap-4 items-center mt-10">
            <div className="w-full h-11 bg-gray-100 animate-pulse rounded-full"></div>
          </div>
          <PersonTableSkeleton />
        </>
      ) : (
        <>
          <h1 className="text-[rgba(17,25,40,1)] text-2xl font-semibold leading-none">
            Persons
          </h1>

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
            onColumnsClick={() => setIsColumnModalOpen(true)}
          />

          <div className="mt-6 flex-grow">
            <PersonsTable2
              persons={localPersons}
              isLoading={isLoading || isSearching}
              selectedPersons={selectedPersons}
              handleCheckboxChange={handleCheckboxChange}
              handleSelectAll={handleSelectAll}
              isPersonSelected={isPersonSelected}
              toggleFavorite={toggleFavorite}
              itemsPerPage={itemsPerPage}
              columns={visibleColumns}
              onColumnResize={handleColumnResize}
            />
          </div>

          <div className="mt-6">
            <CustomPagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
              totalItems={effectiveTotal}
              disabled={isLoading}
            />
          </div>

          <PersonsColumnModal
            isOpen={isColumnModalOpen}
            onClose={() => setIsColumnModalOpen(false)}
            columns={visibleColumns}
            onApplyColumns={updateVisibleColumns}
          />
        </>
      )}
    </div>
  );
};

export default memo(PersonsList2);
