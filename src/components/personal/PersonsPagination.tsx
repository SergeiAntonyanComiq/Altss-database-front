
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
}

const PersonsPagination = ({ currentPage }: PersonsPaginationProps) => {
  return (
    <div className="flex justify-between items-center mt-6">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" aria-label="Go to first page">«</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive={currentPage === 2}>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">5</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">12</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" aria-label="Go to last page">»</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      
      <div className="relative">
        <select className="appearance-none border rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
          <option value="50">50 results per page</option>
          <option value="100">100 results per page</option>
          <option value="200">200 results per page</option>
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
