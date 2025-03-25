
import React, { useState, useEffect } from "react";
import { CompanyType } from "@/types/company";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchCompanyNews, NewsItem } from "@/services/news/NewsService";
import NewsList from "./news/NewsList";
import NewsSearch from "./news/NewsSearch";
import { InfoCircle } from "lucide-react";

interface CompanyNewsSectionProps {
  company: CompanyType;
}

const CompanyNewsSection: React.FC<CompanyNewsSectionProps> = ({ company }) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [apiResponseData, setApiResponseData] = useState<any>(null);
  const [isFallbackData, setIsFallbackData] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    console.log("CompanyNewsSection mounted with company:", company);
  }, [company]);

  const handleSearchNews = async () => {
    setIsSearching(true);
    setError(null);
    setIsFallbackData(false);
    
    try {
      console.log("Searching news for company:", company.firm_name || company.name);
      const result = await fetchCompanyNews(company);
      console.log("News search result:", result);
      
      setNewsItems(result.newsItems);
      setApiResponseData(result.apiResponse);
      setHasSearched(true);
      
      // Check if we got fallback data
      if (result.apiResponse && result.apiResponse.isFallbackData) {
        setIsFallbackData(true);
        toast({
          title: "Using sample data",
          description: "Could not connect to the news API. Showing sample data instead.",
          variant: "default",
        });
      } else if (result.newsItems.length === 0) {
        toast({
          title: "No news found",
          description: `Couldn't find any news for ${company.firm_name || company.name}. Try adjusting your search.`,
          variant: "default",
        });
      } else {
        toast({
          title: "Success",
          description: `Found ${result.newsItems.length} news items for ${company.firm_name || company.name}`,
        });
      }
    } catch (error) {
      console.error("Error fetching company news:", error);
      setError(`Failed to fetch company news: ${error instanceof Error ? error.message : 'Unknown error'}`);
      toast({
        title: "Error",
        description: "Failed to fetch company news. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const companyName = company.firm_name || company.name || "";

  return (
    <div className="space-y-8">
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Company News</h2>
          <NewsSearch onSearch={handleSearchNews} isSearching={isSearching} />
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {isFallbackData && (
          <Alert variant="warning" className="mb-4 bg-amber-50 border-amber-200">
            <InfoCircle className="h-4 w-4 text-amber-500" />
            <AlertTitle className="text-amber-700">Using Demo Data</AlertTitle>
            <AlertDescription className="text-amber-600">
              Unable to connect to the news API due to security restrictions. 
              Showing example data instead. In a production environment, 
              this would require a secure HTTPS endpoint.
            </AlertDescription>
          </Alert>
        )}

        <NewsList 
          newsItems={newsItems} 
          hasSearched={hasSearched} 
          companyName={companyName}
          apiResponseData={apiResponseData}
          isFallbackData={isFallbackData}
        />
      </section>
    </div>
  );
};

export default CompanyNewsSection;
