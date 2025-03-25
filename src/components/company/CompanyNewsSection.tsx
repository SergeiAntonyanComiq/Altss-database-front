import React, { useState } from "react";
import { CompanyType } from "@/types/company";
import { Button } from "@/components/ui/button";
import { Search, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

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

const CompanyNewsSection: React.FC<CompanyNewsSectionProps> = ({ company }) => {
  const [newsItems, setNewsItems] = useState(defaultNewsItems);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const parseNewsResults = (rawText: string): any[] => {
    // Simple parsing of the results to create news items
    // This can be improved based on the actual format of the API response
    const lines = rawText.split('\n').filter(line => line.trim().length > 0);
    
    return lines.map((line, index) => {
      // Extract date if present (assuming format like "2023-05-15: News content")
      let date = "";
      let content = line;
      
      const dateMatch = line.match(/^(\d{4}-\d{2}-\d{2})[:\s-]+(.+)$/);
      if (dateMatch) {
        date = dateMatch[1];
        content = dateMatch[2];
      }
      
      return {
        id: `fetched-${index}`,
        logo: "AI",
        color: "#8b5cf6", // Purple color for AI-fetched news
        textColor: "#ffffff",
        content: content,
        date: date || new Date().toISOString().split('T')[0]
      };
    });
  };

  const fetchCompanyNews = async () => {
    setIsLoading(true);
    setIsSearching(true);
    
    try {
      const searchQuery = `show ${company.firm_name || company.name || ""} company news. Format: date, news, link to news`;
      
      const payload = {
        "chatModel": {
          "provider": "ollama",
          "name": "gemma3:27b"
        },
        "embeddingModel": {
          "provider": "ollama",
          "name": "gemma3:27b"
        },
        "optimizationMode": "speed",
        "focusMode": "webSearch",
        "query": searchQuery
      };

      const response = await fetch("https://vcstudio.us/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate",
          "Accept-Language": "en-US",
          "Connection": "keep-alive"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch news: ${response.statusText}`);
      }

      // Handle the streamed response
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Response body is not readable");
      }

      let result = "";
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        
        if (value) {
          // Convert the Uint8Array to a string
          const text = new TextDecoder().decode(value);
          result += text;
        }
      }

      setSearchResults(result);
      
      // Parse the results and update the news items
      const parsedNews = parseNewsResults(result);
      
      if (parsedNews.length > 0) {
        setNewsItems(parsedNews);
        toast({
          title: "Success",
          description: `Found ${parsedNews.length} news items about ${company.firm_name || company.name || ""}`,
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
      setIsSearching(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Company News</h2>
          <Button 
            onClick={fetchCompanyNews} 
            disabled={isSearching}
            className="flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            {isSearching ? "Searching..." : "Search News"}
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

        {searchResults && (
          <div className="mt-6">
            <Alert className="bg-blue-50 text-blue-800 border-blue-200">
              <AlertDescription>
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <p>
                    Raw search results are available. To see the full text, click the search button again.
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}
      </section>
    </div>
  );
};

export default CompanyNewsSection;
