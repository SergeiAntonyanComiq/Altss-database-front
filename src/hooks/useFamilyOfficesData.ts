import { useState, useEffect } from "react";
import { fetchFamilyOffices, FamilyOffice } from "@/services/familyOfficesService";

interface UseFamilyOfficesDataParams {
  page: number;
  perPage: number;
  searchQuery?: string;
  filters?: Record<string, any>;
}

interface UseFamilyOfficesDataResult {
  familyOffices: FamilyOffice[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  totalItems: number;
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

  return {
    familyOffices,
    isLoading,
    error,
    totalPages,
    totalItems,
  };
}
