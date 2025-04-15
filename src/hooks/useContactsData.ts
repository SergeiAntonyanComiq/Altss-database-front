import { useState, useEffect, useCallback, useRef } from "react";
import { ContactType } from "@/types/contact";
import { fetchContactById, fetchContactsCount, fetchFilteredContacts } from "@/services/contactsService";
import { getFavoritePersons } from "@/services/savedFiltersService";
import { toast } from "@/components/ui/use-toast";

interface UseContactsDataProps {
  initialPage: number;
  initialItemsPerPage: number;
  firmTypes?: string[];
  companyName?: string;
  position?: string;
  location?: string;
  responsibilities?: string;
  bio?: string;
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
  initialItemsPerPage,
  firmTypes = [],
  companyName = "",
  position = "",
  location = "",
  responsibilities = "",
  bio = ""
}: UseContactsDataProps): UseContactsDataReturn => {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState<number>(initialItemsPerPage);
  const [totalContacts, setTotalContacts] = useState<number>(0);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  
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

  // Fetch contacts and favorites whenever page, items per page, or filters change
  useEffect(() => {
    let isMounted = true;
    
    const fetchContactsAndFavorites = async () => {
      if (!isMounted) return;
      setIsLoading(true);
      setError(null);
      
      try {
        // Debug log for filter parameters - more detailed
        console.log('FILTER DEBUG - Raw filter props:', {
          firmTypes,
          companyName,
          position,
          location,
          responsibilities,
          bio
        });
        
        const filterParams = {
          limit: itemsPerPage,
          offset: (currentPage - 1) * itemsPerPage,
          sortBy: "name",
          ...(firmTypes.length > 0 && { firm_type: firmTypes.join(',') }),
          ...(companyName && { investor: companyName }),
          ...(position && { job_title: position }),
          ...(location && { location: location }),
          ...(responsibilities && { asset_class: responsibilities }),
          ...(bio && { role: bio })
        };
        console.log('FILTER DEBUG - Constructed API params:', filterParams);
        
        const contactsResponse = await fetchFilteredContacts(filterParams);
        const favoritesResponse = await getFavoritePersons();

        if (!isMounted) return;

        console.log(`Fetched ${contactsResponse.data.length} contacts for page ${currentPage}, total: ${contactsResponse.total}`);
        console.log(`Fetched ${favoritesResponse.length} favorite persons`);

        // Обновляем ID избранных
        const favIds = new Set(favoritesResponse.map(fav => fav.id));
        setFavoriteIds(favIds);

        // Обновляем контакты, устанавливая флаг favorite
        const updatedContacts = contactsResponse.data.map(contact => ({
          ...contact,
          favorite: favIds.has(String(contact.contact_id))
        }));
        
        // Remove client-side location filtering, assuming API handles it now
        // if (location) { ... }

        setContacts(updatedContacts);
        setTotalContacts(contactsResponse.total);

      } catch (err) { 
        if (!isMounted) return;
        console.error("Error fetching contacts or favorites:", err);
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        setContacts([]); // Clear contacts on error
        toast({
          title: "Error",
          description: "Failed to fetch contacts or favorites. Please try again later.",
          variant: "destructive",
        });
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    fetchContactsAndFavorites();
    
    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [currentPage, itemsPerPage, firmTypes, companyName, position, location, responsibilities, bio, toast]);
  
  // Effect to sync with prop changes (but not on every render)
  useEffect(() => {
    if (initialPageRef.current !== initialPage) {
      initialPageRef.current = initialPage;
      setCurrentPage(initialPage);
    }
  }, [initialPage, setCurrentPage]);
  
  useEffect(() => {
    if (initialItemsPerPageRef.current !== initialItemsPerPage) {
      initialItemsPerPageRef.current = initialItemsPerPage;
      setItemsPerPage(initialItemsPerPage);
    }
  }, [initialItemsPerPage, setItemsPerPage]);
  
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
