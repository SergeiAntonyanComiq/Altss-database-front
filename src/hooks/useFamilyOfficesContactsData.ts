import { useEffect, useState } from "react";
import { FamilyOfficeContact } from "@/services/familyOfficeContactsService.ts";
import apiClient from "@/lib/axios.ts";
import { UpdateFavorites } from "@/hooks/useFamilyOfficesData.ts";
import {
  updateFavoritesData,
  updateSavedFiltersData,
  updateSavedSearchesData,
} from "@/services/savedFiltersService.ts";

interface UseFamilyOfficesContactsDataResult {
  contacts: Array<FamilyOfficeContact> | null;
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  totalItems: number;
  updateFavorites: (data: UpdateFavorites) => Promise<void>;
  updateSavedFilters: (query: string) => Promise<void>;
  updateSavedSearches: (query: string) => Promise<void>;
}

export function useFamilyOfficesContactsData(
  currentPage: number,
  itemsPerPage: number,
  searchQuery: string,
  filter: string,
  filterQuery: string
): UseFamilyOfficesContactsDataResult {
  const [contacts, setContacts] = useState<Array<FamilyOfficeContact>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const fetchContacts = async () => {
      try {
        const offset = (currentPage - 1) * itemsPerPage;

        const params = new URLSearchParams({
          limit: itemsPerPage.toString(),
          offset: offset.toString(),
        });

        if (searchQuery && !filterQuery) {
          params.append("search", searchQuery);
        }

        if (filter) {
          params.append("filter", filter);
        }

        if (filterQuery) {
          params.append("filterQuery", filterQuery);
        }

        const response = await apiClient.get(
          `/family-offices-contacts?${params.toString()}`
        );

        const apiData = response.data as {
          data: FamilyOfficeContact[];
          metadata: { total: number };
        };

        setContacts(apiData.data);
        setTotalItems(apiData.metadata?.total || 0);
        setTotalPages(
          apiData.metadata?.total
            ? Math.ceil(apiData.metadata.total / itemsPerPage)
            : 1
        );
      } catch (err) {
        setError(err.message || "Failed to fetch contacts");
        setContacts(null);
      } finally {
        setIsLoading(false);
      }
    };

    (async () => {
      await fetchContacts();
    })();
  }, [currentPage, itemsPerPage, searchQuery, filter, filterQuery]);

  const updateFavorites = async (data: UpdateFavorites) => {
    try {
      setIsLoading(true);

      await updateFavoritesData(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSavedSearches = async (searchQuery: string) => {
    try {
      setIsLoading(true);

      await updateSavedSearchesData(searchQuery, "family_office_contacts");
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSavedFilters = async (filter: string) => {
    try {
      setIsLoading(true);

      await updateSavedFiltersData(filter, "family_office_contacts");
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateSavedSearches,
    updateFavorites,
    updateSavedFilters,
    contacts,
    isLoading,
    error,
    totalPages,
    totalItems,
  };
}
