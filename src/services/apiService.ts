
interface SearchPayload {
  chatModel: {
    provider: string;
    name: string;
  };
  embeddingModel: {
    provider: string;
    name: string;
  };
  optimizationMode: string;
  focusMode: string;
  query: string;
}

/**
 * Performs a search query to the API
 * @param query The search query to send
 * @returns Promise with the response data
 */
export const performSearch = async (query: string): Promise<any> => {
  try {
    const payload: SearchPayload = {
      "chatModel": {
        "provider": "ollama",
        "name": "gemma3:27b"
      },
      "embeddingModel": {
        "provider": "ollama",
        "name": "gemma3:27b"
      },
      "optimizationMode": "speed",
      "focusMode": "webSearch",
      "query": query
    };

    const response = await fetch("https://vcstudio.us/api/search", {
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
      throw new Error(`Failed to fetch: ${response.statusText}`);
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

    // Parse the JSON response
    return JSON.parse(result);
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};
