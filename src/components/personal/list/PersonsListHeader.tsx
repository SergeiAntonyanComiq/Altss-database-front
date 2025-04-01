
import React from "react";
import PersonsSearchBar from "../PersonsSearchBar";

interface PersonsListHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalContacts: number;
  isLoading: boolean;
}

const PersonsListHeader: React.FC<PersonsListHeaderProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  totalContacts,
  isLoading
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Persons</h1>
        <div className="flex gap-2">
          <span className="text-sm text-muted-foreground">
            Showing {isLoading ? "..." : "items"} of {totalContacts} total contacts
          </span>
        </div>
      </div>
      
      <PersonsSearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </>
  );
};

export default PersonsListHeader;
