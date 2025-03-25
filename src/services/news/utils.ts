
// Utility functions for news service

// Generate a random color for news items
export const getRandomColor = () => {
  const colors = ['#f43f5e', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#f97316', '#14b8a6'];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Parse news items from text response
export const parseNewsItemsFromText = (newsText: string) => {
  // Extract news items from the text response
  const newsLines = newsText.split('\n').filter(line => line.trim() !== '');
  
  return newsLines.map((line, index) => {
    // Try to extract date, content, and link
    let date = "Unknown date";
    let content = line;
    let url = undefined;
    let source = "News Source";
    
    // Try to extract date (assuming it's at the beginning of the line)
    const dateMatch = line.match(/^(\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{4}|\w+ \d{1,2}, \d{4})/);
    if (dateMatch) {
      date = dateMatch[0];
      content = line.substring(dateMatch[0].length).trim();
    }
    
    // Try to extract URL (assuming it's at the end of the line or separated)
    const urlMatch = content.match(/(https?:\/\/[^\s]+)/);
    if (urlMatch) {
      url = urlMatch[0];
      content = content.replace(urlMatch[0], '').trim();
      
      // Try to extract source from URL
      try {
        const urlObj = new URL(url);
        source = urlObj.hostname.replace('www.', '');
      } catch (e) {
        // Keep default source if URL parsing fails
      }
    }
    
    return {
      id: `news-${index}`,
      logo: source ? source.substring(0, 2).toUpperCase() : "NW",
      color: getRandomColor(),
      textColor: '#ffffff',
      content: content,
      date: date,
      source: source,
      url: url
    };
  });
};

// Create a mock API response
export const createMockApiResponse = (companyName: string, newsData: any[]) => {
  // Define the API endpoint
  const endpoint = "http://162.254.26.189:3000/api/search";
  
  // Create a mock request that would have been sent
  const mockRequest = {
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
  
  // Format news items into a text response
  const newsText = `Here are the latest news items for ${companyName}:\n\n` + 
    newsData.map((item: any) => 
      `${item.date}: ${item.content} ${item.url || 'https://example.com/news'}`
    ).join('\n');
  
  return {
    answer: {
      text: newsText
    },
    sources: newsData.map((item: any, index: number) => ({
      pageContent: item.content,
      metadata: {
        title: item.title || item.source || "News Source",
        url: item.url || "https://example.com/news"
      }
    })),
    request: mockRequest,
    endpoint: endpoint,
    isFallbackData: true  // Flag to indicate this is fallback data
  };
};
