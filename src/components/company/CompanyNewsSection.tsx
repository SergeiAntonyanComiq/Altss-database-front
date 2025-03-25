import React, { useState } from "react";
import { CompanyType } from "@/types/company";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface CompanyNewsSectionProps {
  company: CompanyType;
}

// Simulated news data for different companies - expanded with more news items
const companyNewsMap = {
  "Alberleen Group": [
    {
      title: "Alberleen Group Announces New Healthcare Investment Focus",
      content: "Alberleen Group has announced a strategic shift to focus more on healthcare investments, particularly in biotechnology and healthcare services sectors. The company aims to capitalize on the growing opportunities in healthcare innovation.",
      source: "Bloomberg",
      date: "2025-01-15",
      url: "https://www.bloomberg.com/news/articles/healthcare-investments"
    },
    {
      title: "Alberleen Group Partners with Tech Startup for Financial Analytics Platform",
      content: "A new partnership between Alberleen Group and fintech startup DataViz aims to develop advanced financial analytics tools for investment management. The collaboration will combine Alberleen's industry expertise with DataViz's AI-driven analytics capabilities.",
      source: "TechFinance",
      date: "2024-11-22",
      url: "https://www.techfinance.com/partnerships/alberleen-dataviz"
    },
    {
      title: "Alberleen Group Reports 15% Growth in Assets Under Management",
      content: "In its annual report, Alberleen Group announced a 15% increase in assets under management, reaching new heights in its investment portfolio. The growth was attributed to successful investments in emerging markets and technology sectors.",
      source: "Financial Times",
      date: "2024-09-03",
      url: "https://www.ft.com/content/alberleen-growth-report"
    },
    {
      title: "Alberleen Group Expands European Presence with New London Office",
      content: "Alberleen Group has expanded its international footprint by opening a new office in London's financial district. This strategic move aims to strengthen the firm's presence in European markets and provide closer support to its growing client base in the region.",
      source: "Reuters",
      date: "2024-08-15",
      url: "https://www.reuters.com/business/finance/alberleen-european-expansion"
    },
    {
      title: "Alberleen Group CEO Featured in 'Top 50 Financial Leaders' List",
      content: "The CEO of Alberleen Group has been recognized in the annual 'Top 50 Financial Leaders' list by Finance Monthly magazine. The recognition highlights the firm's innovative approach to investment management and its commitment to sustainable finance practices.",
      source: "Finance Monthly",
      date: "2024-07-10",
      url: "https://www.financemonthly.com/top-financial-leaders"
    }
  ],
  "default": [
    {
      title: "Company Secures Major Investment Round",
      content: "The company has successfully secured a significant investment round, enabling expansion into new markets and development of innovative products.",
      source: "Business Insider",
      date: "2024-12-10",
      url: "https://www.businessinsider.com/company-investment"
    },
    {
      title: "Strategic Partnership Announced",
      content: "A new strategic partnership has been formed, aiming to enhance market presence and develop joint solutions for industry challenges.",
      source: "Industry Today",
      date: "2024-10-05",
      url: "https://www.industrytoday.com/strategic-partnership"
    },
    {
      title: "Annual Results Show Positive Growth",
      content: "The annual financial results reveal strong growth in key areas, with promising projections for the upcoming fiscal year.",
      source: "Financial Review",
      date: "2024-07-22",
      url: "https://www.financialreview.com/annual-results"
    },
    {
      title: "New Product Launch Exceeds Expectations",
      content: "The company's recent product launch has exceeded market expectations, with strong initial sales and positive customer feedback across all regions.",
      source: "Tech Journal",
      date: "2024-06-14",
      url: "https://www.techjournal.com/product-launch-success"
    },
    {
      title: "Company Recognized for Innovation Excellence",
      content: "The company has received an industry award for innovation excellence, highlighting its commitment to developing cutting-edge solutions for its customers.",
      source: "Innovation Today",
      date: "2024-05-03",
      url: "https://www.innovationtoday.com/excellence-awards"
    },
    {
      title: "Expansion into Asian Markets Announced",
      content: "The company has announced plans to expand operations into key Asian markets, establishing new offices and distribution networks to support growth in the region.",
      source: "Global Business Review",
      date: "2024-04-18",
      url: "https://www.globalbusinessreview.com/asian-market-expansion"
    }
  ]
};

interface NewsItem {
  id: string;
  logo: string;
  color: string;
  textColor: string;
  content: string;
  date: string;
  source?: string;
  url?: string;
}

const CompanyNewsSection: React.FC<CompanyNewsSectionProps> = ({ company }) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const searchNewsViaPerplexica = async (companyName: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatModel: {
            provider: 'openai',
            name: 'gpt-4o-mini'
          },
          embeddingModel: {
            provider: 'openai',
            name: 'text-embedding-3-large'
          },
          optimizationMode: 'balanced',
          focusMode: 'webSearch',
          query: `Latest news about ${companyName} company`,
          history: []
        }),
      });

      if (!response.ok) {
        throw new Error(`Search API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Perplexica search error:', error);
      throw error;
    }
  };

  const fetchCompanyNews = async () => {
    setIsSearching(true);
    setError(null);
    
    try {
      const companyName = company.firm_name?.trim() || company.name?.trim() || "";
      console.log("Fetching news for company:", companyName);
      
      try {
        const perplexicaData = await searchNewsViaPerplexica(companyName);
        
        if (perplexicaData && perplexicaData.sources && perplexicaData.sources.length > 0) {
          const newItems = perplexicaData.sources.map((source, index) => ({
            id: `perplexica-${index}`,
            logo: source.metadata.title.substring(0, 2).toUpperCase(),
            color: getRandomColor(),
            textColor: '#ffffff',
            content: source.pageContent,
            date: new Date().toISOString().split('T')[0],
            source: source.metadata.title,
            url: source.metadata.url
          }));
          
          setNewsItems(newItems);
          setHasSearched(true);
          toast({
            title: "Success",
            description: `Found ${newItems.length} news items about ${companyName}`,
          });
          return;
        }
      } catch (perplexicaError) {
        console.error("Perplexica API error:", perplexicaError);
      }
      
      const newsData = companyNewsMap[companyName] || companyNewsMap.default;
      
      const formattedNewsItems = newsData.map((item, index) => ({
        id: `news-${Date.now()}-${index}`,
        logo: item.source.substring(0, 2).toUpperCase(),
        color: getRandomColor(),
        textColor: '#ffffff',
        content: item.content,
        date: item.date,
        source: item.source,
        url: item.url
      }));
      
      setNewsItems(formattedNewsItems);
      setHasSearched(true);
      
      toast({
        title: "Success",
        description: `Found ${formattedNewsItems.length} news items for ${companyName}`,
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

  const getRandomColor = () => {
    const colors = ['#f43f5e', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#f97316', '#14b8a6'];
    return colors[Math.floor(Math.random() * colors.length)];
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

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

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
                    <a 
                      href={item.url || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:underline inline-block"
                    >
                      Read more in {item.source}
                    </a>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>
                </div>
              </div>
            ))
          ) : hasSearched ? (
            <div className="text-center py-10 text-gray-500">
              No news found for this company. Try another search.
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              Click "Search News" to find the latest news for {company.firm_name || company.name}.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CompanyNewsSection;
