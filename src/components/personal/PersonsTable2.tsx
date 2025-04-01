
import React, { useCallback } from "react";
import { PersonType } from "@/types/person";
import { useNavigate } from "react-router-dom";
import PersonTableHeader from "./table/PersonTableHeader";
import PersonTableRow from "./table/PersonTableRow";
import EmptyState from "./table/EmptyState";
import { useColumnSizes } from "./table/useColumnSizes";

interface PersonsTable2Props {
  persons: PersonType[];
  selectedPersons: string[];
  handleCheckboxChange: (personId: string) => void;
  handleSelectAll: () => void;
  toggleFavorite: (id: string) => void;
  isPersonSelected: (id: string | undefined) => boolean;
  isLoading: boolean;
}

const PersonsTable2 = ({ 
  persons, 
  selectedPersons, 
  handleCheckboxChange, 
  handleSelectAll, 
  toggleFavorite,
  isPersonSelected,
  isLoading
}: PersonsTable2Props) => {
  const navigate = useNavigate();
  const { columnSizes, handleResize } = useColumnSizes();

  const handleProfileClick = useCallback((personId: string) => {
    navigate(`/profile/${personId}`);
  }, [navigate]);

  if (persons.length === 0 && !isLoading) {
    return <EmptyState />;
  }

  const allSelected = selectedPersons.length === persons.length && persons.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden w-full">
      <div className="table-container w-full">
        {/* Table Header */}
        <PersonTableHeader 
          allSelected={allSelected} 
          handleSelectAll={handleSelectAll} 
          columnSizes={columnSizes}
          onResize={handleResize}
        />
        
        {/* Table Rows */}
        <div className="divide-y divide-[#DFE4EA] w-full">
          {persons.map((person) => (
            <PersonTableRow 
              key={person.id} 
              person={person} 
              columnSizes={columnSizes}
              isSelected={isPersonSelected(person.id)}
              onCheckboxChange={() => handleCheckboxChange(person.id)}
              toggleFavorite={toggleFavorite}
              onProfileClick={handleProfileClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonsTable2;
