import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { NewsItem, defaultNewsItems, fetchCompanyNews } from "@/services/newsService";

/**
 * Custom hook to handle company news fetching and state
 * @param companyName The company name to fetch news for
 * @returns Object containing news items, loading state, and fetch function
 */
export const useCompanyNews = (companyName: string) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(defaultNewsItems);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchNews = async () => {
    setIsLoading(true);
    
    try {
      const fetchedNews = await fetchCompanyNews(companyName);
      
      if (fetchedNews.length > 0) {
        setNewsItems(fetchedNews);
        toast({
          title: "Success",
          description: `Found ${fetchedNews.length} news items about ${companyName}`,
        });
      } else {
        // Keep default news if no results were parsed
        toast({
          title: "No News Found",
          description: "No specific news found for this company. Showing sample news instead.",
        });
      }
    } catch (error) {
      console.error("Error fetching company news:", error);
      toast({
        title: "Error",
        description: "Failed to fetch company news. Please try again later.",
        variant: "destructive",
      });
      
      // If there's a CORS error or other network issue, show a more specific message
      if (error instanceof TypeError && error.message.includes('network')) {
        toast({
          title: "Network Error",
          description: "Unable to connect to news service. Using sample data instead.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    newsItems,
    isLoading,
    fetchNews
  };
};
