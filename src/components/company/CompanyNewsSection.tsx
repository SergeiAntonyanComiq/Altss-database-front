
import React, { useState } from "react";
import { CompanyType } from "@/types/company";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchCompanyNews, NewsItem, searchNewsViaPerplexica } from "@/services/news/NewsService";
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
  const [sourceLinks, setSourceLinks] = useState<Array<{title: string, url: string}>>([]);
  const { toast } = useToast();

  const handleSearchNews = async () => {
    setIsSearching(true);
    setError(null);
    
    try {
      // First, get the raw Perplexica response to extract all source links
      const companyName = company.firm_name || company.name || "";
      const perplexicaData = await searchNewsViaPerplexica(companyName);
      
      // Extract all unique source links
      const links: Array<{title: string, url: string}> = [];
      if (perplexicaData && perplexicaData.sources && perplexicaData.sources.length > 0) {
        perplexicaData.sources.forEach(source => {
          if (source.metadata && source.metadata.url) {
            // Check if URL is valid
            const isValidUrl = source.metadata.url.startsWith('http://') || 
                              source.metadata.url.startsWith('https://') || 
                              source.metadata.url.startsWith('www.');
            
            if (isValidUrl) {
              // Check if this URL is already in our links array
              const urlExists = links.some(link => link.url === source.metadata.url);
              if (!urlExists) {
                links.push({
                  title: source.metadata.title || source.metadata.url,
                  url: source.metadata.url
                });
              }
            }
          }
        });
      }
      setSourceLinks(links);
      
      // Then get the processed news items
      const items = await fetchCompanyNews(company);
      setNewsItems(items);
      setHasSearched(true);
      
      toast({
        title: "Success",
        description: `Found ${items.length} news items for ${companyName}`,
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
      </section>
    </div>
  );
};

export default CompanyNewsSection;
