
import React from "react";
import { CompanyType } from "@/types/company";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import NewsItem from "@/components/company/NewsItem";
import { useCompanyNews } from "@/hooks/useCompanyNews";

interface CompanyNewsSectionProps {
  company: CompanyType;
}

const CompanyNewsSection: React.FC<CompanyNewsSectionProps> = ({ company }) => {
  const companyName = company.firm_name || company.name || "";
  const { newsItems, isLoading, fetchNews } = useCompanyNews(companyName);

  return (
    <div className="space-y-8">
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Company News</h2>
          <Button 
            onClick={fetchNews} 
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
            <p className="text-gray-600">Loading news about {companyName}...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {newsItems.length > 0 ? (
              newsItems.map(item => (
                <NewsItem 
                  key={item.id} 
                  item={item} 
                  companyName={companyName} 
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
