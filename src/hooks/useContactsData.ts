
import { useState, useEffect, useCallback } from "react";
import { ContactType } from "@/types/contact";
import { fetchContacts, fetchContactsCount } from "@/services/contactsService";
import { useToast } from "@/components/ui/use-toast";

interface UseContactsDataProps {
  initialPage?: number;
  initialItemsPerPage?: number;
  firmTypes?: string[];
  searchQuery?: string;
}

export const useContactsData = ({
  initialPage = 1,
  initialItemsPerPage = 10,
  firmTypes = [],
  searchQuery = ""
}: UseContactsDataProps = {}) => {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalContacts, setTotalContacts] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const { toast } = useToast();

  // Load contacts when parameters change
  const loadContacts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Loading contacts with filters:", {
        page: currentPage,
        limit: itemsPerPage,
        firmTypes,
        searchQuery
      });
      
      // Always fetch contacts - only apply firmTypes filter if the array is not empty
      const data = await fetchContacts(
        currentPage, 
        itemsPerPage, 
        firmTypes && firmTypes.length > 0 ? firmTypes : undefined
      );
      
      console.log("Received contacts:", data.length);
      setContacts(data);
      
      // Fetch total count on first load or when filters change
      const count = await fetchContactsCount();
      setTotalContacts(count);
      
    } catch (err) {
      console.error("Error loading contacts:", err);
      setError("Failed to load contacts. Please try again later.");
      setContacts([]); // Set empty array on error
      
      toast({
        title: "Error",
        description: "Failed to load contacts. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage, firmTypes, searchQuery, toast]);

  // Effect to load contacts when parameters change
  useEffect(() => {
    console.log("useContactsData effect triggered with:", { 
      page: currentPage, 
      limit: itemsPerPage, 
      firmTypes: firmTypes?.length > 0 ? firmTypes : 'none'
    });
    loadContacts();
  }, [loadContacts]);

  return {
    contacts,
    isLoading,
    error,
    totalContacts,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    refreshContacts: loadContacts
  };
};
