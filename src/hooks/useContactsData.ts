import { useState, useEffect, useCallback, useRef } from "react";
import { ContactType } from "@/types/contact";
import { fetchContactById, fetchContactsCount, fetchFilteredContacts } from "@/services/contactsService";
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

  // Fetch contacts whenever page, items per page, or filters change
  useEffect(() => {
    let isMounted = true;
    
    const fetchContactsData = async () => {
      if (isMounted) {
        setIsLoading(true);
        setError(null);
      }
      
      try {
        // Prepare filters object with pagination
        const filters: Record<string, string | number> = {
          limit: itemsPerPage,
          offset: (currentPage - 1) * itemsPerPage,
          sortBy: "name"
        };
        
        // Add any active filters
        if (firmTypes.length > 0) {
          filters.firm_type = firmTypes.join(',');
        }
        
        if (companyName) {
          filters.investor = companyName;
        }

        if (position) {
          filters.job_title = position;
        }

        if (location) {
          // Use city/country fields for location
          if (location.includes(",")) {
            const [city, country] = location.split(",").map(s => s.trim());
            filters.city = city;
            filters.country_territory = country;
          } else {
            // Try both fields
            filters.location = location;
          }
        }

        if (responsibilities) {
          filters.asset_class = responsibilities;
        }

        if (bio) {
          filters.role = bio;
        }
        
        // Fetch contacts with filters applied
        const response = await fetchFilteredContacts(filters);
        console.log(`Fetched ${response.data.length} contacts for page ${currentPage}, itemsPerPage: ${itemsPerPage}, total: ${response.total}`);
        
        if (isMounted) {
          setContacts(response.data);
          setTotalContacts(response.total); // Update total contacts from response
        }
      } catch (err) { 
        console.error("Error fetching contacts:", err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('An unknown error occurred'));
          setContacts([]); // Clear contacts on error
          toast({
            title: "Error",
            description: "Failed to fetch contacts. Please try again later.",
            variant: "destructive",
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    fetchContactsData();
    
    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [currentPage, itemsPerPage, firmTypes, companyName, position, location, responsibilities, bio]);
  
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
