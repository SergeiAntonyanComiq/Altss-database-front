
import React, { useState } from "react";
import { CompanyType } from "@/types/company";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchCompanyNews, NewsItem } from "@/services/news/NewsService";
import NewsList from "./news/NewsList";
import NewsSearch from "./news/NewsSearch";

interface CompanyNewsSectionProps {
  company: CompanyType;
}

const CompanyNewsSection: React.FC<CompanyNewsSectionProps> = ({ company }) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [apiResponseData, setApiResponseData] = useState<any>(null);
  const { toast } = useToast();

  const handleSearchNews = async () => {
    setIsSearching(true);
    setError(null);
    
    try {
      const result = await fetchCompanyNews(company);
      setNewsItems(result.newsItems);
      setApiResponseData(result.apiResponse);
      setHasSearched(true);
      
      toast({
        title: "Success",
        description: `Found ${result.newsItems.length} news items for ${company.firm_name || company.name}`,
      });
    } catch (error) {
      console.error("Error fetching company news:", error);
      setError(`Failed to fetch company news: ${error.message}`);
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

        {/* API Response Data Display for debugging */}
        {apiResponseData && (
          <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-200 overflow-auto max-h-96">
            <h3 className="text-lg font-medium mb-2">API Response Data:</h3>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(apiResponseData, null, 2)}
            </pre>
          </div>
        )}

        <NewsList 
          newsItems={newsItems} 
          hasSearched={hasSearched} 
          companyName={companyName}
          apiResponseData={apiResponseData}
        />
      </section>
    </div>
  );
};

export default CompanyNewsSection;
