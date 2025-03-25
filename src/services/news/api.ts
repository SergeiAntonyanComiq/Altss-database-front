
import { NewsApiResponse } from './types';

// Use the correct API endpoint for real requests
export const searchNewsViaPerplexica = async (companyName: string): Promise<NewsApiResponse> => {
  try {
    console.log("Searching news for:", companyName);
    
    // Define the API endpoint
    const endpoint = "http://162.254.26.189:3000/api/search";
    
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
    
    console.log("Sending search request to endpoint:", endpoint);
    console.log("Request body:", requestBody);
    
    // Make the real API call with proper CORS headers
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': window.location.origin,
      },
      mode: 'cors', // Enable CORS mode explicitly
      body: JSON.stringify(requestBody),
    });
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Received API response:", data);
    
    // Add request data and endpoint to the response for transparency
    const fullResponse = {
      ...data,
      request: requestBody,
      endpoint: endpoint
    };
    
    return fullResponse;
  } catch (error) {
    console.error('News search error:', error);
    throw error;
  }
};
