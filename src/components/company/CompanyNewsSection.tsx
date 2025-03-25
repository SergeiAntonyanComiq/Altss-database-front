
import React, { useState } from "react";
import { CompanyType } from "@/types/company";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchCompanyNews, NewsItem, NewsSourceLink } from "@/services/news/NewsService";
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
  const [sourceLinks, setSourceLinks] = useState<NewsSourceLink[]>([]);
  const [rawApiData, setRawApiData] = useState<any>(null);
  const { toast } = useToast();

  const handleSearchNews = async () => {
    setIsSearching(true);
    setError(null);
    
    try {
      const companyName = company.firm_name || company.name || "";
      const result = await fetchCompanyNews(company);
      
      setNewsItems(result.newsItems);
      setSourceLinks(result.sourceLinks);
      setRawApiData(result.rawApiData);
      setHasSearched(true);
      
      toast({
        title: "Success",
        description: `Found ${result.newsItems.length} news items for ${companyName}`,
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
          sourceLinks={sourceLinks}
        />

        {rawApiData && (
          <div className="mt-8 border-t pt-4">
            <h3 className="text-lg font-medium mb-2">Raw API Data</h3>
            <div className="bg-gray-100 p-4 rounded overflow-auto max-h-[500px] text-xs">
              <pre>{JSON.stringify(rawApiData, null, 2)}</pre>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default CompanyNewsSection;
