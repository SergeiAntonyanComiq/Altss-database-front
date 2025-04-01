
import React from "react";
import { PersonType } from "@/types/person";
import PersonsTable2 from "../PersonsTable2";
import { Skeleton } from "@/components/ui/skeleton";

interface PersonsListContentProps {
  persons: PersonType[];
  selectedPersons: string[];
  handleCheckboxChange: (personId: string) => void;
  handleSelectAll: () => void;
  toggleFavorite: (id: string) => void;
  isPersonSelected: (id: string | undefined) => boolean;
  isLoading: boolean;
}

const PersonsListContent: React.FC<PersonsListContentProps> = ({
  persons,
  selectedPersons,
  handleCheckboxChange,
  handleSelectAll,
  toggleFavorite,
  isPersonSelected,
  isLoading
}) => {
  return (
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
  );
};

export default PersonsListContent;
