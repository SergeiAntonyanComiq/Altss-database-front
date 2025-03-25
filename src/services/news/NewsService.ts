
import { CompanyType } from "@/types/company";
import { NewsItem, NewsApiResponse } from './types';
import { getRandomColor, parseNewsItemsFromText } from './utils';
import { searchNewsViaPerplexica } from './api';

export type { NewsItem, NewsApiResponse } from './types';
export { getRandomColor } from './utils';
export { searchNewsViaPerplexica } from './api';

export const fetchCompanyNews = async (company: CompanyType): Promise<{newsItems: NewsItem[], apiResponse: NewsApiResponse}> => {
  // Make sure we're using the correct company name
  const companyName = company.firm_name?.trim() || company.name?.trim() || "";
  console.log("Fetching news for company:", companyName);
  
  try {
    // Get actual data from Perplexica with the company name
    const perplexicaData = await searchNewsViaPerplexica(companyName);
    
    // Process the API response to create news items
    if (perplexicaData && perplexicaData.answer && perplexicaData.answer.text) {
      console.log("Using Perplexica data with answer:", perplexicaData.answer.text);
      
      // Parse the text response which should have date, news, link format
      const newsText = perplexicaData.answer.text;
      
      // Parse news items from the text response
      const newsItems = parseNewsItemsFromText(newsText);
      
      console.log("Parsed news items:", newsItems);
      
      return { newsItems, apiResponse: perplexicaData };
    } else {
      console.error("Invalid or empty response from Perplexica API");
      throw new Error("Invalid or empty response from news API");
    }
  } catch (error) {
    console.error("Error fetching company news:", error);
    throw error;
  }
};
