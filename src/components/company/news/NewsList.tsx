
import React from "react";
import { NewsItem as NewsItemType } from "@/services/news/NewsService";
import NewsItem from "./NewsItem";

interface NewsListProps {
  newsItems: NewsItemType[];
  hasSearched: boolean;
  companyName: string;
  apiResponseData?: any;
}

const NewsList: React.FC<NewsListProps> = ({ newsItems, hasSearched, companyName, apiResponseData }) => {
  const hasDirectAnswer = apiResponseData && apiResponseData.answer && apiResponseData.answer.text;
  const hasSourcesData = apiResponseData && apiResponseData.sources && apiResponseData.sources.length > 0;
  const hasRequestData = apiResponseData && apiResponseData.request;
  const apiEndpoint = apiResponseData && apiResponseData.endpoint;
  
  if (hasSearched && apiResponseData) {
    return (
      <div className="space-y-6">
        {/* Display the full Perplexica response */}
        <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Perplexica Response</h3>
          
          {/* Display API endpoint if available */}
          {apiEndpoint && (
            <div className="mb-6 bg-purple-50 p-4 rounded-md border border-purple-200">
              <h4 className="font-medium text-purple-800 mb-2">API Endpoint:</h4>
              <div className="font-mono text-sm text-purple-900 break-all">
                {apiEndpoint}
              </div>
            </div>
          )}
          
          {/* Display request data if available */}
          {hasRequestData && (
            <div className="mb-6 bg-slate-50 p-4 rounded-md border border-slate-200">
              <h4 className="font-medium text-slate-800 mb-2">Request:</h4>
              <pre className="text-xs whitespace-pre-wrap overflow-auto max-h-60 bg-slate-100 p-2 rounded">
                {JSON.stringify(apiResponseData.request, null, 2)}
              </pre>
            </div>
          )}
          
          {/* Display direct answer if available */}
          {hasDirectAnswer && (
            <div className="mb-6 bg-blue-50 p-4 rounded-md border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">Answer:</h4>
              <div className="text-gray-800 whitespace-pre-line">
                {apiResponseData.answer.text}
              </div>
            </div>
          )}
          
          {/* Display web search results if available */}
          {hasSourcesData && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800">Web Search Results:</h4>
              {apiResponseData.sources.map((source: any, index: number) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <div className="flex justify-between mb-2">
                    <h5 className="font-medium">{source.metadata?.title || "Untitled Source"}</h5>
                    <span className="text-sm text-gray-500">Source #{index + 1}</span>
                  </div>
                  <p className="mb-2 text-sm whitespace-pre-line">{source.pageContent}</p>
                  {source.metadata?.url && (
                    <a 
                      href={source.metadata.url}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm inline-flex items-center gap-1"
                    >
                      {source.metadata.url}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Display the complete raw response */}
          <div className="mt-6 border-t pt-4">
            <h4 className="font-medium text-gray-800 mb-2">Complete Response:</h4>
            <pre className="text-xs whitespace-pre-wrap overflow-auto max-h-96 bg-gray-100 p-2 rounded">
              {JSON.stringify(apiResponseData, null, 2)}
            </pre>
          </div>
        </div>
        
        {/* Still show news items if we have them */}
        {newsItems.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">News Items</h3>
            {newsItems.map(item => (
              <NewsItem 
                key={item.id} 
                item={item} 
                companyName={companyName} 
              />
            ))}
          </div>
        )}
      </div>
    );
  }
  
  if (newsItems.length > 0) {
    return (
      <div className="space-y-4">
        {newsItems.map(item => (
          <NewsItem 
            key={item.id} 
            item={item} 
            companyName={companyName} 
          />
        ))}
      </div>
    );
  }
  
  if (hasSearched) {
    return (
      <div className="text-center py-10 text-gray-500">
        No news found for this company. Try another search.
      </div>
    );
  }
  
  return (
    <div className="text-center py-10 text-gray-500">
      Click "Search News" to find the latest news for {companyName}.
    </div>
  );
};

export default NewsList;
