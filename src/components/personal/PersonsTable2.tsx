import React, { useCallback } from "react";
import { PersonType } from "@/types/person";
import { useNavigate } from "react-router-dom";
import PersonTableHeader, { Column } from "./table/PersonTableHeader";
import PersonTableRow from "./table/PersonTableRow";
import { Skeleton } from "@/components/ui/skeleton";

interface PersonsTable2Props {
  persons: PersonType[];
  selectedPersons: string[];
  handleCheckboxChange: (personId: string) => void;
  handleSelectAll: () => void;
  toggleFavorite: (id: string) => void;
  isPersonSelected: (id: string | undefined) => boolean;
  isLoading: boolean;
  itemsPerPage?: number;
  columns: Column[];
  onColumnResize: (columns: Column[]) => void;
}

const PersonsTable2 = ({
  persons,
  selectedPersons,
  handleCheckboxChange,
  handleSelectAll,
  toggleFavorite,
  isPersonSelected,
  isLoading,
  itemsPerPage,
  columns,
  onColumnResize,
}: PersonsTable2Props) => {
  const navigate = useNavigate();

  const handleProfileClick = useCallback(
    (personId: string) => {
      navigate(`/profile/${personId}`);
    },
    [navigate],
  );

  const allSelected =
    selectedPersons.length === persons.length && persons.length > 0;

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm w-full">
        <div className="w-full border border-[rgba(223,228,234,1)] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <PersonTableHeader
              allSelected={false}
              handleSelectAll={() => {}}
              columns={columns}
              onColumnResize={onColumnResize}
            />
            <div className="space-y-1 p-4">
              {Array.from({ length: Math.max(1, itemsPerPage || 10) }).map(
                (_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!persons || persons.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm w-full">
      <div className="w-full border border-[rgba(223,228,234,1)] rounded-lg overflow-hidden">
        <div className="overflow-x-auto thin-scrollbar">
          <PersonTableHeader
            allSelected={allSelected}
            handleSelectAll={handleSelectAll}
            columns={columns}
            onColumnResize={onColumnResize}
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
    </div>
  );
};

export default PersonsTable2;
