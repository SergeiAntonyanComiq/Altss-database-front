
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

// We'll limit to a reasonable number to avoid excessive API calls
const MAX_CONTACTS = 50;

export const useContactsData = ({
  initialPage,
  initialItemsPerPage
}: UseContactsDataProps): UseContactsDataReturn => {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState<number>(initialItemsPerPage);

  // For demonstration, we're limiting the total to avoid excessive API calls
  // In production, this would be from an API that returns the total count
  const totalContacts = MAX_CONTACTS;

  useEffect(() => {
    const fetchContacts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const startId = (currentPage - 1) * itemsPerPage + 1;
        const endId = Math.min(startId + itemsPerPage - 1, MAX_CONTACTS);
        
        const contactPromises: Promise<ContactType>[] = [];
        
        // Fetch contacts one by one
        for (let id = startId; id <= endId; id++) {
          contactPromises.push(fetchContactById(id));
        }
        
        // Wait for all requests to complete
        const fetchedContacts = await Promise.all(contactPromises);
        setContacts(fetchedContacts);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        toast({
          title: "Error",
          description: "Failed to fetch contacts. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchContacts();
  }, [currentPage, itemsPerPage]);
  
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
