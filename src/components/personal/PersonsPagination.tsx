
import React from "react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious, 
  PaginationEllipsis 
} from "@/components/ui/pagination";

interface PersonsPaginationProps {
  currentPage: number;
  onPageChange?: (page: number) => void;
  totalPages?: number;
}

const PersonsPagination = ({ currentPage, onPageChange, totalPages = 12 }: PersonsPaginationProps) => {
  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const renderPageLinks = () => {
    const pageLinks = [];
    const maxVisiblePages = 5;
    
    // Determine which pages to show
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // First page
    if (startPage > 1) {
      pageLinks.push(
        <PaginationItem key="page-1">
          <PaginationLink 
            href="#" 
            onClick={(e) => { e.preventDefault(); handlePageChange(1); }}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      
      // Add ellipsis if needed
      if (startPage > 2) {
        pageLinks.push(
          <PaginationItem key="ellipsis-1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
    
    // Numbered pages
    for (let i = startPage; i <= endPage; i++) {
      pageLinks.push(
        <PaginationItem key={`page-${i}`}>
          <PaginationLink 
            href="#" 
            isActive={currentPage === i}
            onClick={(e) => { e.preventDefault(); handlePageChange(i); }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Last page
    if (endPage < totalPages) {
      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pageLinks.push(
          <PaginationItem key="ellipsis-2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
      pageLinks.push(
        <PaginationItem key={`page-${totalPages}`}>
          <PaginationLink 
            href="#" 
            onClick={(e) => { e.preventDefault(); handlePageChange(totalPages); }}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return pageLinks;
  };

  return (
    <div className="flex justify-between items-center mt-6">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink 
              href="#" 
              aria-label="Go to first page"
              onClick={(e) => { e.preventDefault(); handlePageChange(1); }}
            >
              «
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious 
              href="#" 
              onClick={(e) => { 
                e.preventDefault(); 
                if (currentPage > 1) handlePageChange(currentPage - 1); 
              }}
            />
          </PaginationItem>
          
          {renderPageLinks()}
          
          <PaginationItem>
            <PaginationNext 
              href="#" 
              onClick={(e) => { 
                e.preventDefault(); 
                if (currentPage < totalPages) handlePageChange(currentPage + 1); 
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink 
              href="#" 
              aria-label="Go to last page"
              onClick={(e) => { e.preventDefault(); handlePageChange(totalPages); }}
            >
              »
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      
      <div className="relative">
        <select 
          className="appearance-none border rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          defaultValue="3"
        >
          <option value="3">3 results per page</option>
          <option value="5">5 results per page</option>
          <option value="10">10 results per page</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PersonsPagination;
