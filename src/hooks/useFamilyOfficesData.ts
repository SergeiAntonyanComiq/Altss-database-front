import { useState, useEffect } from "react";
import {
  fetchFamilyOffices,
  FamilyOffice,
} from "@/services/familyOfficesService";
import apiClient from "@/lib/axios.ts";

interface UseFamilyOfficesDataParams {
  page: number;
  perPage: number;
  searchQuery?: string;
  filters?: Record<string, any>;
}

export interface UpdateFavorites {
  itemType: string;
  itemIds: string[];
  favorited: boolean;
}

interface UseFamilyOfficesDataResult {
  familyOffices: FamilyOffice[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  totalItems: number;
  updateFavorites: (data: UpdateFavorites) => Promise<void>;
}

export function useFamilyOfficesData(
  currentPage: number,
  itemsPerPage: number,
  searchQuery: string = "",
  filters: Record<string, any> = {}
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

    // Build params for API
    const params: Record<string, any> = {
      limit: perPage,
      offset: (page - 1) * perPage,
      ...filters,
    };
    if (searchQuery) {
      params.firm_name = searchQuery;
    }

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
  }, [page, perPage, searchQuery, JSON.stringify(filters)]);

  const updateFavorites = async (data: UpdateFavorites) => {
    try {
      setIsLoading(true);

      await apiClient.post("/favorites/toggle", data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateFavorites,
    familyOffices,
    isLoading,
    error,
    totalPages,
    totalItems,
  };
}
