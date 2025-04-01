
import { useState, useEffect } from "react";
import { ContactType } from "@/types/contact";
import { fetchContactById } from "@/services/contactsService";
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

  // Fetch total contacts count from API once on component mount
  useEffect(() => {
    let isMounted = true;
    
    const fetchTotalContacts = async () => {
      try {
        const response = await fetch('https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu/contacts_count');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch total contacts count: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Only update state if component is still mounted
        if (isMounted) {
          setTotalContacts(data.count);
          console.log(`Total contacts count: ${data.count}`);
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
      }
    };
    
    fetchTotalContacts();
    
    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
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
        
        console.log(`Fetching contacts from ID ${startId} to ${endId}, page ${currentPage}, items per page: ${itemsPerPage}`);
        
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
  
  return {
    contacts,
    isLoading,
    error,
    totalContacts,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage
  };
};
