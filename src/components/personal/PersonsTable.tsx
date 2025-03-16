
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Plus } from "lucide-react";
import { PersonType } from "@/types/person";
import { Badge } from "@/components/ui/badge";

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
          <TableRow className="border-b border-gray-200">
            <TableHead className="w-12 py-3 px-4">
              <Checkbox
                checked={selectedPersons.length === persons.length && persons.length > 0}
                onCheckedChange={handleSelectAll}
                className="h-4 w-4"
              />
            </TableHead>
            <TableHead className="py-3 px-4 text-sm font-medium text-gray-700">Full Name</TableHead>
            <TableHead className="w-5 p-0"></TableHead>
            <TableHead className="py-3 px-4 text-sm font-medium text-gray-700">Bio / About</TableHead>
            <TableHead className="py-3 px-4 text-sm font-medium text-gray-700">Position</TableHead>
            <TableHead className="py-3 px-4 text-sm font-medium text-gray-700">Job History</TableHead>
            <TableHead className="py-3 px-4 text-sm font-medium text-gray-700">News</TableHead>
            <TableHead className="py-3 px-4 text-sm font-medium text-gray-700">Area of responsibility</TableHead>
            <TableHead className="py-3 px-4 text-sm font-medium text-gray-700">LinkedIn</TableHead>
            <TableHead className="py-3 px-4 text-sm font-medium text-gray-700">Resident Location</TableHead>
            <TableHead className="py-3 px-4 text-sm font-medium text-gray-700">Current Companies</TableHead>
            <TableHead className="py-3 px-4 text-sm font-medium text-gray-700">Last Update</TableHead>
            <TableHead className="w-5 py-3 px-2">
              <Button variant="ghost" size="icon" className="h-5 w-5 ml-2 rounded-full bg-blue-50">
                <Plus className="h-3 w-3 text-blue-600" />
                <span className="sr-only">Add column</span>
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {persons.map((person) => (
            <TableRow 
              key={person.id} 
              className={`${selectedPersons.includes(person.id) ? "bg-blue-50" : "hover:bg-gray-50"} border-b border-gray-200`}
            >
              <TableCell className="py-3 px-4 align-middle w-12">
                <Checkbox
                  checked={selectedPersons.includes(person.id)}
                  onCheckedChange={() => handleCheckboxChange(person.id)}
                  className="h-4 w-4"
                />
              </TableCell>
              <TableCell className="py-3 px-4 align-middle">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage 
                      src="/lovable-uploads/d93bfc50-1e23-41d9-a778-41f673f31cb0.png" 
                      alt={person.name} 
                    />
                    <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                      {person.name.charAt(0)}
                      {person.name.split(' ')[1]?.charAt(0) || ''}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
                      {person.name}
                    </span>
                    <button 
                      onClick={() => toggleFavorite(person.id)}
                      className="focus:outline-none"
                    >
                      <Heart 
                        className={`h-4 w-4 cursor-pointer ${person.favorite ? 'text-purple-500 fill-purple-500' : 'text-gray-300'}`} 
                      />
                    </button>
                  </div>
                </div>
              </TableCell>
              <TableCell className="w-5 p-0"></TableCell>
              <TableCell className="py-3 px-4 align-middle">
                <p className="text-sm text-gray-600 max-w-[200px] line-clamp-2">
                  {person.shortBio || "-"}
                </p>
              </TableCell>
              <TableCell className="py-3 px-4 align-middle">
                <span className="text-sm text-gray-600">
                  {person.currentPosition || "-"}
                </span>
              </TableCell>
              <TableCell className="py-3 px-4 align-middle">
                <span className="text-sm text-gray-600">
                  {person.jobHistory || "-"}
                </span>
              </TableCell>
              <TableCell className="py-3 px-4 align-middle">
                <span className="text-sm text-gray-600">
                  {person.news || "-"}
                </span>
              </TableCell>
              <TableCell className="py-3 px-4 align-middle">
                <div className="flex flex-wrap gap-1">
                  {person.responsibilities.map((resp, index) => (
                    <Badge key={index} variant="outline" className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs border-blue-100">
                      {resp}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="py-3 px-4 align-middle">
                <a href={person.linkedin} className="text-blue-600 hover:underline text-sm">
                  {person.linkedinHandle || "/lorem_ipsu.."}
                </a>
              </TableCell>
              <TableCell className="py-3 px-4 align-middle text-sm">{person.location}</TableCell>
              <TableCell className="py-3 px-4 align-middle">
                <div className="flex flex-wrap gap-1">
                  {person.companies.map((company, index) => (
                    <Badge key={index} variant="outline" className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs border-blue-100">
                      {company}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="py-3 px-4 align-middle">
                <span className="text-sm text-gray-500">
                  {person.lastUpdate || "-"}
                </span>
              </TableCell>
              <TableCell className="py-3 px-4 align-middle"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PersonsTable;
