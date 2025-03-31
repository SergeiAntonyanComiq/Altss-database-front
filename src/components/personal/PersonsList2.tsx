
import React, { useState, useEffect } from "react";
import { PersonType } from "@/types/person";
import { ContactType } from "@/types/contact";
import { mockPersons } from "@/data/mockPersons";
import PersonsSearchBar from "./PersonsSearchBar";
import PersonsTable2 from "./PersonsTable2";
import PersonsPagination from "./PersonsPagination";
import { useContactsSearch } from "@/hooks/useContactsSearch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const PersonsList2 = () => {
  console.log('PersonsList2 - Component rendering');
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useState({
    name: "",
    investor: "",
    firm_type: ""
  });
  const [selectedPersons, setSelectedPersons] = useState<string[]>(["1", "3", "6"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [persons] = useState<PersonType[]>(mockPersons);
  
  const { isLoading, error, data: contacts, search, clearSearch, hasSearched } = useContactsSearch();
  
  console.log('PersonsList2 - State values:', { 
    searchQuery,
    searchParams,
    selectedPersons: selectedPersons.length,
    currentPage,
    itemsPerPage,
    isLoading,
    hasSearched,
    contactsLength: contacts?.length || 0
  });
  
  // Calculate total pages based on the available data
  const totalPages = Math.ceil((hasSearched && contacts ? contacts.length : persons.length) / itemsPerPage);

  // Reset to first page when new search results are received
  useEffect(() => {
    if (contacts) {
      console.log('PersonsList2 - New contacts received, resetting to page 1');
      setCurrentPage(1);
    }
  }, [contacts]);

  const handlePageChange = (page: number) => {
    console.log('PersonsList2 - Page changed to:', page);
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (perPage: number) => {
    console.log('PersonsList2 - Items per page changed to:', perPage);
    setItemsPerPage(perPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleCheckboxChange = (personId: string) => {
    console.log('PersonsList2 - Checkbox changed for person:', personId);
    setSelectedPersons(prev => 
      prev.includes(personId) 
        ? prev.filter(id => id !== personId) 
        : [...prev, personId]
    );
  };

  const handleSelectAll = () => {
    console.log('PersonsList2 - Select all toggled');
    if (selectedPersons.length === persons.length) {
      setSelectedPersons([]);
    } else {
      setSelectedPersons(persons.map(person => person.id));
    }
  };

  const toggleFavorite = (id: string) => {
    // In a real application, this would be an API call to change the favorite status
    console.log(`PersonsList2 - Toggle favorite for person with ID: ${id}`);
  };

  const handleSearch = () => {
    console.log('PersonsList2 - handleSearch called');
    console.log('PersonsList2 - Current searchQuery:', searchQuery);
    console.log('PersonsList2 - Current searchParams:', searchParams);
    
    // Prepare search parameters
    const params = {
      name: searchQuery || searchParams.name,
      investor: searchParams.investor,
      firm_type: searchParams.firm_type
    };
    
    console.log('PersonsList2 - Prepared search params:', params);
    
    // Perform the search
    console.log('PersonsList2 - Calling search() with params');
    search(params);
    
    // Update searchParams with the most recent values
    console.log('PersonsList2 - Updating searchParams with name:', searchQuery || searchParams.name);
    setSearchParams(prev => ({
      ...prev,
      name: searchQuery || prev.name
    }));
  };

  const handleClearSearch = () => {
    console.log('PersonsList2 - Clear search called');
    setSearchQuery("");
    setSearchParams({
      name: "",
      investor: "",
      firm_type: ""
    });
    clearSearch();
  };

  // Render contacts data in the table when search results are available
  const renderContactsTable = () => {
    console.log('PersonsList2 - renderContactsTable called');
    console.log('PersonsList2 - isLoading:', isLoading);
    console.log('PersonsList2 - error:', error);
    console.log('PersonsList2 - contacts:', contacts?.length || 0);
    
    if (isLoading) {
      return (
        <div className="p-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
          <p>Loading contacts...</p>
        </div>
      );
    }

    if (error) {
      return <div className="p-4 text-center text-red-500">{error}</div>;
    }

    if (!contacts || contacts.length === 0) {
      return <div className="p-4 text-center">No results found</div>;
    }

    // Get a subset of contacts for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, contacts.length);
    const currentContacts = contacts.slice(startIndex, endIndex);
    
    console.log('PersonsList2 - Displaying contacts:', { 
      startIndex, 
      endIndex, 
      currentContacts: currentContacts.length 
    });

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Investor</TableHead>
            <TableHead>Firm Type</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Location</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentContacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.investor}</TableCell>
              <TableCell>{contact.firm_type}</TableCell>
              <TableCell>{contact.title}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{`${contact.city}${contact.state ? `, ${contact.state}` : ''}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Persons</h1>
        <div className="flex gap-2">
          <span className="text-sm text-muted-foreground">
            Showing {hasSearched && contacts ? contacts.length : persons.length} items
          </span>
        </div>
      </div>
      
      <PersonsSearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        onClear={handleClearSearch}
        isLoading={isLoading}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      
      <div className="mt-4">
        {hasSearched ? (
          <div className="bg-white rounded-lg shadow">
            {renderContactsTable()}
          </div>
        ) : (
          <PersonsTable2 
            persons={persons}
            selectedPersons={selectedPersons}
            handleCheckboxChange={handleCheckboxChange}
            handleSelectAll={handleSelectAll}
            toggleFavorite={toggleFavorite}
          />
        )}
      </div>
      
      <div className="mt-4 w-full">
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
