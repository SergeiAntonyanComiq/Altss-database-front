
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
            <TableHead className="w-5 p-1">
              <Checkbox
                checked={selectedPersons.length === persons.length && persons.length > 0}
                onCheckedChange={handleSelectAll}
                className="h-3 w-3"
              />
            </TableHead>
            <TableHead className="pl-1 pr-0 text-xs">Full Name</TableHead>
            <TableHead className="w-5 p-0"></TableHead>
            <TableHead className="p-1 text-xs">Short Bio</TableHead>
            <TableHead className="p-1 text-xs">LinkedIn</TableHead>
            <TableHead className="p-1 text-xs">Area of responsibility</TableHead>
            <TableHead className="p-1 text-xs">Resident Location</TableHead>
            <TableHead className="p-1 text-xs">Current Companies</TableHead>
            <TableHead className="p-1 text-xs">Current Position</TableHead>
            <TableHead className="p-1 text-xs">Job History</TableHead>
            <TableHead className="p-1 text-xs">News</TableHead>
            <TableHead className="p-1 text-xs">Last Update</TableHead>
            <TableHead className="w-5 p-1">
              <Button variant="ghost" size="icon" className="h-4 w-4">
                <Plus className="h-2 w-2" />
                <span className="sr-only">Add column</span>
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {persons.map((person) => (
            <TableRow key={person.id} className={selectedPersons.includes(person.id) ? "bg-blue-50" : ""}>
              <TableCell className="p-1 align-middle">
                <Checkbox
                  checked={selectedPersons.includes(person.id)}
                  onCheckedChange={() => handleCheckboxChange(person.id)}
                  className="h-3 w-3"
                />
              </TableCell>
              <TableCell className="font-medium pl-1 pr-0 py-1 whitespace-nowrap">
                <div className="flex items-center gap-1 w-max max-w-[150px]">
                  <Avatar className="h-5 w-5 shrink-0">
                    <AvatarImage src={person.profileImage} alt={person.name} />
                    <AvatarFallback className="text-[9px]">
                      {person.name.charAt(0)}
                      {person.name.split(' ')[1]?.charAt(0) || ''}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis">{person.name}</span>
                </div>
              </TableCell>
              <TableCell className="w-5 p-0 text-center align-middle">
                <button 
                  onClick={() => toggleFavorite(person.id)}
                  className="focus:outline-none"
                >
                  <Heart 
                    className={`h-2 w-2 cursor-pointer ${person.favorite ? 'text-purple-500 fill-purple-500' : 'text-gray-300'}`} 
                  />
                </button>
              </TableCell>
              <TableCell className="p-1 text-xs">{person.shortBio || "-"}</TableCell>
              <TableCell className="p-1 text-xs">
                <a href={person.linkedin} className="text-blue-600 hover:underline text-xs">
                  {person.linkedinHandle || "/lorem_ipsu.."}
                </a>
              </TableCell>
              <TableCell className="p-1">
                <div className="flex flex-wrap gap-1">
                  {person.responsibilities.map((resp, index) => (
                    <span key={index} className="px-1 py-0.5 bg-blue-50 text-blue-700 rounded-md text-[9px]">
                      {resp}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell className="p-1 text-xs">{person.location}</TableCell>
              <TableCell className="p-1">
                <div className="flex flex-wrap gap-1">
                  {person.companies.map((company, index) => (
                    <span key={index} className="px-1 py-0.5 bg-blue-50 text-blue-700 rounded-md text-[9px]">
                      {company}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell className="p-1 text-xs">{person.currentPosition || "-"}</TableCell>
              <TableCell className="p-1 text-xs">{person.jobHistory || "-"}</TableCell>
              <TableCell className="p-1 text-xs">{person.news || "-"}</TableCell>
              <TableCell className="p-1 text-xs">{person.lastUpdate || "-"}</TableCell>
              <TableCell className="p-1"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PersonsTable;
