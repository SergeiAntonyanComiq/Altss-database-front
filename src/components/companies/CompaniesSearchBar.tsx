
import React from "react";
import { Filter, Save, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CompaniesSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CompaniesSearchBar = ({ searchQuery, setSearchQuery }: CompaniesSearchBarProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm mb-6">
      <div className="flex items-center gap-4 p-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search the company"
            className="pl-10 w-full border-gray-200 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current">
              <circle cx="11" cy="11" r="7" strokeWidth="2"/>
              <path d="M20 20L16 16" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
        
        <Button variant="outline" className="gap-2 text-gray-500 border-gray-200">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        
        <Button variant="outline" className="gap-2 text-gray-500 border-gray-200">
          <Save className="h-4 w-4" />
          Save this Search
        </Button>
        
        <Button variant="outline" className="gap-2 text-gray-500 border-gray-200">
          <Heart className="h-4 w-4" />
          Add to Favorites
        </Button>
      </div>
    </div>
  );
};

export default CompaniesSearchBar;
