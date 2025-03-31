
import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PersonsPaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
  itemsPerPage: number;
  onItemsPerPageChange: (perPage: number) => void;
}

const PersonsPagination = ({
  currentPage,
  onPageChange,
  totalPages,
  itemsPerPage,
  onItemsPerPageChange
}: PersonsPaginationProps) => {
  
  // Calculate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // If total pages is less than maxPagesToShow, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate start and end of middle section
      let start = Math.max(2, currentPage - 2);
      let end = Math.min(totalPages - 1, currentPage + 2);
      
      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        start = 2;
        end = Math.min(5, totalPages - 1);
      } 
      // Adjust if we're near the end
      else if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 4);
        end = totalPages - 1;
      }
      
      // Add ellipsis if needed before middle section
      if (start > 2) {
        pages.push('ellipsis');
      }
      
      // Add middle section
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed after middle section
      if (end < totalPages - 1) {
        pages.push('ellipsis');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  return (
    <>
      <div className="items-stretch bg-white flex min-w-60 min-h-[46px] flex-col justify-center px-[13px] py-[11px] rounded-[3px]">
        <div className="flex items-center gap-4 flex-wrap">
          {/* First page and Previous page buttons */}
          <div className="self-stretch flex items-center gap-2 my-auto">
            <button 
              onClick={() => onPageChange(1)} 
              disabled={currentPage === 1}
              className="disabled:opacity-50"
            >
              <div className={`flex items-center justify-center w-[25px] h-[25px] ${currentPage === 1 ? 'bg-gray-100' : ''}`}>
                <ChevronsLeft className="h-4 w-4" />
              </div>
            </button>
            
            <button 
              onClick={() => onPageChange(currentPage - 1)} 
              disabled={currentPage === 1}
              className="disabled:opacity-50"
            >
              <div className={`flex items-center justify-center w-[25px] h-[25px] ${currentPage === 1 ? 'bg-gray-100' : ''}`}>
                <ChevronLeft className="h-4 w-4" />
              </div>
            </button>
          </div>
          
          {/* Page numbers */}
          {getPageNumbers().map((page, index) => 
            page === 'ellipsis' ? (
              <span key={`ellipsis-${index}`} className="text-[rgba(99,115,129,1)] text-base font-normal leading-none text-center self-stretch my-auto">
                ...
              </span>
            ) : (
              <button 
                key={`page-${page}`}
                onClick={() => onPageChange(page as number)} 
                className="text-base font-normal leading-none text-center self-stretch my-auto"
              >
                {currentPage === page ? (
                  <div className="bg-[#2665F0] w-[25px] h-[25px] flex items-center justify-center rounded-md text-white">
                    {page}
                  </div>
                ) : (
                  <div className="text-[rgba(99,115,129,1)]">{page}</div>
                )}
              </button>
            )
          )}
          
          {/* Next page and Last page buttons */}
          <div className="self-stretch flex items-center gap-2 my-auto">
            <button 
              onClick={() => onPageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
              className="disabled:opacity-50"
            >
              <div className={`flex items-center justify-center w-[25px] h-[25px] ${currentPage === totalPages ? 'bg-gray-100' : ''}`}>
                <ChevronRight className="h-4 w-4" />
              </div>
            </button>
            
            <button 
              onClick={() => onPageChange(totalPages)} 
              disabled={currentPage === totalPages}
              className="disabled:opacity-50"
            >
              <div className={`flex items-center justify-center w-[25px] h-[25px] ${currentPage === totalPages ? 'bg-gray-100' : ''} rounded-md`}>
                <ChevronsRight className="h-4 w-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Items per page selector */}
      <div className="min-w-60 min-h-12 text-base text-[#637381] font-normal w-[250px] rounded-md">
        <select 
          className="items-center border border-[#DFE4EA] bg-white flex w-full gap-2.5 flex-1 h-full px-5 py-3 rounded-md"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}
        >
          <option value="10">10 results per page</option>
          <option value="25">25 results per page</option>
          <option value="50">50 results per page</option>
          <option value="100">100 results per page</option>
        </select>
      </div>
    </>
  );
};

export default PersonsPagination;
