import React, { useState } from "react";
import { CompanyType } from "@/types/company";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import NewsItem from "@/components/company/NewsItem";
import { NewsItem as NewsItemType, defaultNewsItems, fetchCompanyNews } from "@/services/newsService";

interface CompanyNewsSectionProps {
  company: CompanyType;
}

const CompanyNewsSection: React.FC<CompanyNewsSectionProps> = ({ company }) => {
  const [newsItems, setNewsItems] = useState<NewsItemType[]>(defaultNewsItems);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFetchNews = async () => {
    setIsLoading(true);
    
    try {
      const companyName = company.firm_name || company.name || "";
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

  return (
    <div className="space-y-8">
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Company News</h2>
          <Button 
            onClick={handleFetchNews} 
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            {isLoading ? "Searching..." : "Search News"}
          </Button>
        </div>

        {isLoading ? (
          <div className="py-4 text-center">
            <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-gray-600">Loading news about {company.firm_name || company.name || ""}...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {newsItems.length > 0 ? (
              newsItems.map(item => (
                <NewsItem 
                  key={item.id} 
                  item={item} 
                  companyName={company.firm_name || company.name || ""} 
                />
              ))
            ) : (
              <Card className="bg-gray-50">
                <CardContent className="py-4">
                  <p className="text-center text-gray-600">No news found for this company.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default CompanyNewsSection;
