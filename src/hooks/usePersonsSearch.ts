
import { useState, useEffect } from "react";
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

  // Function to fetch a single contact by ID
  const fetchSingleContact = async (contactId: number): Promise<ContactType | null> => {
    try {
      const apiUrl = `https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu/contacts/${contactId}`;
      console.log(`Fetching contact with ID: ${contactId}`);
      
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          console.log(`Contact with ID ${contactId} not found`);
          return null;
        }
        throw new Error(`Failed to fetch contact: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`Successfully fetched contact: ${contactId}`, data);
      return data;
    } catch (err) {
      console.error(`Error fetching contact ${contactId}:`, err);
      return null;
    }
  };

  // Function to fetch multiple individual contacts in parallel batches
  const fetchMultipleContacts = async (startId: number, count: number, batchSize: number = 10) => {
    setIsLoading(true);
    setError(null);

    try {
      const allContacts: ContactType[] = [];
      const endId = startId + count - 1;
      
      console.log(`Fetching ${count} contacts from ID ${startId} to ${endId}`);
      
      // Process in batches to avoid overwhelming the API
      for (let currentStart = startId; currentStart <= endId; currentStart += batchSize) {
        const batchEnd = Math.min(currentStart + batchSize - 1, endId);
        console.log(`Fetching batch from ${currentStart} to ${batchEnd}`);
        
        const batchPromises = [];
        for (let id = currentStart; id <= batchEnd; id++) {
          batchPromises.push(fetchSingleContact(id));
        }
        
        const batchResults = await Promise.all(batchPromises);
        const validContacts = batchResults.filter(contact => contact !== null) as ContactType[];
        allContacts.push(...validContacts);
        
        console.log(`Batch complete. Found ${validContacts.length} valid contacts`);
      }
      
      console.log(`Total contacts found: ${allContacts.length}`);
      setSearchResults(allContacts);
      
      if (allContacts.length === 0) {
        toast({
          title: "No Data Found",
          description: "Could not retrieve any valid contact data.",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      console.error("Error fetching contacts:", err);
      setError("Failed to fetch contacts. Please try again.");
      toast({
        title: "Error Loading Data",
        description: `Failed to fetch contacts: ${err.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const searchPersons = async (params: SearchParams) => {
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
        
        if (data.length === 0) {
          toast({
            title: "No Results",
            description: "Your search didn't return any results. Please try different search terms.",
          });
        }
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

  const resetSearch = async () => {
    // Reset to initial data - fetch first 20 contacts
    await fetchMultipleContacts(1, 20);
  };

  return { 
    searchResults, 
    isLoading, 
    error, 
    searchPersons, 
    fetchMultipleContacts,
    resetSearch 
  };
};
