
import React, { useState } from "react";
import { useContactsData } from "@/hooks/useContactsData";
import { ContactType } from "@/types/contact";
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
import { Skeleton } from "@/components/ui/skeleton";

interface PersonsList2Props {
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (perPage: number) => void;
}

// Helper function to convert Contact to Person type
const contactToPerson = (contact: ContactType) => {
  return {
    id: contact.id.toString(),
    name: contact.name,
    favorite: contact.favorite || false,
    responsibilities: contact.asset_class ? contact.asset_class.split(',') : [],
    linkedin: contact.linkedin || "",
    location: `${contact.city}${contact.state ? `, ${contact.state}` : ""}${contact.country_territory ? `, ${contact.country_territory}` : ""}`,
    companies: [contact.investor || ""],
    currentPosition: contact.job_title || "",
    shortBio: contact.role || "",
    email: contact.email
  };
};

const PersonsList2 = ({
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}: PersonsList2Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPersons, setSelectedPersons] = useState<string[]>([]);
  
  const {
    contacts,
    isLoading,
    totalContacts
  } = useContactsData({
    initialPage: currentPage,
    initialItemsPerPage: itemsPerPage
  });

  // Convert contacts to persons format for the table
  const persons = contacts.map(contactToPerson);
  
  // Calculate total pages based on the number of contacts
  const totalPages = Math.ceil(totalContacts / itemsPerPage);

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
    // In a real application, this would be an API call to change the favorite status
    console.log(`Toggle favorite for person with ID: ${id}`);
  };

  const isPersonSelected = (id: string | undefined) => {
    return id ? selectedPersons.includes(id) : false;
  };
  
  // Generate array of page numbers for pagination
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
            Showing {isLoading ? "..." : persons.length} items
          </span>
        </div>
      </div>
      
      <PersonsSearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <div className="mt-4">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : (
          <PersonsTable2 
            persons={persons}
            selectedPersons={selectedPersons}
            handleCheckboxChange={handleCheckboxChange}
            handleSelectAll={handleSelectAll}
            toggleFavorite={toggleFavorite}
            isPersonSelected={isPersonSelected}
            isLoading={isLoading}
          />
        )}
      </div>
      
      <div className="flex justify-between items-center w-full mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                className={`${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <ChevronsLeft className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
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
                disabled={currentPage === totalPages}
                className={`${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <ChevronRight className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                className={`${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
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
          </select>
        </div>
      </div>
    </div>
  );
};

export default PersonsList2;
