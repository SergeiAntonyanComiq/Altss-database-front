
import React from "react";
import { NewsItem as NewsItemType } from "@/services/newsService";

interface NewsItemProps {
  item: NewsItemType;
  companyName: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ item, companyName }) => {
  return (
    <div className="flex gap-4">
      <div 
        className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-xl font-bold rounded-md"
        style={{ backgroundColor: item.color, color: item.textColor }}
      >
        {item.logo}
      </div>
      <div className="flex-1">
        <p className="text-gray-700">
          {item.content.replace("ACME Long Name Super Long Inc.", companyName)}
        </p>
        <div className="flex justify-between mt-1">
          {item.url ? (
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-block">Read more</a>
          ) : (
            <span className="text-blue-600 opacity-50">Read more</span>
          )}
          <span className="text-sm text-gray-500">{item.date}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
