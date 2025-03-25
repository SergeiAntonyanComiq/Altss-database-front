
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

export const searchNewsViaPerplexica = async (companyName: string) => {
  try {
    console.log("Attempting to fetch news for:", companyName);
    
    // For now, we'll skip the Perplexica API call as it's causing issues
    // Returning null will trigger the fallback mechanism
    console.log("Skipping Perplexica API due to connection issues");
    return null;
    
    // NOTE: The code below is commented out as it's not working in the current environment
    /*
    const response = await fetch('https://162.254.26.189:3000/api/search', {
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
        query: `show ${companyName} company news for last year with dates and links to the news format: date, news, link`,
        history: []
      }),
    });

    if (!response.ok) {
      throw new Error(`Search API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Perplexica API response:", data);
    return data;
    */
  } catch (error) {
    console.error('Perplexica search error:', error);
    return null;
  }
};

export const fetchCompanyNews = async (company: CompanyType): Promise<NewsItem[]> => {
  const companyName = company.firm_name?.trim() || company.name?.trim() || "";
  console.log("Fetching news for company:", companyName);
  
  try {
    // Try to get data from Perplexica first (currently disabled)
    const perplexicaData = await searchNewsViaPerplexica(companyName);
    
    if (perplexicaData && perplexicaData.sources && perplexicaData.sources.length > 0) {
      console.log("Using Perplexica data with sources:", perplexicaData.sources.length);
      return perplexicaData.sources.map((source, index) => {
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
    }
  } catch (perplexicaError) {
    console.error("Perplexica API error:", perplexicaError);
    // Continue to fallback - no need to rethrow
  }
  
  // Fallback to simulated news data
  console.log("Using simulated news data");
  const newsData = companyNewsMap[companyName] || companyNewsMap.default;
  
  return newsData.map((item, index) => ({
    id: `news-${Date.now()}-${index}`,
    logo: item.source.substring(0, 2).toUpperCase(),
    color: getRandomColor(),
    textColor: '#ffffff',
    content: item.content,
    date: item.date,
    source: item.source,
    url: item.url
  }));
};
