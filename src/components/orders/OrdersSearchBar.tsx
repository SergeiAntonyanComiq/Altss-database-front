import React, { KeyboardEvent } from "react";
import { Search, X } from "lucide-react";

interface OrdersSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  // Add other props like onSearch if needed later
}

const OrdersSearchBar = ({ 
  searchQuery, 
  setSearchQuery
}: OrdersSearchBarProps) => {

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Trigger search if needed, e.g., call an onSearch prop
      console.log("Search triggered for:", searchQuery);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    // Optionally, trigger search immediately or clear results if input is empty
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    // Optionally, trigger search with empty query
  };

  return (
    <div className="flex min-h-11 gap-4 text-base text-[rgba(99,115,129,1)] font-medium flex-wrap mt-10 w-full">
      {/* Search Input - Reusing styles from PersonsSearchBar */}
      <div className="min-w-60 min-h-11 text-gray-400 font-normal flex-grow max-w-md"> {/* Adjusted width */} 
        <div className="w-full flex-1">
          <div className="justify-between items-center border border-[#DFE4EA] bg-white flex w-full gap-2 flex-1 h-full pl-5 pr-4 py-3 rounded-[50px]">
            <input 
              type="text"
              placeholder="Profile search" // Placeholder from mockup
              className="self-stretch my-auto bg-transparent outline-none flex-1"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyDown={handleKeyDown}
            />
            <button 
              onClick={searchQuery ? handleClearSearch : () => console.log("Search icon clicked")}
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
      
      {/* Other elements like filters/buttons can be added here if needed */}
    </div>
  );
};

export default OrdersSearchBar; 