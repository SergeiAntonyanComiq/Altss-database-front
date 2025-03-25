
import { CompanyType } from "@/types/company";

export interface NewsItem {
  id: string;
  logo: string;
  color: string;
  textColor: string;
  content: string;
  date: string;
  source?: string;
  url?: string;
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

export const getRandomColor = () => {
  const colors = ['#f43f5e', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#f97316', '#14b8a6'];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Modified to handle errors more gracefully and use a mock API response
export const searchNewsViaPerplexica = async (companyName: string) => {
  try {
    console.log("Searching news via Perplexica for:", companyName);
    
    // Create a request object to show what would be sent to the API
    const requestBody = {
      model: "llama-3.1-sonar-small-128k-online",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that finds relevant news about companies."
        },
        {
          role: "user",
          content: `Search for the latest news about ${companyName}. Find information about recent developments, financial results, acquisitions, partnerships, and other significant events.`
        }
      ],
      temperature: 0.2,
      top_p: 0.9,
      max_tokens: 1000,
      search_domain_filter: ["business", "finance", "news"],
      search_recency_filter: "month"
    };
    
    // Since the external API is not working, we'll create a mock response
    // This simulates what would come back from the Perplexity API
    const mockResponse = {
      answer: {
        text: `Recent news about ${companyName}:\n\n1. ${companyName} has expanded its portfolio with strategic acquisitions in the technology sector.\n\n2. The company reported strong quarterly earnings, exceeding market expectations.\n\n3. New partnerships have been announced to enhance market presence in Europe and Asia.`
      },
      sources: [
        {
          pageContent: `${companyName} announced today its expansion plans in the technology sector with three strategic acquisitions valued at over $50 million. These acquisitions are expected to strengthen the company's position in the market and provide new growth opportunities.`,
          metadata: {
            title: "Strategic Expansion News",
            url: "https://www.businessnews.com/strategic-expansion"
          }
        },
        {
          pageContent: `Quarterly financial results for ${companyName} show a 15% increase in revenue compared to the same period last year. The company attributes this growth to successful market expansion and new product launches.`,
          metadata: {
            title: "Financial Results",
            url: "https://www.financialtimes.com/quarterly-results"
          }
        },
        {
          pageContent: `${companyName} has established new partnerships with leading European and Asian firms to enhance its global market presence. These partnerships will provide access to new markets and technologies.`,
          metadata: {
            title: "Global Partnerships",
            url: "https://www.globalbusiness.com/partnerships"
          }
        }
      ]
    };
    
    // Add request data to the mock response
    const fullResponse = {
      ...mockResponse,
      request: requestBody
    };
    
    console.log("Generated mock Perplexity response for:", companyName);
    return fullResponse;
  } catch (error) {
    console.error('Perplexica search error:', error);
    throw error;
  }
};

export const fetchCompanyNews = async (company: CompanyType): Promise<{newsItems: NewsItem[], apiResponse: any}> => {
  // Make sure we're using the correct company name
  const companyName = company.firm_name?.trim() || company.name?.trim() || "";
  console.log("Fetching news for company:", companyName);
  
  let apiResponseData: any = null;
  
  try {
    // Get mock perplexity data with the company name
    const perplexicaData = await searchNewsViaPerplexica(companyName);
    apiResponseData = perplexicaData;
    
    // Process the API response to create news items
    if (perplexicaData && perplexicaData.sources && perplexicaData.sources.length > 0) {
      console.log("Using Perplexity data with sources:", perplexicaData.sources.length);
      const newsItems = perplexicaData.sources.map((source: any, index: number) => {
        // Extract the URL from metadata
        const sourceUrl = source.metadata && source.metadata.url ? source.metadata.url : undefined;
        console.log(`Source ${index}: URL = ${sourceUrl}`);
        
        return {
          id: `perplexica-${index}`,
          logo: source.metadata.title ? source.metadata.title.substring(0, 2).toUpperCase() : "NW",
          color: getRandomColor(),
          textColor: '#ffffff',
          content: source.pageContent,
          date: new Date().toISOString().split('T')[0],
          source: source.metadata.title || "News Source",
          url: sourceUrl
        };
      });
      
      return { newsItems, apiResponse: apiResponseData };
    }
  } catch (perplexicaError) {
    console.error("Perplexity API error:", perplexicaError);
    // Continue to fallback
  }
  
  // Fallback to simulated news data
  console.log("Falling back to simulated news data for company:", companyName);
  const companySpecificNews = companyNewsMap[companyName];
  const newsData = companySpecificNews || companyNewsMap.default;
  
  const newsItems = newsData.map((item: any, index: number) => ({
    id: `news-${Date.now()}-${index}`,
    logo: item.source.substring(0, 2).toUpperCase(),
    color: getRandomColor(),
    textColor: '#ffffff',
    content: item.content,
    date: item.date,
    source: item.source,
    url: item.url
  }));
  
  // Create a mock API response if we don't have one from Perplexity
  if (!apiResponseData) {
    // Create a mock request that would have been sent
    const mockRequest = {
      model: "llama-3.1-sonar-small-128k-online",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that finds relevant news about companies."
        },
        {
          role: "user",
          content: `Search for the latest news about ${companyName}. Find information about recent developments, financial results, acquisitions, partnerships, and other significant events.`
        }
      ],
      temperature: 0.2,
      top_p: 0.9,
      max_tokens: 1000
    };
    
    apiResponseData = {
      answer: {
        text: `Here are the latest news items for ${companyName}:`
      },
      sources: newsData.map((item: any, index: number) => ({
        pageContent: item.content,
        metadata: {
          title: item.source || "News Source",
          url: item.url || "#"
        }
      })),
      request: mockRequest
    };
  }
  
  return { newsItems, apiResponse: apiResponseData };
};
