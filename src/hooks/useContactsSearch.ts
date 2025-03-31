
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
    console.log('🔍 useContactsSearch.search() - Called with params:', params);
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setLastSearchParams(params);
    
    try {
      console.log('🔍 useContactsSearch - Raw search params:', params);
      
      // Filter out empty parameters
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined && value !== "")
      );
      
      console.log('🔍 useContactsSearch - Filtered params:', filteredParams);
      console.log('🔍 useContactsSearch - Filtered params count:', Object.keys(filteredParams).length);
      
      // Skip API call if all parameters are empty
      if (Object.keys(filteredParams).length === 0) {
        console.log('⚠️ useContactsSearch - All parameters are empty, skipping API call');
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
      console.log('🔌 useContactsSearch - Making API request to:', apiUrl);
      console.log('📤 useContactsSearch - Request body:', JSON.stringify(filteredParams));
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filteredParams),
      });

      console.log('📥 useContactsSearch - API response status:', response.status);
      
      if (!response.ok) {
        console.error('❌ useContactsSearch - API response not OK:', response.status, response.statusText);
        throw new Error(`Failed to fetch contacts: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('📦 useContactsSearch - API result type:', typeof result);
      console.log('📦 useContactsSearch - API result is array?', Array.isArray(result));
      console.log('📦 useContactsSearch - API result:', result);
      
      if (Array.isArray(result)) {
        console.log('✅ useContactsSearch - Successfully received array of contacts, length:', result.length);
        if (result.length > 0) {
          console.log('📋 useContactsSearch - Sample contact:', result[0]);
        } else {
          console.log('⚠️ useContactsSearch - Received empty array of contacts');
        }
        
        // Ensure all contacts have the favorite property
        const processedData = result.map(contact => ({
          ...contact,
          favorite: false
        }));
        
        setData(processedData);
        toast({
          title: "Search Complete",
          description: `Found ${processedData.length} contacts matching your criteria`,
        });
      } else {
        console.error('❌ useContactsSearch - API returned unexpected data format:', result);
        setData([]);
        toast({
          title: "Warning",
          description: "The API returned an unexpected data format",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error('❌ useContactsSearch - Search error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch contacts');
      setData(null);
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to fetch contacts data",
        variant: "destructive",
      });
    } finally {
      console.log('🏁 useContactsSearch - Search completed, setting isLoading to false');
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    console.log('🧹 useContactsSearch - Clearing search data and state');
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
