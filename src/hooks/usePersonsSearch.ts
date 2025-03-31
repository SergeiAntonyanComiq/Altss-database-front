
import { useState } from "react";
import { ContactType } from "@/types/contact";
import { useToast } from "@/components/ui/use-toast";

interface SearchParams {
  name?: string;
  investor?: string;
  firm_type?: string;
}

export const usePersonsSearch = () => {
  const [searchResults, setSearchResults] = useState<ContactType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const searchPersons = async (params: SearchParams = {}) => {
    setIsLoading(true);
    setError(null);
    
    console.log("Search params:", params);

    try {
      // Define the API endpoint
      const apiUrl = "https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu/contacts_0";
      
      // Build query string from params
      const queryParams = new URLSearchParams();
      if (params.name) queryParams.append("name", params.name);
      if (params.investor) queryParams.append("investor", params.investor);
      if (params.firm_type) queryParams.append("firm_type", params.firm_type);
      
      const requestUrl = `${apiUrl}?${queryParams.toString()}`;
      console.log("Sending GET request to:", requestUrl);
      
      const response = await fetch(requestUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      console.log("Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Search results:", data);
      
      if (Array.isArray(data)) {
        setSearchResults(data);
        console.log("Found", data.length, "results");
      } else {
        console.log("Received data is not an array:", data);
        setSearchResults([]);
      }
    } catch (err: any) {
      console.error("Error searching persons:", err);
      setError("Failed to search. Please try again.");
      toast({
        title: "Search Error",
        description: `Failed to search for persons: ${err.message}`,
        variant: "destructive",
      });
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // New function to load initial data or reset filters
  const loadInitialContacts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // We'll load a small set of individual contacts as a sample
      // In a real production app, you might want to paginate or implement a more efficient strategy
      const contactIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const results: ContactType[] = [];
      
      // Fetch contacts one by one
      for (const id of contactIds) {
        const apiUrl = `https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu/fund_managers/${id}`;
        console.log(`Fetching contact with ID: ${id} from ${apiUrl}`);
        
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        });
        
        if (response.ok) {
          const contact = await response.json();
          // Map the fund manager fields to contact fields
          const mappedContact: ContactType = {
            id: contact.id,
            firm_id: contact.firm_id,
            contact_id: contact.id,
            investor: contact.firm_name || "",
            firm_type: contact.firm_type || "",
            title: "",
            name: contact.firm_name || "",
            alternative_name: contact.local_language_firm_name || "",
            role: contact.pe_main_firm_strategy || "",
            job_title: "",
            asset_class: contact.pe_strategies || "",
            email: contact.email || "",
            tel: contact.tel || "",
            city: contact.city || "",
            state: contact.state_county || "",
            country_territory: contact.country || "",
            zip_code: contact.zip_code || "",
            linkedin: contact.website || "",
            favorite: false
          };
          
          results.push(mappedContact);
        } else {
          console.warn(`Failed to fetch contact with ID: ${id}`);
        }
      }
      
      setSearchResults(results);
      console.log("Loaded initial contacts:", results.length);
      
    } catch (err: any) {
      console.error("Error loading initial contacts:", err);
      setError("Failed to load initial data. Please refresh the page.");
      toast({
        title: "Loading Error",
        description: `Failed to load initial data: ${err.message}`,
        variant: "destructive",
      });
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    searchResults, 
    isLoading, 
    error, 
    searchPersons, 
    resetSearch: loadInitialContacts,
    loadInitialContacts
  };
};
