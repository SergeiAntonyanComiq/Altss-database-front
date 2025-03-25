
import React, { useState, useEffect } from "react";
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

  // Log company info for debugging
  useEffect(() => {
    console.log("CompanyNewsSection mounted with company:", company);
  }, [company]);

  const handleSearchNews = async () => {
    setIsSearching(true);
    setError(null);
    
    try {
      console.log("Searching news for company:", company.firm_name || company.name);
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
