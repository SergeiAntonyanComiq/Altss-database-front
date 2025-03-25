
import React from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface NewsSearchProps {
  onSearch: () => void;
  isSearching: boolean;
}

const NewsSearch: React.FC<NewsSearchProps> = ({ onSearch, isSearching }) => {
  return (
    <Button 
      onClick={onSearch} 
      disabled={isSearching}
      className="flex items-center gap-2"
    >
      <Search className="h-4 w-4" />
      {isSearching ? "Searching..." : "Search News"}
    </Button>
  );
};

export default NewsSearch;
