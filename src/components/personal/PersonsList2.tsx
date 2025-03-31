
import React, { useState, useEffect } from "react";
import { PersonType } from "@/types/person";
import { mockPersons } from "@/data/mockPersons";
import PersonsSearchBar from "./PersonsSearchBar";
import PersonsTable2 from "./PersonsTable2";
import { useToast } from "@/components/ui/use-toast";
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
  const [selectedPersons, setSelectedPersons] = useState<string[]>([]);
  const [persons, setPersons] = useState<PersonType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const totalPages = Math.ceil(persons.length / itemsPerPage);

  // Fetch persons data from Xano
  useEffect(() => {
    const fetchPersons = async () => {
      try {
        setIsLoading(true);
        
        // Fetch from Xano API
        const response = await fetch("https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu/persons", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch persons: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Persons data fetched from Xano:", data);
        
        // Transform data if needed to match PersonType
        const formattedData: PersonType[] = Array.isArray(data) ? data.map((item: any) => ({
          id: item.id.toString(),
          name: item.name || "Unknown",
          favorite: item.favorite || false,
          responsibilities: item.responsibilities ? item.responsibilities.split(',') : [],
          linkedin: item.linkedin || "",
          location: item.city ? `${item.city}, ${item.country_territory || ""}` : item.country_territory || "",
          companies: item.investor ? [item.investor] : [],
          shortBio: item.short_bio || "",
          currentPosition: item.job_title || "",
        })) : [];
        
        setPersons(formattedData);
      } catch (err) {
        console.error("Exception fetching persons from Xano:", err);
        toast({
          title: "Error",
          description: "Failed to load persons data. Using mock data instead.",
          variant: "destructive",
        });
        setPersons(mockPersons);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPersons();
  }, [toast]);

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

  const toggleFavorite = async (id: string) => {
    try {
      // Find the person to toggle
      const personToUpdate = persons.find(p => p.id === id);
      if (!personToUpdate) return;
      
      // Update the favorite status in Xano
      const response = await fetch(`https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu/persons/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ favorite: !personToUpdate.favorite })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update favorite status: ${response.statusText}`);
      }
      
      // Update local state
      setPersons(prev => 
        prev.map(p => p.id === id ? { ...p, favorite: !p.favorite } : p)
      );
      
      toast({
        title: "Success",
        description: `${personToUpdate.name} ${!personToUpdate.favorite ? "added to" : "removed from"} favorites`,
      });
      
    } catch (err) {
      console.error("Error toggling favorite:", err);
      toast({
        title: "Error",
        description: "Failed to update favorite status.",
        variant: "destructive",
      });
    }
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
            {isLoading ? "Loading..." : `Showing ${persons.length} items`}
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
