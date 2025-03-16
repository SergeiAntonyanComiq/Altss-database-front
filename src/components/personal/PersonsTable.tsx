
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Plus } from "lucide-react";
import { PersonType } from "@/types/person";

interface PersonsTableProps {
  persons: PersonType[];
  selectedPersons: string[];
  handleCheckboxChange: (personId: string) => void;
  handleSelectAll: () => void;
  toggleFavorite: (id: string) => void;
}

const PersonsTable = ({ 
  persons, 
  selectedPersons, 
  handleCheckboxChange, 
  handleSelectAll, 
  toggleFavorite 
}: PersonsTableProps) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <Table>
        <TableHeader className="bg-white">
          <TableRow>
            <TableHead className="w-10">
              <Checkbox
                checked={selectedPersons.length === persons.length && persons.length > 0}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead className="w-10"></TableHead>
            <TableHead>Area of responsibility</TableHead>
            <TableHead>LinkedIn</TableHead>
            <TableHead>Resident Location</TableHead>
            <TableHead>Current Companies</TableHead>
            <TableHead className="w-10">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add column</span>
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {persons.map((person) => (
            <TableRow key={person.id} className={selectedPersons.includes(person.id) ? "bg-blue-50" : ""}>
              <TableCell>
                <Checkbox
                  checked={selectedPersons.includes(person.id)}
                  onCheckedChange={() => handleCheckboxChange(person.id)}
                />
              </TableCell>
              <TableCell className="font-medium pr-0">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={person.profileImage} alt={person.name} />
                    <AvatarFallback>
                      {person.name.charAt(0)}
                      {person.name.split(' ')[1]?.charAt(0) || ''}
                    </AvatarFallback>
                  </Avatar>
                  <span>{person.name}</span>
                </div>
              </TableCell>
              <TableCell className="w-10 text-center">
                <button 
                  onClick={() => toggleFavorite(person.id)}
                  className="focus:outline-none"
                >
                  <Heart 
                    className={`h-4 w-4 cursor-pointer ${person.favorite ? 'text-purple-500 fill-purple-500' : 'text-gray-300'}`} 
                  />
                </button>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {person.responsibilities.map((resp, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-sm">
                      {resp}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <a href={person.linkedin} className="text-blue-600 hover:underline">
                  /lorem_ipsu..
                </a>
              </TableCell>
              <TableCell>{person.location}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {person.companies.map((company, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-sm">
                      {company}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PersonsTable;
