
import React, { useState } from "react";
import { PersonType } from "@/types/person";
import { mockPersons } from "@/data/mockPersons";
import PersonsSearchBar from "./PersonsSearchBar";
import PersonsTable2 from "./PersonsTable2";
import PersonsPagination from "./PersonsPagination";

const PersonsList2 = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPersons, setSelectedPersons] = useState<string[]>(["1", "3", "6"]);
  const [currentPage] = useState(2);
  const [persons] = useState<PersonType[]>(mockPersons);

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

  return (
    <div className="container py-6">
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
        />
      </div>
      
      <div className="mt-4">
        <PersonsPagination currentPage={currentPage} />
      </div>
    </div>
  );
};

export default PersonsList2;
