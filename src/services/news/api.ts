
import { getRandomColor, parseNewsItemsFromText, createMockApiResponse } from './utils';
import { NewsItem, NewsApiResponse } from './types';

// API call to search news via Perplexica
export const searchNewsViaPerplexica = async (companyName: string): Promise<NewsApiResponse> => {
  try {
    console.log("Searching news via Perplexica for:", companyName);
    
    // Define the API endpoint that would be used
    const endpoint = "http://162.254.26.189:3000/";
    
    // Create request body with the exact format requested
    const requestBody = {
      chatModel: {
        provider: "ollama",
        name: "gemma3:27b"
      },
      embeddingModel: {
        provider: "ollama",
        name: "gemma3:27b"
      },
      optimizationMode: "speed",
      focusMode: "webSearch",
      query: `show ${companyName} company news for last year with dates and links to the news format: date, news, link`,
      history: [],
      chatId: "9f12833e3772487acc775e62a3b1237e423e3cba",
      messageId: "b283ac04535b9b"
    };
    
    // Attempt to make the actual API call
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Received actual Perplexica response:", data);
      
      // Add request data and endpoint to the response
      const fullResponse = {
        ...data,
        request: requestBody,
        endpoint: endpoint
      };
      
      return fullResponse;
    } catch (apiError) {
      console.error('Error calling Perplexica API:', apiError);
      // Fallback to mock response on API error
      throw apiError;
    }
  } catch (error) {
    console.error('Perplexica search error:', error);
    throw error;
  }
};
