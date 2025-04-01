
import { useState, useEffect } from "react";
import { ContactType } from "@/types/contact";
import { fetchContacts } from "@/services/contactsService";

interface UseContactsDataProps {
  initialPage?: number;
  initialItemsPerPage?: number;
  firmTypes?: string[];
  searchQuery?: string;
}

export function useContactsData({
  initialPage = 1,
  initialItemsPerPage = 10,
  firmTypes = [],
  searchQuery = "",
}: UseContactsDataProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [totalContacts, setTotalContacts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getContacts = async () => {
      setIsLoading(true);
      try {
        // Debug logging
        console.log("Fetching contacts with params:", {
          page: currentPage,
          perPage: itemsPerPage,
          firmTypes,
          searchQuery
        });
        
        const result = await fetchContacts(
          currentPage, 
          itemsPerPage, 
          firmTypes,
          searchQuery
        );
        
        // Debug logging
        console.log("Fetched contacts result:", {
          contactsCount: result.contacts.length,
          totalCount: result.totalCount
        });
        
        setContacts(result.contacts);
        setTotalContacts(result.totalCount);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setContacts([]);
      } finally {
        setIsLoading(false);
      }
    };

    getContacts();
  }, [currentPage, itemsPerPage, firmTypes, searchQuery]);

  return {
    contacts,
    totalContacts,
    isLoading,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
  };
}
