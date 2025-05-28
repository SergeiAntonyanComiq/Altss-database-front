import { useState, useEffect, useCallback } from "react";
import {
  fetchFamilyOffices,
  FamilyOffice,
} from "@/services/familyOfficesService";
import {
  updateFavoritesData,
  updateSavedFiltersData,
  updateSavedSearchesData,
} from "@/services/savedFiltersService.ts";

export interface UpdateFavorites {
  itemType: string;
  itemIds: string[];
  favorited: boolean;
}

export interface UseFamilyOfficesDataResult {
  familyOffices: FamilyOffice[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  totalItems: number;
  updateFavorites: (data: UpdateFavorites) => Promise<void>;
  updateSavedFilters: (query: string) => Promise<void>;
  updateSavedSearches: (query: string) => Promise<void>;
}

export function useFamilyOfficesData(
  currentPage: number,
  itemsPerPage: number,
  searchQuery: string = "",
  filter: string = "",
  filterQuery: string = ""
): UseFamilyOfficesDataResult {
  const page = currentPage;
  const perPage = itemsPerPage;
  const [familyOffices, setFamilyOffices] = useState<FamilyOffice[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const params: Record<string, string> = {
      limit: `${perPage}`,
      offset: `${(page - 1) * perPage}`,
      search: filterQuery ? undefined : searchQuery,
      filter,
      filterQuery,
    };

    fetchFamilyOffices(params)
      .then((res) => {
        setFamilyOffices(res.data);
        setTotalItems(res.metadata.total);
        setTotalPages(Math.ceil(res.metadata.total / perPage));
      })
      .catch((err) => {
        setError(
          err?.response?.data?.error ||
            err?.message ||
            "Failed to fetch family offices"
        );
        setFamilyOffices([]);
        setTotalItems(0);
        setTotalPages(1);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, perPage, searchQuery, filter, filterQuery]);

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

      await updateSavedSearchesData(searchQuery, "family_office");
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSavedFilters = async (filter: string) => {
    try {
      setIsLoading(true);

      await updateSavedFiltersData(filter, "family_office");
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
    familyOffices,
    isLoading,
    error,
    totalPages,
    totalItems,
  };
}
