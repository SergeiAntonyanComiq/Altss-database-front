
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious, 
  PaginationEllipsis 
} from "@/components/ui/pagination";
import { Filter, Bookmark, Heart, Plus } from "lucide-react";
import { PersonType } from "@/types/person";
import { mockPersons } from "@/data/mockPersons";

const PersonsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPersons, setSelectedPersons] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(2);
  const [persons] = useState<PersonType[]>(mockPersons);

  const handleCheckboxChange = (personId: string) => {
    setSelectedPersons(prev => 
      prev.includes(personId) 
        ? prev.filter(id => id !== personId) 
        : [...prev, personId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPersons.length === persons.length) {
      setSelectedPersons([]);
    } else {
      setSelectedPersons(persons.map(person => person.id));
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Persons</h1>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative grow">
          <Input
            type="text"
            placeholder="Search person"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-3 pr-10"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Bookmark className="h-4 w-4" />
          Save this Search
        </Button>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Heart className="h-4 w-4" />
          Add to Favorites
        </Button>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox
                  checked={selectedPersons.length === persons.length && persons.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Full Name</TableHead>
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
              <TableRow key={person.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedPersons.includes(person.id)}
                    onCheckedChange={() => handleCheckboxChange(person.id)}
                  />
                </TableCell>
                <TableCell className="font-medium flex items-center gap-2">
                  {person.name}
                  {person.favorite && (
                    <Heart className={`h-4 w-4 ${person.favorite ? 'text-purple-500 fill-purple-500' : 'text-gray-300'}`} />
                  )}
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
      
      <div className="flex justify-between items-center mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="#" aria-label="Go to first page">«</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">5</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">12</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" aria-label="Go to last page">»</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        
        <div className="relative">
          <select className="appearance-none border rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            <option value="50">50 results per page</option>
            <option value="100">100 results per page</option>
            <option value="200">200 results per page</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonsList;
