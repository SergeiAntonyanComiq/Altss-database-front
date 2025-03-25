
import React, { useState } from "react";
import { CompanyType } from "@/types/company";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface CompanyNewsSectionProps {
  company: CompanyType;
}

// Default news items to display when no search has been performed
const defaultNewsItems = [
  {
    id: "1",
    logo: "TC",
    color: "#f43f5e",
    textColor: "#ffffff",
    content: "TechCrunch reports that " + "ACME Long Name Super Long Inc. " + "has secured a $50M Series C funding round led by Sequoia Capital.",
    date: "2023-05-15"
  },
  {
    id: "2",
    logo: "FT",
    color: "#3b82f6",
    textColor: "#ffffff",
    content: "Financial Times announces " + "ACME Long Name Super Long Inc. " + "expansion into European markets with new offices in London and Berlin.",
    date: "2023-04-22"
  },
  {
    id: "3",
    logo: "WSJ",
    color: "#10b981",
    textColor: "#ffffff",
    content: "Wall Street Journal covers " + "ACME Long Name Super Long Inc. " + "latest product innovation that's disrupting the industry.",
    date: "2023-03-10"
  }
];

// Simulated news data for different companies - this replaces the API call with local data
const companyNewsMap = {
  "Alberleen Group": [
    {
      title: "Alberleen Group Announces New Healthcare Investment Focus",
      content: "Alberleen Group has announced a strategic shift to focus more on healthcare investments, particularly in biotechnology and healthcare services sectors. The company aims to capitalize on the growing opportunities in healthcare innovation.",
      source: "Bloomberg",
      date: "2025-01-15"
    },
    {
      title: "Alberleen Group Partners with Tech Startup for Financial Analytics Platform",
      content: "A new partnership between Alberleen Group and fintech startup DataViz aims to develop advanced financial analytics tools for investment management. The collaboration will combine Alberleen's industry expertise with DataViz's AI-driven analytics capabilities.",
      source: "TechFinance",
      date: "2024-11-22"
    },
    {
      title: "Alberleen Group Reports 15% Growth in Assets Under Management",
      content: "In its annual report, Alberleen Group announced a 15% increase in assets under management, reaching new heights in its investment portfolio. The growth was attributed to successful investments in emerging markets and technology sectors.",
      source: "Financial Times",
      date: "2024-09-03"
    }
  ],
  "default": [
    {
      title: "Company Secures Major Investment Round",
      content: "The company has successfully secured a significant investment round, enabling expansion into new markets and development of innovative products.",
      source: "Business Insider",
      date: "2024-12-10"
    },
    {
      title: "Strategic Partnership Announced",
      content: "A new strategic partnership has been formed, aiming to enhance market presence and develop joint solutions for industry challenges.",
      source: "Industry Today",
      date: "2024-10-05"
    },
    {
      title: "Annual Results Show Positive Growth",
      content: "The annual financial results reveal strong growth in key areas, with promising projections for the upcoming fiscal year.",
      source: "Financial Review",
      date: "2024-07-22"
    }
  ]
};

const CompanyNewsSection: React.FC<CompanyNewsSectionProps> = ({ company }) => {
  const [newsItems, setNewsItems] = useState(defaultNewsItems);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCompanyNews = async () => {
    setIsSearching(true);
    setError(null);
    
    try {
      const companyName = company.firm_name?.trim() || company.name?.trim() || "";
      console.log("Fetching news for company:", companyName);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get news data from map or use default
      const newsData = companyNewsMap[companyName] || companyNewsMap.default;
      
      // Format the news data for display
      const formattedResults = newsData.map(item => 
        `## ${item.title}\n**Source:** ${item.source} | **Date:** ${item.date}\n\n${item.content}\n\n---\n\n`
      ).join('');
      
      setSearchResults(formattedResults);
      setIsDialogOpen(true);
      
      // Add a new news item to the list
      const newNewsItem = {
        id: `news-${Date.now()}`,
        logo: newsData[0].source.substring(0, 2).toUpperCase(),
        color: "#8b5cf6",
        textColor: "#ffffff",
        content: newsData[0].content,
        date: newsData[0].date
      };
      
      setNewsItems([newNewsItem, ...newsItems.slice(0, 2)]);
      
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

  return (
    <div className="space-y-8">
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Company News</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={fetchCompanyNews} 
                disabled={isSearching}
                className="flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                {isSearching ? "Searching..." : "Search News"}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>News Results for {company.firm_name || company.name || ""}</DialogTitle>
              </DialogHeader>
              {error ? (
                <Alert variant="destructive" className="mt-4">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : (
                <div className="mt-4 whitespace-pre-wrap">
                  {searchResults || "No results found."}
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {newsItems.map(item => (
            <div key={item.id} className="flex gap-4">
              <div 
                className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-xl font-bold rounded-md"
                style={{ backgroundColor: item.color, color: item.textColor }}
              >
                {item.logo}
              </div>
              <div className="flex-1">
                <p className="text-gray-700">
                  {item.content.replace("ACME Long Name Super Long Inc.", company.firm_name || company.name || "")}
                </p>
                <div className="flex justify-between mt-1">
                  <a href="#" className="text-blue-600 hover:underline inline-block">Read more</a>
                  <span className="text-sm text-gray-500">{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CompanyNewsSection;
