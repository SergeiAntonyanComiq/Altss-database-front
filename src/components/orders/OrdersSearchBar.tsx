import React, { KeyboardEvent } from "react";
import { Search, X } from "lucide-react";

interface OrdersSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const OrdersSearchBar = ({
  searchQuery,
  setSearchQuery,
}: OrdersSearchBarProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="flex min-h-11 gap-4 text-base text-[rgba(99,115,129,1)] font-medium flex-wrap mt-10 w-full">
      <div className="min-w-60 min-h-11 text-gray-400 font-normal flex-grow max-w-md">
        <div className="w-full flex-1">
          <div className="max-h-[44px] justify-between items-center border border-[#DFE4EA] bg-white flex w-full gap-2 flex-1 h-full pl-5 pr-4 py-3 rounded-[50px]">
            <input
              type="text"
              placeholder="Profile search"
              className="self-stretc bg-transparent outline-none flex-1"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={searchQuery ? handleClearSearch : () => {}}
              className="cursor-pointer hover:text-gray-600 transition-colors p-1"
            >
              {searchQuery ? (
                <X className="h-4 w-4 text-gray-500" />
              ) : (
                <Search className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersSearchBar;
