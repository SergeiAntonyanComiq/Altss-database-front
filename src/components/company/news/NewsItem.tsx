
import React from "react";
import { NewsItem as NewsItemType } from "@/services/news/NewsService";
import { ExternalLink } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NewsItemProps {
  item: NewsItemType;
  companyName: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ item, companyName }) => {
  // Replace company name placeholder if present
  const displayContent = item.content.replace("ACME Long Name Super Long Inc.", companyName);
  
  // Check if URL is valid
  const isValidUrl = item.url && (
    item.url.startsWith('http://') || 
    item.url.startsWith('https://') || 
    item.url.startsWith('www.')
  );
  
  // Log URL for debugging
  console.log("News item URL:", item.url, "Valid:", isValidUrl);
  
  return (
    <div className="flex gap-4">
      <div 
        className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-xl font-bold rounded-md"
        style={{ backgroundColor: item.color, color: item.textColor }}
      >
        {item.logo}
      </div>
      <div className="flex-1">
        <p className="text-gray-700">{displayContent}</p>
        <div className="flex justify-between mt-1">
          {isValidUrl ? (
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              Read more in {item.source}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-gray-500">
                    {item.source}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>No direct link available</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <span className="text-sm text-gray-500">{item.date}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
