
import { useCallback, useEffect, useState } from "react";
import { fetchContacts, fetchContactsCount } from "@/services/contactsService";
import { ContactType } from "@/types/contact";

interface UseContactsDataParams {
  initialPage?: number;
  initialItemsPerPage?: number;
  firmTypes?: string[];
}

export const useContactsData = ({
  initialPage = 1,
  initialItemsPerPage = 10,
  firmTypes = []
}: UseContactsDataParams) => {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalContacts, setTotalContacts] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState<number>(initialItemsPerPage);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log(`Loading contacts - Page: ${currentPage}, Items per page: ${itemsPerPage}, Firm types:`, firmTypes);

      // Fetch the total count first, with filters if they exist
      const count = await fetchContactsCount(firmTypes);
      setTotalContacts(count);
      console.log(`Total contacts count: ${count}`);

      // Then fetch the contacts for the current page
      const data = await fetchContacts(currentPage, itemsPerPage, firmTypes);
      setContacts(data);
      console.log(`Loaded ${data.length} contacts`);

      setIsLoading(false);
    } catch (err) {
      console.error("Error in useContactsData:", err);
      setError("Failed to load contacts. Please try again.");
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage, firmTypes]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  // Function to reset to page 1 when filters change
  const resetToFirstPage = useCallback(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [currentPage]);

  return {
    contacts,
    isLoading,
    error,
    totalContacts,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    resetToFirstPage
  };
};
