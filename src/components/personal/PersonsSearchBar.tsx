
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Bookmark, Heart, Search, X, Loader2 } from "lucide-react";

interface PersonsSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch?: () => void;
  onClear?: () => void;
  isLoading?: boolean;
}

const PersonsSearchBar = ({ 
  searchQuery, 
  setSearchQuery,
  onSearch,
  onClear,
  isLoading = false
}: PersonsSearchBarProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      e.preventDefault();
      onSearch();
    }
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="relative grow">
        <Input
          type="text"
          placeholder="Search person"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-3 pr-10"
        />
        {searchQuery && (
          <button
            onClick={onClear}
            className="absolute inset-y-0 right-10 flex items-center pr-2"
            type="button"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>
      
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={onSearch}
        disabled={isLoading}
      >
        <Search className="h-4 w-4" />
        Search
      </Button>
      
      <Button variant="outline" className="flex items-center gap-2">
        <Filter className="h-4 w-4" />
        Filters
      </Button>
      
      <Button variant="outline" className="flex items-center gap-2">
        <Bookmark className="h-4 w-4" />
        Save this Search
      </Button>
      
      <Button variant="outline" className="flex items-center gap-2">
        <Heart className="h-4 w-4" />
        Add to Favorites
      </Button>
    </div>
  );
};

export default PersonsSearchBar;
