
import React, { useState } from "react";
import { CompanyType } from "@/types/company";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchCompanyNews = async () => {
    setIsSearching(true);
    
    try {
      const searchQuery = `${company.firm_name || company.name || ""} company news last year`;
      
      const payload = {
        "content": searchQuery,
        "chatId": `chat-${Date.now()}`,
        "chatModel": {
          "name": "gemma3.27b", 
          "provider": "ollama"
        },
        "embeddingModel": {
          "name": "gemma3.27b",
          "provider": "ollama"
        },
        "files": [],
        "focusMode": "webSearch",
        "history": [],
        "message": {
          "messageId": `msg-${Date.now()}`,
          "chatId": `chat-${Date.now()}`,
          "content": searchQuery
        },
        "optimizationMode": "speed"
      };

      const response = await fetch("http://162.254.26.189:3000", {
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
      setIsDialogOpen(true);
      
      // After successful search, update the news items with a placeholder result
      // In a real implementation, we would parse the result and format it properly
      const newNewsItem = {
        id: `news-${Date.now()}`,
        logo: "AI",
        color: "#8b5cf6",
        textColor: "#ffffff",
        content: `Latest news about ${company.firm_name || company.name || ""} fetched from the API. Click 'Search News' to view the full results.`,
        date: new Date().toISOString().split('T')[0]
      };
      
      setNewsItems([newNewsItem, ...newsItems.slice(0, 2)]);
      
    } catch (error) {
      console.error("Error fetching company news:", error);
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
              <div className="mt-4 whitespace-pre-wrap">
                {searchResults || "No results found."}
              </div>
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
