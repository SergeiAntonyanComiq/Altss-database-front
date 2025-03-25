
import { CompanyType } from "@/types/company";
import { NewsItem, NewsApiResponse } from './types';
import { getRandomColor, parseNewsItemsFromText, createMockApiResponse } from './utils';
import { searchNewsViaPerplexica } from './api';
import { companyNewsMap } from './mockData';

export type { NewsItem, NewsApiResponse } from './types';
export { getRandomColor } from './utils';
export { searchNewsViaPerplexica } from './api';

export const fetchCompanyNews = async (company: CompanyType): Promise<{newsItems: NewsItem[], apiResponse: NewsApiResponse}> => {
  // Make sure we're using the correct company name
  const companyName = company.firm_name?.trim() || company.name?.trim() || "";
  console.log("Fetching news for company:", companyName);
  
  let apiResponseData: NewsApiResponse | null = null;
  
  try {
    // Get actual perplexity data with the company name
    const perplexicaData = await searchNewsViaPerplexica(companyName);
    apiResponseData = perplexicaData;
    
    // Process the API response to create news items
    // The API response format might be different from what we expected before
    // We'll extract news items from the content or text field
    if (perplexicaData && perplexicaData.answer && perplexicaData.answer.text) {
      console.log("Using Perplexica data with answer:", perplexicaData.answer.text);
      
      // Parse the text response which should have date, news, link format
      const newsText = perplexicaData.answer.text;
      
      // Parse news items from the text response
      const newsItems = parseNewsItemsFromText(newsText);
      
      return { newsItems, apiResponse: apiResponseData };
    }
  } catch (perplexicaError) {
    console.error("Perplexica API error:", perplexicaError);
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
    apiResponseData = createMockApiResponse(companyName, newsData);
  }
  
  return { newsItems, apiResponse: apiResponseData };
};
