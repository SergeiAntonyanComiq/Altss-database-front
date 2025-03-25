
import React, { useState } from "react";
import { CompanyType } from "@/types/company";
import { Button } from "@/components/ui/button";
import { Search, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";

interface CompanyNewsSectionProps {
  company: CompanyType;
}

interface NewsItem {
  id: string;
  logo: string;
  color: string;
  textColor: string;
  content: string;
  date: string;
  url?: string;
}

// Default news items to display when no search has been performed
const defaultNewsItems: NewsItem[] = [
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
  const [newsItems, setNewsItems] = useState<NewsItem[]>(defaultNewsItems);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const parseNewsResults = (responseData: any): NewsItem[] => {
    try {
      // Check if the response has the expected structure
      if (!responseData || !responseData.message) {
        throw new Error("Invalid response format");
      }

      const newsText = responseData.message;
      const sources = responseData.sources || [];
      
      // Extract news items from the formatted message
      // Looking for bullet points
      const newsRegex = /\*\s*\*\*([^*]+)\*\*\s*-\s*(.+?)(?=\n\*|\n\*\*|$)/gs;
      const matches = [...newsText.matchAll(newsRegex)];
      
      if (matches.length === 0) {
        // If the regex didn't find matches, try another approach - look for numbered items
        const lines = newsText.split('\n').filter(line => 
          line.trim().startsWith('*') || /^\d+\./.test(line.trim())
        );
        
        if (lines.length > 0) {
          return lines.map((line, index) => {
            // Try to extract date if it exists
            const datePrefixRegex = /\*\*([^*]+)\*\*/;
            const dateMatch = line.match(datePrefixRegex);
            
            let date = "Current";
            let content = line.replace(/^\*\s*/, '').trim();
            
            if (dateMatch && dateMatch[1]) {
              date = dateMatch[1].trim();
              content = content.replace(datePrefixRegex, '').replace(/^\s*-\s*/, '').trim();
            }
            
            // Remove citation references like [10] from content
            content = content.replace(/\[\d+\](?:\[\d+\])*/g, '').trim();

            // Try to find a URL from the sources
            const url = index < sources.length ? sources[index].metadata?.url : undefined;
            
            return {
              id: `news-${index}`,
              logo: getSourceLogo(content),
              color: getRandomColor(index),
              textColor: "#ffffff",
              content: content,
              date: date,
              url: url
            };
          });
        }
      }
      
      return matches.map((match, index) => {
        const date = match[1].trim();
        // Remove citation references like [10] from content
        let content = match[2].trim().replace(/\[\d+\](?:\[\d+\])*/g, '').trim();
        
        // Try to find a URL from the sources
        const url = index < sources.length ? sources[index].metadata?.url : undefined;
        
        return {
          id: `news-${index}`,
          logo: getSourceLogo(content),
          color: getRandomColor(index),
          textColor: "#ffffff",
          content: content,
          date: date,
          url: url
        };
      });
    } catch (error) {
      console.error("Error parsing news results:", error);
      return [];
    }
  };
  
  // Generate a logo based on the content
  const getSourceLogo = (content: string): string => {
    if (content.includes("PRNewswire") || content.includes("PR Newswire")) return "PR";
    if (content.includes("Bloomberg")) return "BL";
    if (content.includes("Reuters")) return "RT";
    if (content.includes("WSJ") || content.includes("Wall Street Journal")) return "WSJ";
    if (content.includes("Financial Times") || content.includes("FT")) return "FT";
    if (content.includes("Forbes")) return "FB";
    if (content.includes("TechCrunch")) return "TC";
    if (content.includes("LinkedIn")) return "LI";
    return "AI"; // Default logo
  };
  
  // Generate a random color based on index
  const getRandomColor = (index: number): string => {
    const colors = [
      "#f43f5e", // Red
      "#3b82f6", // Blue
      "#10b981", // Green
      "#8b5cf6", // Purple
      "#f59e0b", // Orange
      "#6366f1", // Indigo
      "#ec4899"  // Pink
    ];
    return colors[index % colors.length];
  };

  const formatNewsContent = (content: string): string => {
    // Add a "+" prefix to make it look like in the screenshot
    if (!content.startsWith("+")) {
      return "+" + content;
    }
    return content;
  };

  const fetchCompanyNews = async () => {
    setIsLoading(true);
    
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

      // Parse the JSON response
      const jsonResponse = JSON.parse(result);
      console.log("News API response:", jsonResponse);
      
      // Parse the results and update the news items
      const parsedNews = parseNewsResults(jsonResponse);
      
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
                <div key={item.id} className="flex gap-4">
                  <div 
                    className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-xl font-bold rounded-md"
                    style={{ backgroundColor: item.color, color: item.textColor }}
                  >
                    {item.logo}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700">
                      {formatNewsContent(item.content.replace("ACME Long Name Super Long Inc.", company.firm_name || company.name || ""))}
                    </p>
                    <div className="flex justify-between mt-1">
                      {item.url ? (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-block">Read more</a>
                      ) : (
                        <span className="text-blue-600 opacity-50">Read more</span>
                      )}
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

        {newsItems.length > 0 && newsItems[0].logo === "AI" && (
          <div className="mt-6">
            <Alert className="bg-blue-50 text-blue-800 border-blue-200">
              <AlertDescription>
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <p>
                    News items have been processed by AI. Click the search button to refresh with the latest data.
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
