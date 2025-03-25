
import React, { useState, useEffect } from "react";
import { NewsItem as NewsItemType } from "@/services/news/NewsService";
import { ExternalLink, AlertTriangle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NewsItemProps {
  item: NewsItemType;
  companyName: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ item, companyName }) => {
  // Check if we have a URL
  const [hasValidUrl, setHasValidUrl] = useState<boolean>(false);
  const [isUrlBroken, setIsUrlBroken] = useState<boolean>(false);
  
  useEffect(() => {
    // Validate the URL format
    const isValid = Boolean(item.url) && 
      (item.url.startsWith('http://') || item.url.startsWith('https://'));
    
    setHasValidUrl(isValid);
    
    // For debugging
    console.log(`NewsItem URL: ${item.url}, valid: ${isValid}`);
  }, [item.url]);
  
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
          {hasValidUrl ? (
            <div className="flex items-center">
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:underline inline-flex items-center gap-1"
                onClick={(e) => {
                  // Log the URL being clicked for debugging
                  console.log(`Clicked URL: ${item.url}`);
                  
                  // If we know the URL is broken, prevent the click
                  if (isUrlBroken) {
                    e.preventDefault();
                  }
                }}
              >
                <span>Read more in {item.source}</span>
                <ExternalLink size={14} />
              </a>
              
              {isUrlBroken && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="ml-2 text-amber-500">
                        <AlertTriangle size={16} />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This link may be unavailable</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          ) : (
            <span className="text-gray-500">
              Source: {item.source}
            </span>
          )}
          <span className="text-sm text-gray-500">{item.date}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
