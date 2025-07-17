import { useState, useEffect } from "react";

import {
  fetchIntegrationOfficeList,
  IntegrationOfficesList,
} from "@/services/integrationService.ts";

export interface UseIntegrationDataResult {
  offices: IntegrationOfficesList[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  totalItems: number;
}

export function useIntegrationData(
  currentPage: number,
  itemsPerPage: number,
  searchQuery: string = ""
): UseIntegrationDataResult {
  const page = currentPage;
  const perPage = itemsPerPage;
  const [offices, setOffices] = useState<IntegrationOfficesList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const params: Record<string, string> = {
      limit: String(perPage),
      offset: String((page - 1) * perPage),
      ...(searchQuery ? { search: searchQuery } : {}),
    };

    fetchIntegrationOfficeList(params)
      .then((res) => {
        setOffices(res.data);
        setTotalItems(res.metadata.total);
        setTotalPages(Math.ceil(res.metadata.total / perPage));
      })
      .catch((err) => {
        setError(
          err?.response?.data?.error ||
            err?.message ||
            "Failed to fetch office list"
        );
        setOffices([]);
        setTotalItems(0);
        setTotalPages(1);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, perPage, searchQuery]);

  return {
    offices,
    isLoading,
    error,
    totalPages,
    totalItems,
  };
}
