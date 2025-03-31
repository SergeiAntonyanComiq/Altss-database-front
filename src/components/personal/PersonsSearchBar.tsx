
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Bookmark, Heart, Search } from "lucide-react";

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
          className="pl-3 pr-10"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      
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
