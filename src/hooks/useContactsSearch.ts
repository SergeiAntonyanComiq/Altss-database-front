
import { useState } from 'react';
import { ContactType } from '@/types/contact';
import { toast } from "@/hooks/use-toast";

interface SearchParams {
  name?: string;
  investor?: string;
  firm_type?: string;
}

export const useContactsSearch = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ContactType[] | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [lastSearchParams, setLastSearchParams] = useState<SearchParams | null>(null);

  const search = async (params: SearchParams) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setLastSearchParams(params);
    
    try {
      console.log('Searching with params:', params);
      const response = await fetch('https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu/contacts_0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: params.name || "",
          investor: params.investor || "",
          firm_type: params.firm_type || ""
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }

      const result = await response.json();
      console.log('Search results:', result);
      setData(result);
    } catch (err) {
      console.error('Search error:', err);
      setError('Data is unavailable');
      toast({
        title: "Error",
        description: "Failed to fetch contacts data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setData(null);
    setError(null);
    setHasSearched(false);
    setLastSearchParams(null);
  };

  return {
    isLoading,
    error,
    data,
    lastSearchParams,
    search,
    clearSearch,
    hasSearched
  };
};
