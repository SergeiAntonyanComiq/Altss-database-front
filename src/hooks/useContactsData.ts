import { useState, useEffect, useCallback, useRef } from "react";
import { ContactType } from "@/types/contact";
import {
  fetchContactById,
  fetchContactsCount,
  fetchFilteredContacts,
} from "@/services/contactsService";
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
  setIsLoading: (loading: boolean) => void;
}

export const useContactsData = ({
  initialPage,
  initialItemsPerPage,
  firmTypes = [],
  companyName = "",
  position = "",
  location = "",
  responsibilities = "",
  bio = "",
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
    setIsLoading(true);

    const fetchTotalContactsData = async () => {
      try {
        const count = await fetchContactsCount();

        // Only update state if component is still mounted
        if (isMounted) {
          setTotalContacts(count);
        }
      } catch (err) {
        if (isMounted) {
          toast({
            title: "Warning",
            description:
              "Could not fetch total contacts count. Pagination may be inaccurate.",
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
      setIsLoading(true);

      if (!isMounted) return;
      setError(null);

      try {
        const filterParams = {
          limit: itemsPerPage,
          offset: (currentPage - 1) * itemsPerPage,
          sortBy: "name",
          ...(firmTypes.length > 0 && { firm_type: firmTypes.join(",") }),
          ...(companyName && { investor: companyName }),
          ...(position && { job_title: position }),
          ...(location && { location: location }),
          ...(responsibilities && { asset_class: responsibilities }),
          ...(bio && { role: bio }),
        };

        const contactsResponse = await fetchFilteredContacts(filterParams);
        const favoritesResponse = await getFavoritePersons();

        if (!isMounted) return;

        const favIds = new Set(favoritesResponse.map((fav) => fav.id));
        setFavoriteIds(favIds);

        const updatedContacts = contactsResponse.data.map((contact) => ({
          ...contact,
          favorite: favIds.has(String(contact.contact_id)),
        }));

        setContacts(updatedContacts);
        setTotalContacts(contactsResponse.total);
      } catch (err) {
        if (!isMounted) return;
        console.error("Error fetching contacts or favorites:", err);
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred"),
        );
        setContacts([]); // Clear contacts on error
        toast({
          title: "Error",
          description:
            "Failed to fetch contacts or favorites. Please try again later.",
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
  }, [
    currentPage,
    itemsPerPage,
    firmTypes,
    companyName,
    position,
    location,
    responsibilities,
    bio,
    toast,
  ]);

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
    setIsLoading,
    setCurrentPage: handlePageChange,
    itemsPerPage,
    setItemsPerPage: handleItemsPerPageChange,
  };
};
