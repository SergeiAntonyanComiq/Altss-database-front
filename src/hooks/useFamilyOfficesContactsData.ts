import { useEffect, useState } from "react";
import { FamilyOfficeContact } from "@/services/familyOfficeContactsService.ts";
import apiClient from "@/lib/axios.ts";
import { UpdateFavorites } from "@/hooks/useFamilyOfficesData.ts";

interface UseFamilyOfficesContactsDataResult {
  contacts: Array<FamilyOfficeContact> | null;
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  totalItems: number;
  updateFavorites: (data: UpdateFavorites) => Promise<void>;
}

export function useFamilyOfficesContactsData(
  currentPage: number,
  itemsPerPage: number
): UseFamilyOfficesContactsDataResult {
  const [contacts, setContacts] = useState<Array<FamilyOfficeContact> | null>(
    null
  );
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

        const response = await apiClient.get(
          `/family-offices-contacts?limit=${itemsPerPage}&offset=${offset}`
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

    fetchContacts();
  }, [currentPage, itemsPerPage]);

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
    contacts,
    isLoading,
    error,
    totalPages,
    totalItems,
  };
}
