
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
  const [hasPerformedInitialSearch, setHasPerformedInitialSearch] = useState(false);
  const { toast } = useToast();

  const searchPersons = async (params: SearchParams) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu/contacts_0", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: params.name || "",
          investor: params.investor || "",
          firm_type: params.firm_type || ""
        }),
      });

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Search results:", data);
      setSearchResults(Array.isArray(data) ? data : []);
      setHasPerformedInitialSearch(true);
    } catch (err: any) {
      console.error("Error searching persons:", err);
      setError("Failed to search. Please try again.");
      toast({
        title: "Search Error",
        description: "Failed to search for persons. Please try again later.",
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
    hasPerformedInitialSearch 
  };
};
