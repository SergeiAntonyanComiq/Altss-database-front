
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
      
      // Create request payload
      const payload = {
        name: params.name || "",
        investor: params.investor || "",
        firm_type: params.firm_type || ""
      };
      
      console.log("Sending request to:", apiUrl);
      console.log("With payload:", payload);
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
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
