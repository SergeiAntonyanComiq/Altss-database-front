
import React from "react";
import { NewsItem as NewsItemType } from "@/services/news/NewsService";
import NewsItem from "./NewsItem";

interface NewsListProps {
  newsItems: NewsItemType[];
  hasSearched: boolean;
  companyName: string;
}

const NewsList: React.FC<NewsListProps> = ({ newsItems, hasSearched, companyName }) => {
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
