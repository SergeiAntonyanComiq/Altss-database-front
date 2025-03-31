import React, { useState, useEffect } from "react";
import { PersonType } from "@/types/person";
import PersonsSearchBar from "./PersonsSearchBar";
import PersonsTable2 from "./PersonsTable2";
import PersonsPagination from "./PersonsPagination";
import { usePersonsSearch } from "@/hooks/usePersonsSearch";
import { ContactType } from "@/types/contact";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FilterIcon, Search, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";

const mapContactToPerson = (contact: ContactType): PersonType => {
  return {
    id: contact.id.toString(),
    name: contact.name,
    favorite: contact.favorite || false,
    responsibilities: contact.role ? contact.role.split(',') : [],
    linkedin: contact.linkedin || "",
    location: `${contact.city}${contact.state ? ', ' + contact.state : ''}${contact.country_territory ? ', ' + contact.country_territory : ''}`,
    companies: [contact.investor],
    shortBio: contact.job_title || "",
    currentPosition: contact.job_title || "",
    lastUpdate: new Date().toLocaleDateString(),
  };
};

const PersonsList2 = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPersons, setSelectedPersons] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [persons, setPersons] = useState<PersonType[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const { searchResults, isLoading, error, searchPersons, fetchMultipleContacts, resetSearch } = usePersonsSearch();
  const { toast } = useToast();
  
  console.log("PersonsList2 rendering. searchResults:", searchResults.length, "isLoading:", isLoading, "error:", error);
  
  useEffect(() => {
    if (searchResults.length > 0) {
      console.log("Mapping search results to persons format");
      const mappedPersons = searchResults.map(mapContactToPerson);
      setPersons(mappedPersons);
    } else if (searchResults.length === 0 && !isLoading && error === null) {
      console.log("Search returned no results");
      setPersons([]);
    }
  }, [searchResults, isLoading, error]);

  useEffect(() => {
    console.log("Running initial data load");
    fetchMultipleContacts(1, 20);
  }, []);

  const totalPages = Math.ceil(persons.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (perPage: number) => {
    setItemsPerPage(perPage);
    setCurrentPage(1);
  };

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

  const handleSearch = (params: { name: string; investor: string; firm_type: string }) => {
    console.log("Searching with params:", params);
    searchPersons(params);
    setIsFilterModalOpen(false);
  };

  const handleResetFilters = () => {
    console.log("Resetting filters");
    resetSearch();
    setSearchQuery("");
    setIsFilterModalOpen(false);
  };

  const getCurrentPagePersons = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return persons.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Persons</h1>
        <div className="flex gap-2">
          <span className="text-sm text-muted-foreground">
            {isLoading ? 'Loading...' : `Showing ${persons.length} items`}
          </span>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="relative grow">
            <Input
              type="text"
              placeholder="Quick search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-3 pr-10"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch({ name: searchQuery, investor: "", firm_type: "" });
                }
              }}
            />
            <div 
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={() => handleSearch({ name: searchQuery, investor: "", firm_type: "" })}
            >
              <Search className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <FilterIcon className="h-4 w-4" />
                Advanced Filters
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Advanced Search</DialogTitle>
              </DialogHeader>
              <PersonsSearchBar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearch={handleSearch}
                isSearching={isLoading}
                isInDialog={true}
                onReset={handleResetFilters}
              />
            </DialogContent>
          </Dialog>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleResetFilters}
          >
            <RotateCcw className="h-4 w-4" />
            Reset Filters
          </Button>
        </div>
      </div>
      
      {error && (
        <div className="my-4 p-4 bg-red-100 text-red-800 rounded-md">
          {error}
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="mt-4">
          <PersonsTable2 
            persons={getCurrentPagePersons()}
            selectedPersons={selectedPersons}
            handleCheckboxChange={handleCheckboxChange}
            handleSelectAll={handleSelectAll}
            toggleFavorite={toggleFavorite}
          />
        </div>
      )}
      
      <div className="mt-4">
        <PersonsPagination 
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
};

export default PersonsList2;
