
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Bookmark, Heart } from "lucide-react";

interface PersonsSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const PersonsSearchBar = ({ searchQuery, setSearchQuery }: PersonsSearchBarProps) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="relative grow">
        <Input
          type="text"
          placeholder="Search person"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-3 border-gray-200"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
            <path d="M20 20L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
      
      <Button variant="outline" className="flex items-center gap-2 border-gray-200 text-gray-500">
        <Filter className="h-4 w-4" />
        Filters
      </Button>
      
      <Button variant="outline" className="flex items-center gap-2 border-gray-200 text-gray-500">
        <Bookmark className="h-4 w-4" />
        Save this Search
      </Button>
      
      <Button variant="outline" className="flex items-center gap-2 border-gray-200 text-gray-500">
        <Heart className="h-4 w-4" />
        Add to Favorites
      </Button>
    </div>
  );
};

export default PersonsSearchBar;
