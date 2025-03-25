
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
  // Проверяем, есть ли данные в API ответе и отображаем содержимое ответа
  const hasDirectAnswer = apiResponseData && apiResponseData.answer && apiResponseData.answer.text;
  
  if (newsItems.length > 0 || (hasDirectAnswer && hasSearched)) {
    return (
      <div className="space-y-4">
        {/* Отображаем прямой ответ API, если он есть */}
        {hasDirectAnswer && (
          <div className="bg-blue-50 p-4 rounded-md mb-4 border border-blue-200">
            <h3 className="font-medium text-blue-800 mb-2">API Direct Answer:</h3>
            <div className="text-gray-800 whitespace-pre-line">
              {apiResponseData.answer.text}
            </div>
          </div>
        )}
        
        {/* Отображаем новости */}
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
