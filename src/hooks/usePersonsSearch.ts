
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

  return { searchResults, isLoading, error, searchPersons };
};
