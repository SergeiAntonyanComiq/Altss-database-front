import React, { useState, useCallback, memo, useEffect, useMemo } from "react";
import { useContactsData } from "@/hooks/useContactsData";
import { ContactType } from "@/types/contact";
import { PersonType } from "@/types/person";
import { usePersonsSelection } from "./hooks";
import { toast } from "@/components/ui/use-toast";
import { searchContactsByName } from "@/services/contactsService";
import CustomPagination from "../ui/CustomPagination.tsx";
import { DataTable } from "@/components/ui/DataTable.tsx";
import { personsColumns } from "@/components/columns-bucket";
import { Loading } from "@/utils.tsx";

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

const PersonsList = ({
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

  const [localSelectedFirmTypes, setLocalSelectedFirmTypes] =
    useState<string[]>(selectedFirmTypes);
  const [localCompanyNameFilter, setCompanyNameFilter] =
    useState(companyNameFilter);
  const [localPositionFilter, setPositionFilter] = useState(positionFilter);
  const [localLocationFilter, setLocationFilter] = useState(locationFilter);
  const [localResponsibilitiesFilter, setResponsibilitiesFilter] = useState(
    responsibilitiesFilter
  );
  const [localBioFilter, setBioFilter] = useState(bioFilter);
  const [searchResults, setSearchResults] = useState<ContactType[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [totalContacts, setTotalContacts] = useState(0);
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

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

  const personsFromHook: PersonType[] = useMemo(
    () =>
      displayedContacts
        .filter(Boolean)
        .map((contact) => contactToPerson(contact))
        .filter((person): person is PersonType => Boolean(person)),
    [displayedContacts]
  );

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
    isSearchActive,
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
      }
    },
    [currentPage, itemsPerPage]
  );

  const { selectedPersons, handleCheckboxChange, handleSelectAll } =
    usePersonsSelection(localPersons);

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
    ]
  );

  const handleItemsPerPageChange = useCallback(
    (perPage: number) => {
      if (!isSearchActive) {
        onItemsPerPageChange(perPage);
        setContactsItemsPerPage(perPage);
      }
    },
    [onItemsPerPageChange, setContactsItemsPerPage, isSearchActive]
  );

  const toggleFavorite = useCallback(
    async (id: string) => {
      setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));

      const originalPersons = [...localPersons];
      const personIndex = localPersons.findIndex((p) => p.id === id);
      if (personIndex === -1) return;
      const person = localPersons[personIndex];
      const isFavorite = person.favorite;
      const updatedPersons = localPersons.map((p, idx) =>
        idx === personIndex ? { ...p, favorite: !isFavorite } : p
      );
      setLocalPersons(updatedPersons);
    },
    [localPersons]
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
    [handlePageChange, onFilterChange]
  );

  useEffect(() => {
    if (localPersons) {
      const initialFavorites: Record<number, boolean> = {};
      localPersons.forEach((fo) => {
        initialFavorites[fo.id] = fo.favorite;
      });

      setFavorites(initialFavorites);
    }
  }, [localPersons]);

  const effectiveTotal = isSearchActive ? totalContacts : originalTotalContacts;
  const totalPages = Math.max(Math.ceil(effectiveTotal / itemsPerPage) || 1, 1);

  return (
    <div className="w-full min-h-screen flex flex-col py-8 px-4 md:px-6 lg:px-8">
      <Loading show={isLoading} />
      <h1 className="text-[rgba(17,25,40,1)] text-2xl font-semibold leading-none">
        Persons
      </h1>

      <div className="mt-6 flex-grow overflow-x-auto w-full">
        <DataTable
          columns={personsColumns(
            favorites,
            toggleFavorite,
            handleSelectAll,
            handleCheckboxChange
          )}
          data={localPersons}
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
    </div>
  );
};

export default memo(PersonsList);
