
import { parseNewsItemsFromText } from './utils';
import { NewsApiResponse } from './types';

// API call to search news via Perplexica
export const searchNewsViaPerplexica = async (companyName: string): Promise<NewsApiResponse> => {
  try {
    console.log("Searching news via Perplexica for:", companyName);
    
    // Define the API endpoint
    const endpoint = "http://162.254.26.189:3000/";
    
    // Create request body
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
      history: []
    };
    
    console.log("Sending Perplexica request:", requestBody);
    
    // Make the API call
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
    console.log("Received Perplexica response:", data);
    
    // Add request data and endpoint to the response for transparency
    const fullResponse = {
      ...data,
      request: requestBody,
      endpoint: endpoint
    };
    
    return fullResponse;
  } catch (error) {
    console.error('Perplexica search error:', error);
    throw error;
  }
};
