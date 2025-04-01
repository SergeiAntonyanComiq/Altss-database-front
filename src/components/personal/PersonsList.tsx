
import React, { useState } from "react";
import { PersonType } from "@/types/person";
import { mockPersons } from "@/data/mockPersons";
import PersonsSearchBar from "./PersonsSearchBar";
import PersonsTable from "./PersonsTable";
import PersonsPagination from "./PersonsPagination";

const PersonsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFirmTypes, setSelectedFirmTypes] = useState<string[]>([]);
  const [selectedPersons, setSelectedPersons] = useState<string[]>(["1", "3", "6"]);
  const [currentPage, setCurrentPage] = useState(2);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [persons] = useState<PersonType[]>(mockPersons);
  
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
  
  const handleFilterChange = (firmTypes: string[]) => {
    setSelectedFirmTypes(firmTypes);
  };

  return (
    <div className="bg-[#FEFEFE] w-full py-8 px-4 md:px-6 lg:px-8">
      <h1 className="text-[rgba(17,25,40,1)] text-2xl font-semibold leading-none">Persons</h1>
      
      <PersonsSearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedFirmTypes={selectedFirmTypes}
        onFilterChange={handleFilterChange}
      />
      
      <div className="w-full mt-8">
        <PersonsTable 
          persons={persons}
          selectedPersons={selectedPersons}
          handleCheckboxChange={handleCheckboxChange}
          handleSelectAll={handleSelectAll}
          toggleFavorite={toggleFavorite}
        />
      </div>
      
      <div className="flex w-full gap-[40px_100px] justify-between flex-wrap mt-[122px] max-md:mt-10">
        <PersonsPagination 
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          totalItems={persons.length} 
        />
      </div>
    </div>
  );
};

export default PersonsList;
