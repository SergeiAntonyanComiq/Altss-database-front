
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PersonsPaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
  itemsPerPage: number;
  onItemsPerPageChange: (perPage: number) => void;
  totalItems: number;
  disabled?: boolean;
}

const PersonsPagination = ({
  currentPage,
  onPageChange,
  totalPages,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems,
  disabled = false
}: PersonsPaginationProps) => {
  const handlePrevPage = () => {
    if (currentPage > 1 && !disabled) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages && !disabled) {
      onPageChange(currentPage + 1);
    }
  };

  // Calculate the range of items being displayed
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Determine if we're showing results for user search
  const isSearchResults = disabled && totalItems > 0;
  
  return (
    <div className="flex items-center justify-between w-full">
      <div className="text-[rgba(17,25,40,1)] text-sm font-medium leading-[20px]">
        {isSearchResults 
          ? `Showing search results: ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`
          : `Showing ${Math.min(startItem, totalItems)}-${endItem} of ${totalItems} items`
        }
      </div>
      
      <div className="flex items-center gap-2">
        <div className="text-[rgba(17,25,40,1)] text-sm font-medium leading-[20px]">
          Items per page:
        </div>
        
        <select
          value={itemsPerPage}
          onChange={(e) => !disabled && onItemsPerPageChange(Number(e.target.value))}
          className={`border border-[rgba(223,228,234,1)] bg-transparent px-2 py-1 rounded-md text-sm ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={disabled}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        
        <div className="flex items-center gap-1 ml-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1 || disabled}
            className={`w-8 h-8 flex items-center justify-center rounded-md ${
              currentPage === 1 || disabled ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="text-[rgba(17,25,40,1)] text-sm font-medium leading-[20px] px-2">
            {disabled ? "-" : `${currentPage} / ${totalPages}`}
          </div>
          
          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages || disabled}
            className={`w-8 h-8 flex items-center justify-center rounded-md ${
              currentPage >= totalPages || disabled ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonsPagination;
