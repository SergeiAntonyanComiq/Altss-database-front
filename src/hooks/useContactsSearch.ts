
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

  const search = async (params: SearchParams) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    
    try {
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
      setData(result);
    } catch (err) {
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
  };

  return {
    isLoading,
    error,
    data,
    search,
    clearSearch,
    hasSearched
  };
};
