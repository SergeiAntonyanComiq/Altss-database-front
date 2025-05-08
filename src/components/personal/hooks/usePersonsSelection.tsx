import { useState, useCallback } from "react";
import { PersonType } from "@/types/person";

export const usePersonsSelection = (persons: PersonType[]) => {
  const [selectedPersons, setSelectedPersons] = useState<string[]>([]);

  const handleCheckboxChange = useCallback((personId: string) => {
    setSelectedPersons((prev) =>
      prev.includes(personId)
        ? prev.filter((id) => id !== personId)
        : [...prev, personId],
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedPersons.length === persons.length) {
      setSelectedPersons([]);
    } else {
      setSelectedPersons(persons.map((person) => person.id));
    }
  }, [persons, selectedPersons]);

  const isPersonSelected = useCallback(
    (id: string | undefined) => {
      return id ? selectedPersons.includes(id) : false;
    },
    [selectedPersons],
  );

  return {
    selectedPersons,
    handleCheckboxChange,
    handleSelectAll,
    isPersonSelected,
  };
};
