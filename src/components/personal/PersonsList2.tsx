import React, { useState } from "react";
import { PersonType } from "@/types/person";
import { mockPersons } from "@/data/mockPersons";
import PersonsSearchBar from "./PersonsSearchBar";
import PersonsTable2 from "./PersonsTable2";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PersonsList2Props {
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (perPage: number) => void;
}

const PersonsList2 = ({
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}: PersonsList2Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPersons, setSelectedPersons] = useState<string[]>(["1", "3", "6"]);
  const [persons] = useState<PersonType[]>(mockPersons);
  const [isLoading] = useState(false);
  
  const totalPages = Math.ceil(persons.length / itemsPerPage);

  const handleCheckboxChange = (personId: string) => {
    setSelectedPersons(prev => 
      prev.includes(personId) 
        ? prev.filter(id => id !== personId) 
        : [...prev, personId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPersons.length === persons.length) {
      setSelectedPersons([]);
    } else {
      setSelectedPersons(persons.map(person => person.id));
    }
  };

  const toggleFavorite = (id: string) => {
    console.log(`Toggle favorite for person with ID: ${id}`);
  };

  const isPersonSelected = (id: string | undefined) => {
    return id ? selectedPersons.includes(id) : false;
  };
  
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 3) {
        start = 2;
        end = Math.min(4, totalPages - 1);
      } 
      else if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 3);
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
    <div className="px-6 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Persons</h1>
        <div className="flex gap-2">
          <span className="text-sm text-muted-foreground">
            Showing {persons.length} items
          </span>
        </div>
      </div>
      
      <PersonsSearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <div className="mt-4">
        <PersonsTable2 
          persons={persons}
          selectedPersons={selectedPersons}
          handleCheckboxChange={handleCheckboxChange}
          handleSelectAll={handleSelectAll}
          toggleFavorite={toggleFavorite}
          isPersonSelected={isPersonSelected}
          isLoading={isLoading}
        />
      </div>
      
      <div className="flex justify-between items-center w-full mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                onClick={() => onPageChange(1)}
                className={`${currentPage === 1 ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
                aria-disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                className={`${currentPage === 1 ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
                aria-disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
            
            {getPageNumbers().map((page, index) => 
              page === 'ellipsis' ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={`page-${page}`}>
                  <PaginationLink
                    onClick={() => onPageChange(page as number)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            
            <PaginationItem>
              <PaginationLink
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                className={`${currentPage === totalPages ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
                aria-disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => onPageChange(totalPages)}
                className={`${currentPage === totalPages ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
                aria-disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        
        <div className="w-[200px]">
          <select 
            className="w-full h-10 border border-input bg-background px-3 py-2 text-sm rounded-md"
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
    </div>
  );
};

export default PersonsList2;
