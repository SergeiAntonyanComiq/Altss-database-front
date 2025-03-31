import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Plus, Mail, Linkedin, Facebook, Twitter } from "lucide-react";
import { PersonType } from "@/types/person";
import { Badge } from "@/components/ui/badge";
import UserAvatar from "./UserAvatar";

interface PersonsTableProps {
  persons: PersonType[];
  selectedPersons: string[];
  handleCheckboxChange: (personId: string) => void;
  handleSelectAll: () => void;
  toggleFavorite: (id: string) => void;
}

// Helper function to get company logo based on company name
const getCompanyLogo = (company: string) => {
  const logoMap: Record<string, string> = {
    "Goldman Sachs": "/lovable-uploads/d93bfc50-1e23-41d9-a778-41f673f31cb0.png",
    "JP Morgan": "/lovable-uploads/d93bfc50-1e23-41d9-a778-41f673f31cb0.png",
    "BlackRock": "/lovable-uploads/d93bfc50-1e23-41d9-a778-41f673f31cb0.png",
    "Citigroup": "/lovable-uploads/d93bfc50-1e23-41d9-a778-41f673f31cb0.png",
    "Morgan Stanley": "/lovable-uploads/d93bfc50-1e23-41d9-a778-41f673f31cb0.png",
    "Wells Fargo": "/lovable-uploads/d93bfc50-1e23-41d9-a778-41f673f31cb0.png",
    "Bank of America": "/lovable-uploads/d93bfc50-1e23-41d9-a778-41f673f31cb0.png",
    "Optimum": "/lovable-uploads/d93bfc50-1e23-41d9-a778-41f673f31cb0.png",
    "LGT": "/lovable-uploads/d93bfc50-1e23-41d9-a778-41f673f31cb0.png",
    "Book Store": "/lovable-uploads/d93bfc50-1e23-41d9-a778-41f673f31cb0.png",
  };
  
  return logoMap[company] || "/lovable-uploads/d93bfc50-1e23-41d9-a778-41f673f31cb0.png";
};

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
            <TableHead className="py-3 px-4 text-sm font-medium text-gray-700">Contacts</TableHead>
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
                  <UserAvatar name={person.name} className="h-8 w-8 shrink-0" />
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
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <a href={`mailto:${person.name.toLowerCase().replace(' ', '.')}@example.com`} className="text-gray-600 hover:text-blue-600">
                      <Mail className="h-4 w-4" />
                    </a>
                    <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={`https://facebook.com/${person.name.toLowerCase().replace(' ', '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                      <Facebook className="h-4 w-4" />
                    </a>
                    <a href={`https://twitter.com/${person.name.toLowerCase().replace(' ', '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                      <Twitter className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-3 px-4 align-middle text-sm">{person.location}</TableCell>
              <TableCell className="py-3 px-4 align-middle">
                <div className="flex flex-wrap gap-1">
                  {person.companies.map((company, index) => (
                    <Badge key={index} variant="outline" className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs border-blue-100 flex items-center gap-1">
                      <Avatar className="h-4 w-4">
                        <AvatarImage src={getCompanyLogo(company)} alt={company} />
                        <AvatarFallback className="text-[8px] bg-blue-200 text-blue-700">
                          {company.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
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
