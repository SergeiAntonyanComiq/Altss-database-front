import React, { useCallback, useState } from "react";
import { PersonType } from "@/types/person";
import { useNavigate } from "react-router-dom";
import PersonTableHeader, { Column } from "./table/PersonTableHeader";
import PersonTableRow from "./table/PersonTableRow";
import EmptyState from "./table/EmptyState";

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
  const [columns, setColumns] = useState<Column[]>([
    { id: 'name', width: 280, minWidth: 280 },
    { id: 'bio', width: 300, minWidth: 300 },
    { id: 'position', width: 170, minWidth: 170 },
    { id: 'responsibilities', width: 250, minWidth: 250 },
    { id: 'contacts', width: 150, minWidth: 150 },
    { id: 'location', width: 170, minWidth: 170 },
  ]);

  const handleProfileClick = useCallback((personId: string) => {
    navigate(`/profile/${personId}`);
  }, [navigate]);

  const handleColumnResize = useCallback((newColumns: Column[]) => {
    setColumns(newColumns);
  }, []);

  if (persons.length === 0 && !isLoading) {
    return <EmptyState />;
  }

  const allSelected = selectedPersons.length === persons.length && persons.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden w-full">
      <div className="w-full border border-[rgba(223,228,234,1)]">
        <PersonTableHeader 
          allSelected={allSelected} 
          handleSelectAll={handleSelectAll}
          columns={columns}
          onColumnResize={handleColumnResize}
        />
        
        <div className="w-full">
          {persons.map((person) => (
            <PersonTableRow 
              key={person.id} 
              person={person} 
              isSelected={isPersonSelected(person.id)}
              onCheckboxChange={() => handleCheckboxChange(person.id)}
              toggleFavorite={toggleFavorite}
              onProfileClick={handleProfileClick}
              columns={columns}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonsTable2;
