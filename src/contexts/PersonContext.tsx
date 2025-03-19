
import React, { createContext, useState, useContext } from 'react';
import { Person, samplePersons } from '@/models/Person';

interface PersonContextType {
  persons: Person[];
  setPersons: React.Dispatch<React.SetStateAction<Person[]>>;
  toggleFavorite: (id: number) => void;
  filterPersons: (searchTerm: string) => Person[];
}

const PersonContext = createContext<PersonContextType>({
  persons: [],
  setPersons: () => {},
  toggleFavorite: () => {},
  filterPersons: () => [],
});

export function usePersons() {
  return useContext(PersonContext);
}

export function PersonProvider({ children }: { children: React.ReactNode }) {
  const [persons, setPersons] = useState<Person[]>(samplePersons);
  
  // Methods for working with data
  const toggleFavorite = (id: number) => {
    setPersons(persons.map(person => 
      person.id === id ? person.toggleFavorite() : person
    ));
  };

  const filterPersons = (searchTerm: string) => {
    if (!searchTerm) return persons;
    return persons.filter(person => 
      person.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Value available through context
  const value = {
    persons,
    setPersons,
    toggleFavorite,
    filterPersons
  };

  return (
    <PersonContext.Provider value={value}>
      {children}
    </PersonContext.Provider>
  );
}
