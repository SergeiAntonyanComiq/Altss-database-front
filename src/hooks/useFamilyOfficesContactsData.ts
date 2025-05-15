import { useEffect, useState } from "react";
import { FamilyOfficeContact } from "@/services/familyOfficeContactsService.ts";
import apiClient from "@/lib/axios.ts";

interface UseFamilyOfficesContactsDataResult {
  contacts: Array<FamilyOfficeContact & { favorited?: boolean }> | null;
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  totalItems: number;
}

export function useFamilyOfficesContactsData(
  currentPage: number,
  itemsPerPage: number,
): UseFamilyOfficesContactsDataResult {
  const [contacts, setContacts] = useState<Array<
    FamilyOfficeContact & { favorited?: boolean }
  > | null>(null);
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
          `/family-offices-contacts?limit=${itemsPerPage}&offset=${offset}`,
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
            : 1,
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

  return { contacts, isLoading, error, totalPages, totalItems };
}
