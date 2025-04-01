
import { useState, useEffect, useCallback, useRef } from "react";
import { ContactType } from "@/types/contact";
import { fetchContactById, fetchContactsCount } from "@/services/contactsService";
import { toast } from "@/components/ui/use-toast";

interface UseContactsDataProps {
  initialPage: number;
  initialItemsPerPage: number;
}

interface UseContactsDataReturn {
  contacts: ContactType[];
  isLoading: boolean;
  error: Error | null;
  totalContacts: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (perPage: number) => void;
}

export const useContactsData = ({
  initialPage,
  initialItemsPerPage
}: UseContactsDataProps): UseContactsDataReturn => {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState<number>(initialItemsPerPage);
  const [totalContacts, setTotalContacts] = useState<number>(0);
  
  // Use refs to track prop changes without causing re-renders
  const initialPageRef = useRef(initialPage);
  const initialItemsPerPageRef = useRef(initialItemsPerPage);

  // Fetch total contacts count from API once on component mount
  useEffect(() => {
    let isMounted = true;
    
    const fetchTotalContactsData = async () => {
      if (isMounted) {
        setIsLoading(true);
      }
      
      try {
        const count = await fetchContactsCount();
        
        // Only update state if component is still mounted
        if (isMounted) {
          setTotalContacts(count);
          console.log(`Total contacts count from API: ${count}`);
        }
      } catch (err) {
        console.error("Error fetching contacts count:", err);
        
        // Only show toast and update state if component is still mounted
        if (isMounted) {
          toast({
            title: "Warning",
            description: "Could not fetch total contacts count. Pagination may be inaccurate.",
            variant: "destructive",
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    fetchTotalContactsData();
    
    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, []);

  // Memoize the function to update currentPage
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Memoize the function to update itemsPerPage
  const handleItemsPerPageChange = useCallback((perPage: number) => {
    setItemsPerPage(perPage);
  }, []);

  // Fetch contacts whenever page or items per page changes
  useEffect(() => {
    let isMounted = true;
    
    const fetchContacts = async () => {
      if (isMounted) {
        setIsLoading(true);
        setError(null);
      }
      
      try {
        const startId = (currentPage - 1) * itemsPerPage + 1;
        // Use totalContacts if available, otherwise limit to a reasonable number
        const maxId = totalContacts || 50;
        const endId = Math.min(startId + itemsPerPage - 1, maxId);
        
        console.log(`Fetching contacts from ID ${startId} to ${endId}, page ${currentPage}, items per page: ${itemsPerPage}, total: ${totalContacts}`);
        
        const contactPromises: Promise<ContactType>[] = [];
        
        // Fetch contacts one by one
        for (let id = startId; id <= endId; id++) {
          contactPromises.push(fetchContactById(id));
        }
        
        // Wait for all requests to complete
        const fetchedContacts = await Promise.all(contactPromises);
        
        // Only update state if component is still mounted
        if (isMounted) {
          setContacts(fetchedContacts);
          console.log(`Fetched ${fetchedContacts.length} contacts`);
        }
      } catch (err) {
        // Only update error state if component is still mounted
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('An unknown error occurred'));
          toast({
            title: "Error",
            description: "Failed to fetch contacts. Please try again later.",
            variant: "destructive",
          });
        }
      } finally {
        // Only update loading state if component is still mounted
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    fetchContacts();
    
    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [currentPage, itemsPerPage, totalContacts]);
  
  // Effect to sync with prop changes (but not on every render)
  useEffect(() => {
    if (initialPageRef.current !== initialPage) {
      initialPageRef.current = initialPage;
      setCurrentPage(initialPage);
    }
  }, [initialPage]);
  
  useEffect(() => {
    if (initialItemsPerPageRef.current !== initialItemsPerPage) {
      initialItemsPerPageRef.current = initialItemsPerPage;
      setItemsPerPage(initialItemsPerPage);
    }
  }, [initialItemsPerPage]);
  
  return {
    contacts,
    isLoading,
    error,
    totalContacts,
    currentPage,
    setCurrentPage: handlePageChange,
    itemsPerPage,
    setItemsPerPage: handleItemsPerPageChange
  };
};
