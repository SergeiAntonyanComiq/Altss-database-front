
import React from "react";
import { Search, Filter, Save, Heart } from "lucide-react";

interface CompaniesSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CompaniesSearchBar = ({ searchQuery, setSearchQuery }: CompaniesSearchBarProps) => {
  return (
    <div className="flex min-h-11 gap-4 text-base text-[rgba(99,115,129,1)] font-medium flex-wrap mt-10 w-full">
      <div className="min-w-60 min-h-11 text-gray-400 font-normal w-[363px]">
        <div className="w-full flex-1">
          <div className="justify-between items-center border border-[#DFE4EA] bg-white flex w-full gap-[40px_100px] flex-1 h-full pl-5 pr-4 py-3 rounded-[50px]">
            <input 
              type="text"
              placeholder="Search the company"
              className="self-stretch my-auto bg-transparent outline-none flex-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
      
      <button 
        className="justify-center items-center border border-[#DFE4EA] bg-white flex gap-2 whitespace-nowrap px-[15px] py-2.5 rounded-[50px]"
      >
        <Filter className="h-[18px] w-[18px]" />
        <span>Filters</span>
      </button>
      
      <button 
        className="justify-center items-center border border-[#DFE4EA] bg-gray-200 flex gap-2 text-[rgba(136,153,168,1)] px-[15px] py-2.5 rounded-[50px]"
      >
        <Save className="h-[18px] w-[18px]" />
        <span>Save this Search</span>
      </button>
      
      <button 
        className="justify-center items-center border border-[#DFE4EA] bg-white flex gap-2 px-[15px] py-2.5 rounded-[50px]"
      >
        <Heart className="h-[18px] w-[18px]" />
        <span>Add to Favorites</span>
      </button>
    </div>
  );
};

export default CompaniesSearchBar;
