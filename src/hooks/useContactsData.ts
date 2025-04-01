
import { useState, useEffect } from 'react';
import { fetchContacts, fetchContactsCount } from '@/services/contactsService';
import { ContactType } from '@/types/contact';

interface UseContactsDataProps {
  initialPage?: number;
  initialItemsPerPage?: number;
  firmTypes?: string[];
  searchQuery?: string;
}

const useContactsData = ({
  initialPage = 1,
  initialItemsPerPage = 10,
  firmTypes = [],
  searchQuery = ''
}: UseContactsDataProps = {}) => {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState<number>(initialItemsPerPage);
  const [totalContacts, setTotalContacts] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;
    
    const loadContacts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log(`Loading contacts for page ${currentPage} with ${itemsPerPage} per page`);
        console.log(`Applied filters: ${firmTypes?.length || 0} firm types`);
        if (firmTypes && firmTypes.length > 0) {
          console.log('Filter types:', firmTypes);
        }
        
        // Fetch contacts with filters if provided
        const data = await fetchContacts(currentPage, itemsPerPage, firmTypes);
        
        // Only update state if component is still mounted
        if (isMounted) {
          setContacts(data);
          console.log(`Loaded ${data.length} contacts`);
          
          // Fetch total count for pagination
          try {
            const count = await fetchContactsCount();
            setTotalContacts(count);
            console.log(`Total contacts: ${count}`);
          } catch (countError) {
            console.error("Error fetching total contacts count:", countError);
            // Don't set error state here to allow displaying the contacts we already fetched
          }
        }
      } catch (err) {
        console.error("Error in useContactsData:", err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadContacts();

    return () => {
      isMounted = false;
    };
  }, [currentPage, itemsPerPage, firmTypes, searchQuery]);

  return {
    contacts,
    isLoading,
    error,
    currentPage,
    itemsPerPage,
    totalContacts,
    setCurrentPage,
    setItemsPerPage
  };
};

export { useContactsData };
