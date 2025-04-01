
import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PersonsPaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
  itemsPerPage: number;
  onItemsPerPageChange: (perPage: number) => void;
  totalItems: number; // Added totalItems prop to recalculate pages
}

const PersonsPagination = ({
  currentPage,
  onPageChange,
  totalPages,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems
}: PersonsPaginationProps) => {
  
  // Recalculate total pages based on current itemsPerPage and totalItems
  const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);
  
  console.log("Pagination component - totalItems:", totalItems);
  console.log("Pagination component - itemsPerPage:", itemsPerPage);
  console.log("Pagination component - calculatedTotalPages:", calculatedTotalPages);
  
  // Use the calculated total pages instead of the prop
  const effectiveTotalPages = calculatedTotalPages || 1;
  
  // If currentPage is greater than total pages, reset to page 1
  useEffect(() => {
    if (effectiveTotalPages > 0 && currentPage > effectiveTotalPages) {
      onPageChange(1);
    }
  }, [effectiveTotalPages, currentPage, onPageChange]);
  
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (effectiveTotalPages <= maxPagesToShow) {
      for (let i = 1; i <= effectiveTotalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(effectiveTotalPages - 1, currentPage + 1);
      
      if (currentPage <= 3) {
        start = 2;
        end = Math.min(4, effectiveTotalPages - 1);
      } 
      else if (currentPage >= effectiveTotalPages - 2) {
        start = Math.max(2, effectiveTotalPages - 3);
        end = effectiveTotalPages - 1;
      }
      
      if (start > 2) {
        pages.push('ellipsis');
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < effectiveTotalPages - 1) {
        pages.push('ellipsis');
      }
      
      pages.push(effectiveTotalPages);
    }
    
    return pages;
  };
  
  return (
    <div className="flex items-center gap-4 justify-between w-full">
      <div className="items-stretch bg-white flex min-w-60 min-h-[46px] flex-col justify-center px-[13px] py-[11px] rounded-[3px]">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="self-stretch flex items-center gap-2 my-auto">
            <button 
              onClick={() => onPageChange(1)} 
              disabled={currentPage === 1}
              className={`${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-center w-[25px] h-[25px]">
                <ChevronsLeft className="h-4 w-4" />
              </div>
            </button>
            
            <button 
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)} 
              disabled={currentPage === 1}
              className={`${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-center w-[25px] h-[25px]">
                <ChevronLeft className="h-4 w-4" />
              </div>
            </button>
          </div>
          
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
                  <div className="bg-[rgba(38,101,240,1)] w-[25px] h-[25px] flex items-center justify-center rounded-md text-white">
                    {page}
                  </div>
                ) : (
                  <div className="text-[rgba(99,115,129,1)]">{page}</div>
                )}
              </button>
            )
          )}
          
          <div className="self-stretch flex items-center gap-2 my-auto">
            <button 
              onClick={() => currentPage < effectiveTotalPages && onPageChange(currentPage + 1)} 
              disabled={currentPage === effectiveTotalPages}
              className={`${currentPage === effectiveTotalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-center w-[25px] h-[25px]">
                <ChevronRight className="h-4 w-4" />
              </div>
            </button>
            
            <button 
              onClick={() => onPageChange(effectiveTotalPages)} 
              disabled={currentPage === effectiveTotalPages}
              className={`${currentPage === effectiveTotalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-center w-[25px] h-[25px]">
                <ChevronsRight className="h-4 w-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
      
      <div className="min-w-60 min-h-12 text-base text-[#637381] font-normal w-[250px] rounded-md">
        <select 
          className="items-center border border-[#DFE4EA] bg-white flex w-full gap-2.5 flex-1 h-full px-5 py-3 rounded-md"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}
        >
          <option value="10">10 results per page</option>
          <option value="25">25 results per page</option>
          <option value="50">50 results per page</option>
        </select>
      </div>
    </div>
  );
};

export default PersonsPagination;
