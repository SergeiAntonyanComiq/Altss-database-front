
import { useCallback, useEffect, useState } from "react";
import { fetchContacts, fetchContactsCount } from "@/services/contactsService";
import { ContactType } from "@/types/contact";
import { toast } from "@/components/ui/use-toast";

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
      
      // Show error toast
      toast({
        title: "Error loading contacts",
        description: "There was a problem loading the contacts data. We've added some sample data for now.",
        variant: "destructive",
      });
      
      // Set some sample data for UI testing
      const sampleData: ContactType[] = [
        {
          id: 101,
          firm_id: 5,
          contact_id: 12345,
          investor: "Sample Investor",
          firm_type: firmTypes.length > 0 ? firmTypes[0] : "Private Equity Firm",
          title: "Ms.",
          name: "Sample Contact",
          alternative_name: "",
          role: "Investment Team",
          job_title: "Partner",
          asset_class: "PE",
          email: "sample@example.com",
          tel: "+1 234 567 8900",
          city: "New York",
          state: "NY",
          country_territory: "USA",
          zip_code: "10001",
          linkedin: "",
          favorite: false
        },
        {
          id: 102,
          firm_id: 5,
          contact_id: 12346,
          investor: "Sample Investor",
          firm_type: firmTypes.length > 0 ? firmTypes[0] : "Private Equity Firm",
          title: "Mr.",
          name: "Another Contact",
          alternative_name: "",
          role: "Operations",
          job_title: "Director",
          asset_class: "INF",
          email: "another@example.com",
          tel: "+1 234 567 8901",
          city: "Boston",
          state: "MA",
          country_territory: "USA",
          zip_code: "02108",
          linkedin: "",
          favorite: true
        }
      ];
      
      setContacts(sampleData);
      setTotalContacts(100); // Set a reasonable number for pagination
    }
  }, [currentPage, itemsPerPage, firmTypes]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  // Function to reset to page 1 when filters change
  const resetToFirstPage = useCallback(() => {
    if (currentPage !== 1) {
      console.log("Resetting to first page due to filter change");
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
