
import { formatDate } from "@/utils/dateUtils";
import { cleanNewsContent } from "@/utils/contentUtils";
import { extractDomainForLogo, getSourceLogo } from "@/utils/newsUtils";
import { getRandomColor } from "@/utils/colorUtils";
import { performSearch } from "./apiService";

export interface NewsItem {
  id: string;
  logo: string;
  color: string;
  textColor: string;
  content: string;
  date: string;
  url?: string;
}

// Default news items to display when no search has been performed
export const defaultNewsItems: NewsItem[] = [
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

/**
 * Parse news results from API response
 * @param responseData API response data
 * @returns Array of NewsItem objects
 */
export const parseNewsResults = (responseData: any): NewsItem[] => {
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
          
          // Clean the content
          content = cleanNewsContent(content);
          
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
        // Clean the content
        let content = cleanNewsContent(match[2]);
        
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
    return sortNewsByDate(newsItems);
  } catch (error) {
    console.error("Error parsing news results:", error);
    return [];
  }
};

/**
 * Sort news items by date, newest first
 * @param newsItems Array of NewsItem objects
 * @returns Sorted array of NewsItem objects
 */
const sortNewsByDate = (newsItems: NewsItem[]): NewsItem[] => {
  return newsItems.sort((a, b) => {
    if (a.date === "n/a") return 1;
    if (b.date === "n/a") return -1;
    
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    
    if (isNaN(dateA.getTime())) return 1;
    if (isNaN(dateB.getTime())) return -1;
    
    return dateB.getTime() - dateA.getTime();
  });
};

/**
 * Fetch company news from the API
 * @param companyName Company name to fetch news for
 * @returns Promise with the fetched news
 */
export const fetchCompanyNews = async (companyName: string): Promise<NewsItem[]> => {
  try {
    const searchQuery = `show ${companyName} company news. Format: date, news, link to news`;
    
    // Call the API service to perform the search
    const jsonResponse = await performSearch(searchQuery);
    console.log("News API response:", jsonResponse);
    
    // Parse the results
    return parseNewsResults(jsonResponse);
  } catch (error) {
    console.error("Error fetching company news:", error);
    throw error;
  }
};
