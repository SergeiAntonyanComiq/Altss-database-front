
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
    console.log('useContactsSearch.search() - Called with params:', params);
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setLastSearchParams(params);
    
    try {
      console.log('useContactsSearch - Raw search params:', params);
      console.log('useContactsSearch - Search params types:', {
        name: typeof params.name,
        investor: typeof params.investor,
        firm_type: typeof params.firm_type
      });
      console.log('useContactsSearch - Search params values:', {
        nameLength: params.name?.length || 0,
        investorLength: params.investor?.length || 0,
        firm_typeLength: params.firm_type?.length || 0
      });
      
      // Filter out empty parameters
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined && value !== "")
      );
      
      console.log('useContactsSearch - Filtered params:', filteredParams);
      console.log('useContactsSearch - Filtered params count:', Object.keys(filteredParams).length);
      
      // Skip API call if all parameters are empty
      if (Object.keys(filteredParams).length === 0) {
        console.log('useContactsSearch - All parameters are empty, skipping API call');
        setData([]);
        setIsLoading(false);
        toast({
          title: "No Search Parameters",
          description: "Please enter at least one search term",
          variant: "destructive",
        });
        return;
      }
      
      const apiUrl = 'https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu/contacts_0';
      console.log('useContactsSearch - Making API request to:', apiUrl);
      console.log('useContactsSearch - Request body:', JSON.stringify(filteredParams));
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filteredParams),
      });

      console.log('useContactsSearch - API response status:', response.status);
      
      if (!response.ok) {
        console.error('useContactsSearch - API response not OK:', response.status, response.statusText);
        throw new Error('Failed to fetch contacts');
      }

      const result = await response.json();
      console.log('useContactsSearch - API result type:', typeof result);
      console.log('useContactsSearch - API result is array?', Array.isArray(result));
      console.log('useContactsSearch - API result length:', Array.isArray(result) ? result.length : 'N/A');
      console.log('useContactsSearch - First result item (if any):', Array.isArray(result) && result.length > 0 ? result[0] : 'No results');
      
      if (Array.isArray(result)) {
        setData(result);
        toast({
          title: "Search Complete",
          description: `Found ${result.length} contacts matching your criteria`,
        });
      } else {
        console.error('useContactsSearch - API returned unexpected data format:', result);
        setData([]);
        toast({
          title: "Warning",
          description: "The API returned an unexpected data format",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error('useContactsSearch - Search error:', err);
      setError('Failed to fetch contacts');
      setData(null);
      toast({
        title: "Error",
        description: "Failed to fetch contacts data",
        variant: "destructive",
      });
    } finally {
      console.log('useContactsSearch - Search completed, setting isLoading to false');
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    console.log('useContactsSearch - Clearing search data and state');
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
