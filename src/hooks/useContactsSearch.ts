
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
      
      // Filter out empty parameters
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined && value !== "")
      );
      
      // Skip API call if all parameters are empty
      if (Object.keys(filteredParams).length === 0) {
        console.log('All parameters are empty, skipping API call');
        setData([]);
        setIsLoading(false);
        toast({
          title: "No Search Parameters",
          description: "Please enter at least one search term",
          variant: "destructive",
        });
        return;
      }
      
      const response = await fetch('https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu/contacts_0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filteredParams),
      });

      if (!response.ok) {
        console.error('API response not OK:', response.status, response.statusText);
        throw new Error('Failed to fetch contacts');
      }

      const result = await response.json();
      console.log('Search results:', result);
      
      if (Array.isArray(result)) {
        setData(result);
        toast({
          title: "Search Complete",
          description: `Found ${result.length} contacts matching your criteria`,
        });
      } else {
        console.error('API returned unexpected data format:', result);
        setData([]);
        toast({
          title: "Warning",
          description: "The API returned an unexpected data format",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to fetch contacts');
      setData(null);
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
