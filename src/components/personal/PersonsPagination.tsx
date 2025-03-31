
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
  
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      let start = Math.max(2, currentPage - 2);
      let end = Math.min(totalPages - 1, currentPage + 2);
      
      if (currentPage <= 3) {
        start = 2;
        end = Math.min(5, totalPages - 1);
      } 
      else if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 4);
        end = totalPages - 1;
      }
      
      if (start > 2) {
        pages.push('ellipsis');
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages - 1) {
        pages.push('ellipsis');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  return (
    <div className="flex justify-between items-center mt-4 w-full">
      <div className="items-stretch bg-white flex min-h-[46px] flex-row justify-center px-[13px] py-[11px] rounded-[3px]">
        <div className="flex items-center gap-4 flex-wrap">
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
      
      <div className="w-[250px]">
        <select 
          className="items-center border border-[#DFE4EA] bg-white flex w-full gap-2.5 h-[46px] px-5 py-3 rounded-md text-base text-[#637381] font-normal"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}
        >
          <option value="10">10 results per page</option>
          <option value="25">25 results per page</option>
          <option value="50">50 results per page</option>
          <option value="100">100 results per page</option>
        </select>
      </div>
    </div>
  );
};

export default PersonsPagination;
