
import React, { useState } from "react";
import { CompanyType } from "@/types/company";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
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
    date: "May 15, 2023"
  },
  {
    id: "2",
    logo: "FT",
    color: "#3b82f6",
    textColor: "#ffffff",
    content: "Financial Times announces " + "ACME Long Name Super Long Inc. " + "expansion into European markets with new offices in London and Berlin.",
    date: "April 22, 2023"
  },
  {
    id: "3",
    logo: "WSJ",
    color: "#10b981",
    textColor: "#ffffff",
    content: "Wall Street Journal covers " + "ACME Long Name Super Long Inc. " + "latest product innovation that's disrupting the industry.",
    date: "March 10, 2023"
  }
];

const CompanyNewsSection: React.FC<CompanyNewsSectionProps> = ({ company }) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(defaultNewsItems);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Format date to "Month Day, Year" format
  const formatDate = (dateStr: string): string => {
    if (!dateStr || dateStr === "Current" || dateStr === "n/a") {
      return "n/a";
    }
    
    try {
      // Try to parse the date string
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        return dateStr; // If parsing fails, return the original string
      }
      
      // Format the date as "Month Day, Year"
      return date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch (e) {
      return dateStr;
    }
  };

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
      
      let newsItems: NewsItem[] = [];
      
      if (matches.length === 0) {
        // If the regex didn't find matches, try another approach - look for numbered items
        const lines = newsText.split('\n').filter(line => 
          line.trim().startsWith('*') || /^\d+\./.test(line.trim())
        );
        
        if (lines.length > 0) {
          newsItems = lines.map((line, index) => {
            // Try to extract date if it exists
            const datePrefixRegex = /\*\*([^*]+)\*\*/;
            const dateMatch = line.match(datePrefixRegex);
            
            let date = "n/a";
            let content = line.replace(/^\*\s*/, '').trim();
            
            if (dateMatch && dateMatch[1]) {
              date = dateMatch[1].trim();
              content = content.replace(datePrefixRegex, '').replace(/^\s*-\s*/, '').trim();
            }
            
            // Remove citation references like [10] from content
            content = content.replace(/\[\d+(?:,\s*\d+)*\](?:\[\d+\])*/g, '').trim();
            // Remove asterisks and plus signs
            content = content.replace(/[\*\+]/g, '').trim();
            // Remove dash prefix if present
            content = content.replace(/^-\s+/, '').trim();
            // Remove date prefixes from content if they exist
            content = content.replace(/^\s*\d{1,2}\/\d{1,2}\/\d{2,4}\s*[-–—]\s*/, '');
            content = content.replace(/^\s*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},\s*\d{4}\s*[-–—]\s*/, '');

            // Get the source URL and extract domain for logo
            const url = index < sources.length ? sources[index].metadata?.url : undefined;
            const sourceDomain = url ? extractDomainForLogo(url) : "";
            
            return {
              id: `news-${index}`,
              logo: getSourceLogo(content, sourceDomain),
              color: getRandomColor(index),
              textColor: "#ffffff",
              content: content,
              date: formatDate(date),
              url: url
            };
          });
        }
      } else {
        newsItems = matches.map((match, index) => {
          const date = match[1].trim();
          // Remove citation references like [10] from content
          let content = match[2].trim().replace(/\[\d+(?:,\s*\d+)*\](?:\[\d+\])*/g, '').trim();
          // Remove asterisks and plus signs
          content = content.replace(/[\*\+]/g, '').trim();
          // Remove dash prefix if present
          content = content.replace(/^-\s+/, '').trim();
          // Remove date prefixes from content if they exist
          content = content.replace(/^\s*\d{1,2}\/\d{1,2}\/\d{2,4}\s*[-–—]\s*/, '');
          content = content.replace(/^\s*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},\s*\d{4}\s*[-–—]\s*/, '');
          
          // Get the source URL and extract domain for logo
          const url = index < sources.length ? sources[index].metadata?.url : undefined;
          const sourceDomain = url ? extractDomainForLogo(url) : "";
          
          return {
            id: `news-${index}`,
            logo: getSourceLogo(content, sourceDomain),
            color: getRandomColor(index),
            textColor: "#ffffff",
            content: content,
            date: formatDate(date),
            url: url
          };
        });
      }
      
      // Sort news items by date, newest first
      return newsItems.sort((a, b) => {
        if (a.date === "n/a") return 1;
        if (b.date === "n/a") return -1;
        
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        
        if (isNaN(dateA.getTime())) return 1;
        if (isNaN(dateB.getTime())) return -1;
        
        return dateB.getTime() - dateA.getTime();
      });
    } catch (error) {
      console.error("Error parsing news results:", error);
      return [];
    }
  };
  
  // Extract domain from URL to use for logo generation
  const extractDomainForLogo = (url: string): string => {
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname;
      
      // Extract the main domain name for common formats
      if (hostname.startsWith('www.')) {
        const domain = hostname.substring(4);
        
        // Handle common domain patterns
        if (domain.includes('prnewswire')) return 'PR';
        if (domain.includes('bloomberg')) return 'BL';
        if (domain.includes('reuters')) return 'RT';
        if (domain.includes('wsj')) return 'WS';
        if (domain.includes('ft.com')) return 'FT';
        if (domain.includes('forbes')) return 'FB';
        if (domain.includes('techcrunch')) return 'TC';
        if (domain.includes('linkedin')) return 'LI';
        if (domain.includes('crunchbase')) return 'CB';
        if (domain.includes('pitchbook')) return 'PB';
        
        // Return first two letters capitalized for other domains
        return domain.split('.')[0].substring(0, 2).toUpperCase();
      }
      
      // If no www prefix, just use the first part of the hostname
      return hostname.split('.')[0].substring(0, 2).toUpperCase();
    } catch (e) {
      return 'NW'; // Default for "News"
    }
  };
  
  // Generate a logo based on the content and domain
  const getSourceLogo = (content: string, sourceDomain: string): string => {
    // If we have a domain-based logo, use it
    if (sourceDomain && sourceDomain !== 'NW') {
      return sourceDomain;
    }
    
    // Otherwise, try to extract from content
    if (content.includes("PRNewswire") || content.includes("PR Newswire")) return "PR";
    if (content.includes("Bloomberg")) return "BL";
    if (content.includes("Reuters")) return "RT";
    if (content.includes("WSJ") || content.includes("Wall Street Journal")) return "WS";
    if (content.includes("Financial Times") || content.includes("FT")) return "FT";
    if (content.includes("Forbes")) return "FB";
    if (content.includes("TechCrunch")) return "TC";
    if (content.includes("LinkedIn")) return "LI";
    if (content.includes("Crunchbase")) return "CB";
    
    return "NW"; // Default logo
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
                      {item.content.replace("ACME Long Name Super Long Inc.", company.firm_name || company.name || "")}
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
      </section>
    </div>
  );
};

export default CompanyNewsSection;
