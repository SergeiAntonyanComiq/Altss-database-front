
import React from "react";
import { NewsItem as NewsItemType } from "@/services/news/NewsService";
import NewsItem from "./NewsItem";
import { ExternalLink } from "lucide-react";

interface NewsListProps {
  newsItems: NewsItemType[];
  hasSearched: boolean;
  companyName: string;
  sourceLinks?: Array<{title: string, url: string}>;
}

const NewsList: React.FC<NewsListProps> = ({ newsItems, hasSearched, companyName, sourceLinks }) => {
  if (newsItems.length > 0) {
    return (
      <div>
        <div className="space-y-4">
          {newsItems.map(item => (
            <NewsItem 
              key={item.id} 
              item={item} 
              companyName={companyName} 
            />
          ))}
        </div>
        
        {sourceLinks && sourceLinks.length > 0 && (
          <div className="mt-8 border-t pt-4">
            <h3 className="text-lg font-medium mb-2">All Source Links</h3>
            <ul className="space-y-2">
              {sourceLinks.map((source, index) => (
                <li key={index}>
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    {source.title || source.url}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
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
