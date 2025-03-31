
import React, { useState, useEffect } from "react";
import { PersonType } from "@/types/person";
import PersonsSearchBar from "./PersonsSearchBar";
import PersonsTable2 from "./PersonsTable2";
import PersonsPagination from "./PersonsPagination";
import { usePersonsSearch } from "@/hooks/usePersonsSearch";
import { ContactType } from "@/types/contact";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

// Helper function to convert ContactType to PersonType
const mapContactToPerson = (contact: ContactType): PersonType => {
  return {
    id: contact.id.toString(),
    name: contact.name,
    favorite: contact.favorite || false,
    responsibilities: contact.role ? contact.role.split(',') : [],
    linkedin: contact.linkedin || "",
    location: `${contact.city}${contact.state ? ', ' + contact.state : ''}, ${contact.country_territory}`,
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
  const { searchResults, isLoading, error, searchPersons, resetSearch } = usePersonsSearch();
  const { toast } = useToast();
  
  console.log("PersonsList2 rendering. searchResults:", searchResults.length, "isLoading:", isLoading, "error:", error);
  
  // Effect to map search results to person format when results change
  useEffect(() => {
    if (searchResults.length > 0) {
      console.log("Mapping search results to persons format");
      const mappedPersons = searchResults.map(mapContactToPerson);
      setPersons(mappedPersons);
    } else if (searchResults.length === 0 && !isLoading && error === null) {
      // If search returned empty results (not initial state, not loading, no error)
      console.log("Search returned no results");
      setPersons([]);
      toast({
        title: "No Results",
        description: "Your search didn't return any results. Please try different search terms.",
      });
    }
  }, [searchResults, isLoading, error, toast]);

  // Initial search to load all data
  useEffect(() => {
    console.log("Running initial search to load all data");
    searchPersons({});
  }, []);

  // Calculate total pages based on the number of persons
  const totalPages = Math.ceil(persons.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (perPage: number) => {
    setItemsPerPage(perPage);
    setCurrentPage(1); // Reset to first page when changing items per page
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
    // In a real application, this would be an API call to change the favorite status
    console.log(`Toggle favorite for person with ID: ${id}`);
  };

  // Handle search from the search bar
  const handleSearch = (params: { name: string; investor: string; firm_type: string }) => {
    console.log("Searching with params:", params);
    searchPersons(params);
  };

  // Handle reset
  const handleReset = () => {
    console.log("Resetting search");
    resetSearch();
  };

  // Get current persons for this page
  const getCurrentPagePersons = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return persons.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Persons</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Filters
          </Button>
          <span className="text-sm text-muted-foreground self-center">
            {isLoading ? 'Loading...' : `Showing ${persons.length} items`}
          </span>
        </div>
      </div>
      
      <PersonsSearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        onReset={handleReset}
        isSearching={isLoading}
      />
      
      {error && (
        <div className="my-4 p-4 bg-red-100 text-red-800 rounded-md">
          {error}
        </div>
      )}
      
      <div className="mt-4">
        <PersonsTable2 
          persons={getCurrentPagePersons()}
          selectedPersons={selectedPersons}
          handleCheckboxChange={handleCheckboxChange}
          handleSelectAll={handleSelectAll}
          toggleFavorite={toggleFavorite}
        />
      </div>
      
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
