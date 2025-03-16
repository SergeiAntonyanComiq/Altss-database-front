
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
            <TableHead className="w-7 px-2">
              <Checkbox
                checked={selectedPersons.length === persons.length && persons.length > 0}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead className="pl-2 pr-0">Full Name</TableHead>
            <TableHead className="w-6 px-0"></TableHead>
            <TableHead className="px-2">Area of responsibility</TableHead>
            <TableHead className="px-2">LinkedIn</TableHead>
            <TableHead className="px-2">Resident Location</TableHead>
            <TableHead className="px-2">Current Companies</TableHead>
            <TableHead className="w-7 px-2">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Plus className="h-3 w-3" />
                <span className="sr-only">Add column</span>
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {persons.map((person) => (
            <TableRow key={person.id} className={selectedPersons.includes(person.id) ? "bg-blue-50" : ""}>
              <TableCell className="px-2">
                <Checkbox
                  checked={selectedPersons.includes(person.id)}
                  onCheckedChange={() => handleCheckboxChange(person.id)}
                />
              </TableCell>
              <TableCell className="font-medium pl-2 pr-0">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={person.profileImage} alt={person.name} />
                    <AvatarFallback>
                      {person.name.charAt(0)}
                      {person.name.split(' ')[1]?.charAt(0) || ''}
                    </AvatarFallback>
                  </Avatar>
                  <span>{person.name}</span>
                </div>
              </TableCell>
              <TableCell className="w-6 px-0 text-center">
                <button 
                  onClick={() => toggleFavorite(person.id)}
                  className="focus:outline-none"
                >
                  <Heart 
                    className={`h-3 w-3 cursor-pointer ${person.favorite ? 'text-purple-500 fill-purple-500' : 'text-gray-300'}`} 
                  />
                </button>
              </TableCell>
              <TableCell className="px-2">
                <div className="flex flex-wrap gap-1">
                  {person.responsibilities.map((resp, index) => (
                    <span key={index} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md text-xs">
                      {resp}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell className="px-2">
                <a href={person.linkedin} className="text-blue-600 hover:underline">
                  /lorem_ipsu..
                </a>
              </TableCell>
              <TableCell className="px-2">{person.location}</TableCell>
              <TableCell className="px-2">
                <div className="flex flex-wrap gap-1">
                  {person.companies.map((company, index) => (
                    <span key={index} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md text-xs">
                      {company}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell className="px-2"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PersonsTable;
